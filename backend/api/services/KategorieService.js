const errors = require('../utils/errors');

/**
 * KategorieService
 *
 * @description :: Verwaltung der Manga-Kategorien.
 */
module.exports = {

  /**
   * Erstellt eine neue Kategorie
   */
  createKategorie: async function (req) {
    const { name, beschreibung } = req.body;

    if (!name) {
      throw new errors.BadRequestError('Kategoriename ist erforderlich.');
    }

    return await Kategorie.create({ name, beschreibung }).fetch();
  },

  /**
   * Lädt alle Kategorien
   */
  findAllKategorien: async function () {
    return await Kategorie.find().sort('name ASC');
  },

  /**
   * Aktualisiert eine vorhandene Kategorie
   */
  updateKategorie: async function (req) {
    const id = req.params.id;
    const { name, beschreibung } = req.body;

    if (!id) {
      throw new errors.BadRequestError('Kategorie-ID ist erforderlich.');
    }

    if (!name) {
      throw new errors.BadRequestError('Name ist erforderlich.');
    }

    const kategorie = await Kategorie.findOne({ id });
    if (!kategorie) {
      throw new errors.NotFoundError('Kategorie nicht gefunden.');
    }

    return await Kategorie.updateOne({ id }).set({ name, beschreibung });
  },

  /**
   * Löscht eine Kategorie (inkl. Produkte-Zuordnung)
   */
  deleteKategorie: async function (req) {
    const id = req.params.id;

    if (!id) {
      throw new errors.BadRequestError('Kategorie-ID ist erforderlich.');
    }

    const kategorie = await Kategorie.findOne({ id });
    if (!kategorie) {
      throw new errors.NotFoundError('Kategorie nicht gefunden.');
    }

    // Produkte dieser Kategorie könnten erhalten bleiben, aber du kannst auch:
    // await Produkt.update({ kategorie: id }).set({ kategorie: null });

    await Kategorie.destroyOne({ id });
  }

};
