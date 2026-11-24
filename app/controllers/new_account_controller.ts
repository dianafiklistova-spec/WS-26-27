// Das User-Model, das Werkzeug für die Tabelle "users" (genau wie das City-Model in app/models/city.ts)
import User from '#models/user'
// Die Prüfregeln für das Formular: Benutzername 3-30 Zeichen, gültige E-Mail, Passwort 8-32 Zeichen
import { signupValidator } from '#validators/user'
// HttpContext ist ein "Paket" mit allem rund um eine Anfrage: request, response, auth und view
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Registrierung (US-01)
 * Zeigt das Registrierungsformular an und legt neue Nutzerkonten an.
 */
export default class NewAccountController {
  /**
   * GET /signup – zeigt das leere Registrierungsformular
   */
  async create({ view }: HttpContext) {
    // Rendert die Seite resources/views/pages/auth/signup.edge, also das Formular
    return view.render('pages/auth/signup')
  }

  /**
   * POST /signup – prüft die Eingaben, legt den Nutzer an,
   * meldet ihn direkt an und leitet zum Feed weiter
   */
  async store({ request, response, auth }: HttpContext) {
    // Prüft die Formulardaten. Wenn etwas falsch ist, kommt man zurück zum Formular
    // und die Fehlermeldungen stehen direkt am jeweiligen Feld
    const { username, email, password } = await request.validateUsing(signupValidator)

    // Erstellt den neuen Nutzer mit der Rolle "user" in der Datenbank.
    // Die Rolle setzen wir selbst, sie kommt nie aus dem Formular (niemand kann sich zum Admin machen).
    // Das Passwort wird automatisch gehasht.
    const user = await User.create({ username, email, password, role: 'user' })

    // Meldet den Nutzer direkt an (erstellt eine Session)
    await auth.use('web').login(user)

    // Leitet zur Startseite (Feed) weiter
    response.redirect().toRoute('home')
  }
}
