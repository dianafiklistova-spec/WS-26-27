import { BaseSchema } from '@adonisjs/lucid/schema'

// Tabelle "spots" (US-04). Ein Spot ist ein Fundstück, das ein Nutzer in einer Stadt teilt.
export default class extends BaseSchema {
  // Name der Tabelle: immer Mehrzahl und kleingeschrieben
  protected tableName = 'spots'

  // läuft bei migration:run und erstellt die Tabelle
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // id wird automatisch hochgezählt
      table.increments('id').notNullable()
      // text ist der längere Beschreibungstext, location_name der Name des Ortes
      table.text('text').notNullable()
      table.string('location_name', 150).notNullable()
      // Pfad zum Foto. nullable = darf zunächst leer sein, der Upload kommt später
      table.string('image_path', 255).nullable()

      // Fremdschlüssel: user_id zeigt auf users.id.
      // CASCADE = wird ein Nutzer gelöscht, werden auch seine Spots gelöscht
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      // RESTRICT = eine Stadt, zu der es Spots gibt, kann nicht gelöscht werden
      table
        .integer('city_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cities')
        .onDelete('RESTRICT')

      // RESTRICT = eine Kategorie mit Spots kann nicht gelöscht werden (Hinweis von Olha)
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onDelete('RESTRICT')

      // die Unterkategorie ist optional (0..1 im ERM), deshalb nullable
      table
        .integer('subcategory_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('subcategories')
        .onDelete('RESTRICT')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  // läuft bei migration:rollback und löscht die Tabelle wieder
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
