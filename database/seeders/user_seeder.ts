// Vorlage für Seeder (so wie BaseSchema die Vorlage für Migrationen ist)
import { BaseSeeder } from '@adonisjs/lucid/seeders'
// Das User-Model, das Werkzeug für die Tabelle "users"
import User from '#models/user'

/**
 * Seed-Daten: Admin und Testnutzer (US-09)
 * Nur für die Entwicklung, damit alle im Team dieselben Testkonten haben.
 */
export default class extends BaseSeeder {
  // Läuft nur lokal beim Entwickeln und Testen, nie auf dem echten Server
  static environment = ['development', 'testing']

  // run() wird ausgeführt, wenn man "node ace db:seed" eingibt
  async run() {
    // Legt die Nutzer an oder aktualisiert sie, falls die E-Mail schon existiert.
    // So kann man den Seeder mehrmals ausführen, ohne Fehler wegen doppelter E-Mails.
    await User.updateOrCreateMany('email', [
      // Admin-Konto zum Testen des Admin-Bereichs
      {
        username: 'admin',
        email: 'admin@spotted.de',
        password: 'admin12345',
        role: 'admin',
      },
      // Normales Testkonto
      {
        username: 'testnutzer',
        email: 'nutzer@spotted.de',
        password: 'nutzer12345',
        role: 'user',
      },
    ])
  }
}
