// BaseSeeder ist die Vorlage für Seeder, genau wie BaseSchema bei Migrationen
import { BaseSeeder } from '@adonisjs/lucid/seeders'
// das Model City steht für die Tabelle cities
import City from '#models/city'

// Seed-Daten: Städte (US-09). Damit haben alle im Team dieselben Städte.
export default class extends BaseSeeder {
  // läuft nur lokal beim Entwickeln und Testen, nie auf dem echten Server
  static environment = ['development', 'testing']

  async run() {
    // legt jede Stadt an oder aktualisiert sie, falls der Name schon existiert.
    // dadurch entstehen keine doppelten Städte, auch wenn man den Seeder mehrfach startet
    await City.updateOrCreateMany('name', [
      { name: 'Stuttgart' },
      { name: 'Berlin' },
      { name: 'München' },
      { name: 'Hamburg' },
      { name: 'Köln' },
    ])
  }
}
