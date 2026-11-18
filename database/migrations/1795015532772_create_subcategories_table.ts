import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Tabelle "subcategories" – von Nutzern angelegte Unterkategorien (US-10)
 *
 * Felder gemäß ERM:
 * - name:            Name so, wie der Nutzer ihn eingegeben hat (Anzeige)
 * - normalized_name: getrimmt, Mehrfach-Leerzeichen zusammengefasst, kleingeschrieben
 *                    (wird automatisch im Subcategory-Model gesetzt)
 * - category_id:     zugehörige Hauptkategorie
 * - created_by:      Nutzer, der die Unterkategorie angelegt hat
 *
 * Duplikate: Der zusammengesetzte Unique-Index (category_id, normalized_name)
 * verhindert z. B. "Street Art" und "  street   ART " in derselben Kategorie.
 *
 * Löschregeln:
 * - category_id ON DELETE CASCADE: Wird eine Kategorie gelöscht, werden ihre
 *   (unbenutzten) Unterkategorien mitgelöscht.
 * - created_by ON DELETE SET NULL: Wird ein Nutzer gelöscht, bleibt die
 *   Unterkategorie erhalten (andere Nutzer verwenden sie evtl. schon).
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ WICHTIG für die zukünftige Migration "spots":                           │
 * │ Kategorien und Unterkategorien, die von Spots verwendet werden, dürfen  │
 * │ NICHT gelöscht werden. Deshalb in der Tabelle "spots" verwenden:        │
 * │   spots.category_id    -> categories.id     ON DELETE RESTRICT          │
 * │   spots.subcategory_id -> subcategories.id  ON DELETE RESTRICT          │
 * │ Dann blockiert die Datenbank das Löschen einer Kategorie, sobald sie    │
 * │ selbst oder eine ihrer Unterkategorien (über das CASCADE oben) noch     │
 * │ von einem Spot referenziert wird. Ohne diese Constraints würde das      │
 * │ CASCADE hier verwendete Unterkategorien stillschweigend löschen.        │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
export default class extends BaseSchema {
  protected tableName = 'subcategories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 50).notNullable()
      table.string('normalized_name', 50).notNullable()

      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')

      table
        .integer('created_by')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['category_id', 'normalized_name'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
