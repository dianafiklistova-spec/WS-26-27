import { CitySchema } from '#database/schema' /* importiert die CitySchema klasse aus der schema datei (database/schema.ts). diese klasse enthält die definition der spalten der cities tabelle */

/**
 * Model "City" (US-04, US-07)
 * Steht für eine Stadt aus der Tabelle "cities".
 * Die Spalten (id, name) erbt es automatisch von CitySchema.
 */

export default class City extends CitySchema {
  /* sagt dass die datei ein model ist. diese klasse erbt alle fähigkeiten von CitySchema und damit auch von BaseModel. die klasse enthält die definition der spalten der cities tabelle. jetzt kann später der seeder und der controller import city from “#models/city” schreiben */
}
