/**
 * Produkt
 *
 * @description :: Datenmodell für Manga-Shop-Produkte.
 */

module.exports = {
    attributes: {
  
      /**
       * @description Titel des Manga-Produkts.
       * @type {string}
       * @required Ja, jedes Produkt braucht einen Titel.
       */
      titel: {
        type: 'string',
        maxLength: 100,
        required: true
      },
  
      /**
       * @description Beschreibung des Manga-Produkts (optional).
       * @type {string}
       */
      beschreibung: {
        type: 'string',
        columnType: 'varchar(1000)',
        allowNull: true
      },
  
      /**
       * @description Preis des Manga-Produkts.
       * @type {number}
       * @required Ja, jedes Produkt braucht einen Preis.
       */
      preis: {
        type: 'number',
        columnType: 'decimal(10,2)',
        required: true,
        min: 0
      },
  
      /**
       * @description Produkt-ID, eindeutige Identifikation (automatisch generiert).
       */
      produktId: {
        type: 'string',
        required: true,
        unique: true,
        columnName: 'produkt_id'
      },
  
      /**
       * @description Soft Delete Flag, um Produkte nicht physisch zu löschen.
       */
      isDeleted: {
        type: 'boolean',
        defaultsTo: false,
        description: 'Gibt an, ob das Produkt gelöscht wurde.',
      },
  
      /**
       * @description Beziehung zur Kategorie (Many-to-One).
       * Ein Produkt gehört genau einer Kategorie an.
       */
      kategorie: {
        model: 'kategorie',
        required: true
      },
  
      /**
       * @description Beziehung zum WarenkorbItem (One-to-Many).
       * Ein Produkt kann mehrfach in WarenkorbItems vorkommen.
       
      warenkorbItems: {
        collection: 'warenkorbitem',
        via: 'produkt'
      }*/
    },
    
    beforeCreate: async (values, proceed) => {
      // Eindeutige Produkt-ID generieren, z.B. UUID
      const uuid = require('uuid');
      values.produktId = uuid.v4();
      return proceed();
    }
  
  };
  