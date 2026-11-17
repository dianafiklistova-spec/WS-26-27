import { BaseSchema } from '@adonisjs/lucid/schema'  /* Import baseschema holt vorlage für migration aus lucid. lucid ist das datenbank werkzeug von adonisjs. */

/**
 * Tabelle "cities" (US-04, US-07)
 * Städte, in denen Spots liegen. Werden über die Seed-Daten angelegt.
 */
export default class extends BaseSchema {   /* sagt dass die datei eine migration ist. diese klasse erbt alle fähigkeiten von baseschema */
  protected tableName = 'cities' /* gibt den tabellennamen an, der in der migration erstellt wird. immer als mehrzahl und kleingeschrieben*/

  async up() { /* läuft bei migration:run und erstellt die tabelle */
    this.schema.createTable(this.tableName, (table) => { /* erstellt die tabelle mit dem tabellennamen cities */
      table.increments('id').notNullable() /* erstellt die spalte id, die automatisch hochgezählt wird und nicht null sein darf */
      table.string('name', 100).notNullable().unique() /* erstellt die spalte name, die bis zu 100 zeichen lang sein darf und eindeutig sein muss */
    })
  }

  async down() { /* läuft bei migration:rollback und löscht die tabelle */
    this.schema.dropTable(this.tableName) /* löscht die tabelle cities */
  }
}
