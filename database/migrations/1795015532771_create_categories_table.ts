import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Tabelle "categories" – Hauptkategorien (US-09)
 *
 * Felder gemäß ERM:
 * - name: eindeutiger Name der Hauptkategorie (nur Admins legen sie an)
 *
 * Löschen: Eine Kategorie darf nur gelöscht werden, wenn ihr keine Spots
 * zugeordnet sind. Diese Regel wird NICHT hier, sondern über die
 * Fremdschlüssel der zukünftigen Tabelle "spots" abgesichert
 * (siehe Hinweis in der Migration "subcategories").
 */
export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 50).notNullable().unique()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
