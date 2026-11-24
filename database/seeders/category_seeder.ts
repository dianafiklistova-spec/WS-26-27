// BaseSeeder ist die Vorlage für Seeder
import { BaseSeeder } from '@adonisjs/lucid/seeders'
// das Model Category steht für die Tabelle categories (Hauptkategorien)
import Category from '#models/category'

// Seed-Daten: Hauptkategorien (US-09). Im echten Betrieb legen nur Admins neue an.
export default class extends BaseSeeder {
  // läuft nur lokal beim Entwickeln und Testen, nie auf dem echten Server
  static environment = ['development', 'testing']

  async run() {
    // legt jede Kategorie an oder aktualisiert sie, falls der Name schon existiert.
    // der Name ist in der Datenbank eindeutig (unique), deshalb ist er das Suchkriterium
    await Category.updateOrCreateMany('name', [
      { name: 'Essen & Trinken' },
      { name: 'Natur & Outdoor' },
      { name: 'Kunst & Kultur' },
      { name: 'Shopping' },
      { name: 'Nachtleben' },
      { name: 'Sehenswürdigkeiten' },
    ])
  }
}
