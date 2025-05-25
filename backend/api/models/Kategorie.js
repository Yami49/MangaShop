/**
 * Kategorie
 *
 * @description :: Datenmodell für Manga-Kategorien wie „Shōnen“, „Seinen“, „Kawaii“ etc.
 */

module.exports = {
    attributes: {
  
      /**
       * @description Der Name der Kategorie (z. B. Shōnen).
       * @type {string}
       */
      name: {
        type: 'string',
        required: true,
        maxLength: 50
      },
  
      /**
       * @description Optionale Beschreibung der Kategorie.
       * @type {string}
       */
      beschreibung: {
        type: 'string',
        columnType: 'varchar(1000)',
        allowNull: true
      },
  
      /**
       * @description Beziehung zu Produkten (1:n).
       * Eine Kategorie kann mehrere Produkte enthalten.
       */
      produkte: {
        collection: 'produkt',
        via: 'kategorie'
      }
  
    }
  };
  