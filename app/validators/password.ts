import vine, { SimpleMessagesProvider } from '@vinejs/vine'

/**
 * Validator für "Passwort ändern" (US-03).
 *
 * Ob das aktuelle Passwort stimmt, prüft der Controller mit dem Hash
 * aus der Datenbank. Hier wird nur geprüft, dass alles ausgefüllt ist
 * und das neue Passwort die Regeln aus der Registrierung erfüllt.
 */
export const changePasswordValidator = vine.create({
  currentPassword: vine.string(),
  password: vine.string().minLength(8).maxLength(32),
  passwordConfirmation: vine.string().sameAs('password'),
})

changePasswordValidator.messagesProvider = new SimpleMessagesProvider(
  {
    'currentPassword.required': 'Bitte gib dein aktuelles Passwort ein.',
    'password.required': 'Bitte gib ein neues Passwort ein.',
    'password.minLength': 'Das neue Passwort braucht mindestens {{ min }} Zeichen.',
    'password.maxLength': 'Das neue Passwort darf höchstens {{ max }} Zeichen lang sein.',
    'passwordConfirmation.required': 'Bitte wiederhole das neue Passwort.',
    'passwordConfirmation.sameAs': 'Die Passwörter stimmen nicht überein.',
  },
  {
    currentPassword: 'Aktuelles Passwort',
    password: 'Neues Passwort',
    passwordConfirmation: 'Neues Passwort bestätigen',
  }
)
