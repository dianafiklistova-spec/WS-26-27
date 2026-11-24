import { Exception } from '@adonisjs/core/exceptions'

/**
 * Wird geworfen, wenn ein eingeloggter Nutzer etwas aufruft,
 * das er nicht darf (z. B. Admin-Bereich oder fremde Spots bearbeiten).
 * Der Exception-Handler zeigt dafür die Fehlerseite 403 an.
 */
export default class ForbiddenException extends Exception {
  static status = 403
  static code = 'E_FORBIDDEN'
  static message = 'Du hast keine Berechtigung für diese Seite.'
}
