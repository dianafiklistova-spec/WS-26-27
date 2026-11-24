import User from '#models/user'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * SessionController handles user authentication and session management.
 * It provides methods for displaying the login page, authenticating users,
 * and logging out.
 */
export default class SessionController {
  /**
   * Display the login page
   */
  async create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  /**
   * Authenticate user credentials and create a new session
   */
  async store({ request, auth, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    // Bei falscher E-Mail oder falschem Passwort wirft verifyCredentials einen Fehler.
    // AdonisJS leitet dann zurück zum Login und zeigt die Fehlermeldung an.
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    session.flash('success', `Willkommen zurück, ${user.username}!`)

    // Nach dem Login geht es zum Feed (Startseite)
    response.redirect().toRoute('home')
  }

  /**
   * Log out the current user and destroy their session
   */
  async destroy({ auth, response, session }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Du hast dich erfolgreich abgemeldet.')
    response.redirect().toRoute('home')
  }
}
