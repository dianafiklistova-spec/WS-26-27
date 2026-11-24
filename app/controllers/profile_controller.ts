import { randomUUID } from 'node:crypto'
import { unlink } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import { updateProfileValidator } from '#validators/profile'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Ordner für Profilfotos, liegt in public/ und wird
 * von der Static-Middleware unter /uploads/avatars ausgeliefert
 */
const AVATAR_URL_PREFIX = '/uploads/avatars'

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
   * Benutzername, Bio und optional ein neues Profilfoto speichern
   */
  async update({ request, response, auth, session }: HttpContext) {
    const user = auth.getUserOrFail()

    const { username, bio, avatar } = await request.validateUsing(updateProfileValidator, {
      meta: { userId: user.id },
    })

    user.merge({ username, bio })

    if (avatar) {
      // Zufälliger Dateiname, damit niemand fremde Dateien überschreiben
      // oder erraten kann und der Browser kein altes Bild aus dem Cache zeigt
      const fileName = `${randomUUID()}.${avatar.extname}`
      await avatar.move(app.makePath('public', AVATAR_URL_PREFIX), { name: fileName })

      // Altes Foto erst löschen, wenn das neue sicher gespeichert ist
      await this.deleteAvatarFile(user.profileImage)
      user.profileImage = `${AVATAR_URL_PREFIX}/${fileName}`
    }

    await user.save()

    session.flash('success', 'Dein Profil wurde gespeichert.')
    return response.redirect().toRoute('profile.show')
  }

  /**
   * Löscht ein altes Profilfoto von der Festplatte.
   * Fehlt die Datei schon, ist das kein Fehler.
   */
  private async deleteAvatarFile(profileImage: string | null) {
    if (!profileImage?.startsWith(`${AVATAR_URL_PREFIX}/`)) {
      return
    }

    try {
      await unlink(app.makePath('public', profileImage))
    } catch {
      // Datei existiert nicht mehr – nichts zu tun
    }
  }
}
