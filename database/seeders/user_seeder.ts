import { BaseSeeder } from '@adonisjs/lucid/seeders' /* die vorlage für seeder so wie baseschema die vorlage für die migration war */
import User from '#models/user' /* das model, das wir seedern wollen */

/**
 * Seed-Daten: Admin und Testnutzer (US-09)
 * Nur für die Entwicklung, damit alle im Team dieselben Testkonten haben.
 */
export default class extends BaseSeeder { /* wir erstellen eine neue Klasse, die von BaseSeeder erbt. Diese Klasse wird die Seed-Daten für die User-Tabelle bereitstellen. */
  // Läuft nur lokal beim Entwickeln und Testen, nie auf dem echten Server
  static environment = ['development', 'testing'] /* wir geben an, dass dieser Seeder nur in den Umgebungen "development" und "testing" ausgeführt werden soll. */

  async run() { /* die run-Methode wird aufgerufen, wenn der Seeder ausgeführt wird. Hier definieren wir die Seed-Daten. */
    // Legt die Nutzer an oder aktualisiert sie, falls die E-Mail schon existiert
    await User.updateOrCreateMany('email', [ /* wir verwenden die Methode updateOrCreateMany, um mehrere Nutzer gleichzeitig zu erstellen oder zu aktualisieren. Die E-Mail-Adresse wird als eindeutiges Kriterium verwendet, um zu entscheiden, ob ein Nutzer erstellt oder aktualisiert werden soll. */
      {
        username: 'admin',
        email: 'admin@spotted.de',
        password: 'admin12345',
        role: 'admin',
      },
      {
        username: 'testnutzer',
        email: 'nutzer@spotted.de',
        password: 'nutzer12345',
        role: 'user',
      },
    ])
  }
}