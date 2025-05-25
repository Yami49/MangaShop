const uuid = require('uuid');
const errors = require('../utils/errors');
const { v2: cloudinary } = require('cloudinary');

// Cloudinary Konfiguration
cloudinary.config(sails.config.custom.cloudinary);

/**
 * ProduktService
 *
 * @description :: Business-Logik für Produktverwaltung im Manga-Shop.
 */
module.exports = {
  /**
   * Erstellt ein neues Manga-Produkt
   */
  createProdukt: async function (req) {
    const { titel, beschreibung, preis, kategorie } = req.body;

    if (!titel || !preis || !kategorie) {
      throw new errors.BadRequestError('Titel, Preis und Kategorie sind erforderlich.');
    }

    // Bild (optional) hochladen zu Cloudinary
    let imageUrl = null;
    const uploadResult = await new Promise((resolve) => {
      req.file('image').upload(async (err, files) => {
        if (err || !files.length) return resolve(null);
        try {
          const upload = await cloudinary.uploader.upload(files[0].fd, {
            folder: 'mangashop',
          });
          return resolve(upload.secure_url);
        } catch (e) {
          sails.log.warn('⚠️ Cloudinary-Upload fehlgeschlagen:', e.message);
          return resolve(null);
        }
      });
    });
    if (uploadResult) imageUrl = uploadResult;

    // Produkt speichern
    return await Produkt.create({
      titel,
      beschreibung,
      preis,
      produktId: uuid.v4(),
      kategorie,
      image: imageUrl,
    }).fetch();
  },

  /**
   * Ruft ein Manga-Produkt anhand der ID ab
   */
  findProduktById: async function (req) {
    const produktId = req.params.id;

    if (!produktId) {
      throw new errors.BadRequestError('Produkt-ID erforderlich.');
    }

    const produkt = await Produkt.findOne({ produktId, isDeleted: false }).populate('kategorie');

    if (!produkt) {
      throw new errors.NotFoundError('Produkt nicht gefunden.');
    }

    return produkt;
  },

  /**
   * Suche nach Manga-Produkten mit optionalen Filtern und Pagination
   */
  findProdukte: async function (req) {
    const { search, page = 1, size = 10, preis } = req.query;
    const where = { isDeleted: false };

    if (search) {
      where.titel = { contains: search };
    }

    if (preis) {
      where.preis = { '<=': parseFloat(preis) };
    }

    const total = await Produkt.count(where);
    const produkte = await Produkt.find({
      where,
      skip: (page - 1) * size,
      limit: size,
    }).populate('kategorie');

    return {
      produkte,
      total,
      totalPages: Math.ceil(total / size),
      currentPage: parseInt(page),
      hasMore: page * size < total,
    };
  },

  /**
   * Löscht (soft-delete) ein Manga-Produkt
   */
  deleteProdukt: async function (req) {
    const produktId = req.params.id;

    if (!produktId) {
      throw new errors.BadRequestError('Produkt-ID erforderlich.');
    }

    await Produkt.updateOne({ produktId }).set({ isDeleted: true });
  },

  /**
   * Aktualisiert ein bestehendes Manga-Produkt
   */
  updateProdukt: async function (req) {
    const produktId = req.params.id;

    if (!produktId) {
      throw new errors.BadRequestError('Produkt-ID erforderlich.');
    }

    const { titel, beschreibung, preis, kategorie } = req.body;

    const produkt = await Produkt.findOne({ produktId });

    if (!produkt) {
      throw new errors.NotFoundError('Produkt nicht gefunden.');
    }

    return await Produkt.updateOne({ produktId }).set({
      titel,
      beschreibung,
      preis,
      kategorie,
    });
  },

  /**
   * Zählt alle Manga-Produkte
   */
  countProdukte: async function () {
    return await Produkt.count({ isDeleted: false });
  },
};