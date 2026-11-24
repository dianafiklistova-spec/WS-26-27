// SpotSchema wurde automatisch aus der Tabelle erzeugt und enthält alle Spalten
import { SpotSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import City from '#models/city'
import Category from '#models/category'
import Subcategory from '#models/subcategory'

// Model "Spot" (US-04). Die Spalten erbt es von SpotSchema.
export default class Spot extends SpotSchema {
  // belongsTo = "gehört zu": jeder Spot gehört zu genau einem Nutzer (n : 1)
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // jeder Spot liegt in genau einer Stadt
  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>

  // jeder Spot hat genau eine Hauptkategorie
  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  // die Unterkategorie ist optional
  @belongsTo(() => Subcategory)
  declare subcategory: BelongsTo<typeof Subcategory>
}
