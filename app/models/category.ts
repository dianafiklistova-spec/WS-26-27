import { CategorySchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Subcategory from '#models/subcategory'

/**
 * Hauptkategorie (US-09). Wird nur von Admins verwaltet;
 * der Name ist per Unique-Constraint in der Datenbank eindeutig.
 */
export default class Category extends CategorySchema {
  /**
   * Alle Unterkategorien dieser Kategorie (1 : n).
   */
  @hasMany(() => Subcategory)
  declare subcategories: HasMany<typeof Subcategory>
}
