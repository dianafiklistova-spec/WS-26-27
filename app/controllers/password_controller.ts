import hash from '@adonisjs/core/services/hash'
import { changePasswordValidator } from '#validators/password'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * PasswordController: Passwort ändern (US-03).
 * Läuft hinter der Auth-Middleware.
 */
export default class PasswordController {
  /**
   * Formular "Passwort ändern"
   */
  async edit({ view }: HttpContext) {
    return view.render('pages/settings/password')
  }

  /**
   * Neues Passwort speichern, aber nur mit dem richtigen aktuellen Passwort
   */
  async update({ request, response, auth, session }: HttpContext) {
    const user = auth.getUserOrFail()
    const { currentPassword, password } = await request.validateUsing(changePasswordValidator)

    // Aktuelles Passwort mit dem gespeicherten Hash vergleichen
    const isCurrentPasswordValid = await hash.verify(user.password, currentPassword)
    if (!isCurrentPasswordValid) {
      return this.backWithError(response, session, 'Das aktuelle Passwort ist nicht richtig.')
    }

    if (currentPassword === password) {
      return this.backWithError(
        response,
        session,
        'Das neue Passwort muss sich vom aktuellen unterscheiden.',
        'password'
      )
    }

    // Wird beim Speichern automatisch gehasht (withAuthFinder im User-Model)
    user.password = password
    await user.save()

    session.flash('success', 'Dein Passwort wurde geändert.')
    return response.redirect().toRoute('password.edit')
  }

  /**
   * Zurück zum Formular mit einer Fehlermeldung am passenden Feld.
   * Passwörter werden bewusst nicht als alte Werte zurückgegeben.
   */
  private backWithError(
    response: HttpContext['response'],
    session: HttpContext['session'],
    message: string,
    field: 'currentPassword' | 'password' = 'currentPassword'
  ) {
    session.flash('inputErrorsBag', { [field]: [message] })
    return response.redirect().toRoute('password.edit')
  }
}
