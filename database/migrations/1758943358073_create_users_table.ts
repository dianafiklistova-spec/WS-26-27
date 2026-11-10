import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Tabelle "users" (US-01, US-02, US-09)
 *
 * Felder gemäß ERM:
 * - username:      eindeutiger Benutzername (Pflicht bei Registrierung)
 * - email:         eindeutige E-Mail-Adresse (Login)
 * - password:      nur als Hash gespeichert (Hashing übernimmt das User-Model)
 * - bio:           optionale Kurzbeschreibung fürs Profil
 * - profile_image: optionaler Pfad zum hochgeladenen Profilfoto
 * - role:          "user" (Standard) oder "admin" für den Admin-Bereich
 */
export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username', 30).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.text('bio').nullable()
      table.string('profile_image').nullable()
      table.enum('role', ['user', 'admin']).notNullable().defaultTo('user')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
