import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

/**
 * Mögliche Rollen eines Nutzers (Spalte "role" in der Tabelle users).
 */
export type UserRole = 'user' | 'admin'

/**
 * User model represents a user in the application.
 * It extends UserSchema and includes authentication capabilities
 * through the withAuthFinder mixin (the password is hashed automatically).
 */
export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  declare role: UserRole

  /**
   * true, wenn der Nutzer Zugriff auf den Admin-Bereich hat.
   */
  get isAdmin() {
    return this.role === 'admin'
  }

  /**
   * Get the user's initials from the username
   * (first two characters in upper case).
   */
  get initials() {
    return this.username.slice(0, 2).toUpperCase()
  }
}
