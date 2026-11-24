import { SubcategorySchema } from '#database/schema'
import { beforeSave, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from '#models/category'
import User from '#models/user'

/**
 * Unterkategorie (US-10). Kann von jedem Nutzer angelegt werden.
 * Duplikate innerhalb einer Kategorie werden über "normalized_name"
 * und den Unique-Index (category_id, normalized_name) verhindert.
 */
export default class Subcategory extends SubcategorySchema {
  /**
   * Hauptkategorie, zu der diese Unterkategorie gehört (n : 1).
   */
  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  /**
   * Nutzer, der die Unterkategorie angelegt hat (n : 1).
   * Kann null sein, wenn der Nutzer gelöscht wurde.
   */
  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare creator: BelongsTo<typeof User>

  /**
   * Vereinheitlicht einen Namen für den Duplikat-Vergleich:
   * "  Street   ART " -> "street art"
   */
  static normalize(name: string) {
    return name.trim().replace(/\s+/g, ' ').toLowerCase()
  }

  /**
   * Bereinigt vor jedem Speichern den angezeigten Namen (Leerzeichen)
   * und setzt "normalizedName" automatisch – so kann es nie vergessen werden.
   */
  @beforeSave()
  static normalizeName(subcategory: Subcategory) {
    if (subcategory.$dirty.name !== undefined) {
      subcategory.name = subcategory.name.trim().replace(/\s+/g, ' ')
      subcategory.normalizedName = Subcategory.normalize(subcategory.name)
    }
  }
}
