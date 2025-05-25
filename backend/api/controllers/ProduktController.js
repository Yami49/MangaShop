/**
 * ProduktController
 *
 * @description :: Server-seitige Aktionen für die Verwaltung der Manga-Produkte.
 *                 Dieser Controller nutzt den ProduktService zur Datenverwaltung.
 *
 * @help        :: https://sailsjs.com/docs/concepts/actions
 */
const errors = require('../utils/errors');

module.exports = {

  /**
   * `ProduktController.create()`
   *
   * Erstellt ein neues Manga-Produkt anhand der übergebenen Daten im Request-Body.
   */
  create: async function (req, res) {
    try {
      const produkt = await ProduktService.createProdukt(req);
      return res.status(201).json(produkt);
    } catch (err) {
      sails.log.error('Error:', err.message);

      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  },

  /**
   * `ProduktController.findOne()`
   *
   * Gibt ein einzelnes Manga-Produkt anhand der Produkt-ID zurück.
   */
  findOne: async function (req, res) {
    try {
      const produkt = await ProduktService.findProduktById(req);
      return res.json(produkt);
    } catch (err) {
      sails.log.error('Error:', err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  },

  /**
   * `ProduktController.find()`
   *
   * Sucht Manga-Produkte anhand von Filtern (Titel, Kategorie, Preis) und Pagination.
   */
  find: async function (req, res) {
    try {
      const result = await ProduktService.findProdukte(req);
      return res.json(result);
    } catch (err) {
      sails.log.error('Error:', err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  },

  /**
   * `ProduktController.destroy()`
   *
   * Löscht ein Manga-Produkt anhand der Produkt-ID.
   */
  destroy: async function (req, res) {
    try {
      await ProduktService.deleteProdukt(req);
      return res.ok();
    } catch (err) {
      sails.log.error('Error:', err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  },

  /**
   * `ProduktController.patch()`
   *
   * Aktualisiert ein Manga-Produkt anhand der Produkt-ID mit neuen Daten.
   */
  patch: async function (req, res) {
    try {
      const updatedProdukt = await ProduktService.updateProdukt(req);
      return res.json(updatedProdukt);
    } catch (err) {
      sails.log.error('Error:', err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  },

  /**
   * `ProduktController.count()`
   *
   * Gibt die Gesamtanzahl der Manga-Produkte zurück.
   */
  count: async function (req, res) {
    try {
      const produktCount = await ProduktService.countProdukte();
      return res.json(produktCount);
    } catch (err) {
      sails.log.error('Error:', err.message);
      if (err instanceof errors.CustomError) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.serverError('Ein unerwarteter Fehler ist aufgetreten.');
    }
  }

};
