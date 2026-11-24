// Holt CitySchema aus database/schema.ts. Diese Klasse wird nach "migration:run"
// automatisch erzeugt und beschreibt die Spalten der Tabelle "cities" (id, name).
import { CitySchema } from '#database/schema'

/**
 * Model "City" (US-04, US-07)
 * Steht für eine Stadt aus der Tabelle "cities".
 * Die Spalten (id, name) erbt es automatisch von CitySchema.
 * Seeder und Controller können es mit: import City from '#models/city' benutzen.
 */
export default class City extends CitySchema {}
