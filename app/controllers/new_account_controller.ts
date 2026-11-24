import User from '#models/user' /* holt das user-model, das werkzeug für die tabelle users. genau wie das city-model in app/models/city.ts. */
import { signupValidator } from '#validators/user' /* holt die prüfregeln für das formular. benutzername 3-30 zeichen, email muss gültig sein, passwort 8-32 zeichen. */
import type { HttpContext } from '@adonisjs/core/http' /* HttpContext ist ein "Paket" mit allem rund um eine anfrage: request, response, auth und view. */

/**
 * NewAccountController handles user registration.
 * It provides methods for displaying the signup page and creating
 * new user accounts.
 */
export default class NewAccountController { /* die klasse für die registrierung */
  /**
   * Display the signup page
   */
  async create({ view }: HttpContext) { /* die methode für die registrierungsseite. sie rendert die signup-seite. */
    return view.render('pages/auth/signup') /* rendert die signup-seite resources/views/pages/auth/signup.edge, also das formular. */
  }

  /**
   * Create a new user account and authenticate the user
   */
  async store({ request, response, auth }: HttpContext) { /* die methode für die registrierung. sie nimmt die daten aus dem formular, prüft sie und erstellt einen neuen benutzer. */
    const { username, email, password } = await request.validateUsing(signupValidator) /* prüft die daten aus dem formular. wenn etwas falsch ist, kommt man zurück zum formular und die fehler stehen am feld. */
    const user = await User.create({ username, email, password, role: 'user' }) /* erstellt einen neuen benutzer mit der rolle "user" in der datenbank. das passwort wird automatisch gehasht. */

    await auth.use('web').login(user) /* loggt den benutzer ein. login erstellt eine session für den benutzer. */
    response.redirect().toRoute('home') /* leitet den benutzer zur startseite (feed) weiter. */
  }
}