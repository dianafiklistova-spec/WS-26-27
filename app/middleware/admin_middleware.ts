import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import ForbiddenException from '#exceptions/forbidden_exception'

/**
 * Admin-Middleware: lässt nur Nutzer mit der Rolle "admin" durch.
 *
 * Muss immer nach der Auth-Middleware laufen, damit der Nutzer
 * schon geladen ist:
 *   .use([middleware.auth(), middleware.admin()])
 */
export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user

    // Eingeloggt, aber kein Admin -> 403
    if (!user || !user.isAdmin) {
      throw new ForbiddenException()
    }

    return next()
  }
}
