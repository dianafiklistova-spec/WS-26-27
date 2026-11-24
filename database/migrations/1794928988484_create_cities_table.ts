// Vorlage für Migrationen aus Lucid (Lucid ist das Datenbank-Werkzeug von AdonisJS)
import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Tabelle "cities" (US-04, US-07)
 * Städte, in denen Spots liegen. Werden über die Seed-Daten angelegt.
 */
// Diese Klasse ist eine Migration und erbt alle Fähigkeiten von BaseSchema
export default class extends BaseSchema {
  // Name der Tabelle: immer kleingeschrieben und in der Mehrzahl
  protected tableName = 'cities'

  // Läuft bei "node ace migration:run" und baut die Tabelle
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Spalte "id": zählt automatisch hoch (1, 2, 3 …), Primärschlüssel
      table.increments('id').notNullable()
      // Spalte "name": Text mit max. 100 Zeichen, darf nicht leer sein, jede Stadt nur einmal
      table.string('name', 100).notNullable().unique()
    })
  }

  // Läuft bei "node ace migration:rollback" und löscht die Tabelle wieder
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
