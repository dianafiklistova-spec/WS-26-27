import { updateProfileValidator } from '#validators/profile'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * ProfileController: eigenes Profil anzeigen und bearbeiten (US-02).
 * Alle Routen laufen hinter der Auth-Middleware, auth.user ist also immer gesetzt.
 */
export default class ProfileController {
  /**
   * Eigene Profilseite
   */
  async show({ view, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return view.render('pages/profile/show', { profile: user })
  }

  /**
   * Formular "Profil bearbeiten"
   */
  async edit({ view, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return view.render('pages/profile/edit', { profile: user })
  }

  /**
   * Benutzername und Bio speichern
   */
  async update({ request, response, auth, session }: HttpContext) {
    const user = auth.getUserOrFail()

    const { username, bio } = await request.validateUsing(updateProfileValidator, {
      meta: { userId: user.id },
    })

    user.merge({ username, bio })
    await user.save()

    session.flash('success', 'Dein Profil wurde gespeichert.')
    return response.redirect().toRoute('profile.show')
  }
}
