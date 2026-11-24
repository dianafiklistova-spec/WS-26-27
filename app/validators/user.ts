import vine, { SimpleMessagesProvider } from '@vinejs/vine'

/**
 * Shared rules for email and password.
 */
const email = () => vine.string().email().maxLength(254)
const password = () => vine.string().minLength(8).maxLength(32)

/**
 * Validator to use when performing self-signup
 */
export const signupValidator = vine.create({
  username: vine
    .string()
    .trim()
    .minLength(3)
    .maxLength(30)
    .unique({ table: 'users', column: 'username' }),
  email: email().unique({ table: 'users', column: 'email' }),
  password: password(),
  passwordConfirmation: password().sameAs('password'),
})

/**
 * Deutsche Fehlermeldungen für die Registrierung (US-01, P11).
 *
 * Schlüssel: "<feld>.<regel>" (feldspezifisch) oder "<regel>" (Fallback).
 * Regelnamen: required, string, email, minLength, maxLength, sameAs und
 * database.unique (kommt von Lucid für .unique()).
 * Platzhalter: {{ field }} (Name aus der Feldliste unten), {{ min }}, {{ max }}.
 *
 * Hinweis: Leere Formularfelder kommen als null an (bodyparser
 * convertEmptyStringsToNull), deshalb greift bei leeren Feldern "required".
 */
signupValidator.messagesProvider = new SimpleMessagesProvider(
  {
    // Benutzername
    'username.required': 'Bitte wähle einen Benutzernamen.',
    'username.minLength': 'Dein Benutzername braucht mindestens {{ min }} Zeichen.',
    'username.maxLength': 'Dein Benutzername darf höchstens {{ max }} Zeichen lang sein.',
    'username.database.unique':
      'Dieser Benutzername ist leider schon vergeben. Probier eine andere Variante.',

    // E-Mail-Adresse
    'email.required': 'Bitte gib deine E-Mail-Adresse ein.',
    'email.email': 'Das ist noch keine gültige E-Mail-Adresse, z. B. name@beispiel.de.',
    'email.maxLength': 'Die E-Mail-Adresse darf höchstens {{ max }} Zeichen lang sein.',
    'email.database.unique': 'Mit dieser E-Mail-Adresse gibt es schon ein Konto.',

    // Passwort
    'password.required': 'Bitte lege ein Passwort fest.',
    'password.minLength': 'Dein Passwort braucht mindestens {{ min }} Zeichen.',
    'password.maxLength': 'Dein Passwort darf höchstens {{ max }} Zeichen lang sein.',

    // Passwort bestätigen
    'passwordConfirmation.required': 'Bitte wiederhole dein Passwort.',
    'passwordConfirmation.minLength': 'Auch die Wiederholung braucht mindestens {{ min }} Zeichen.',
    'passwordConfirmation.maxLength':
      'Auch die Wiederholung darf höchstens {{ max }} Zeichen lang sein.',
    'passwordConfirmation.sameAs': 'Die Passwörter stimmen nicht überein.',

    // Fallbacks für alle übrigen Fälle
    'required': 'Bitte fülle das Feld „{{ field }}“ aus.',
    'string': 'Bitte gib im Feld „{{ field }}“ einen Text ein.',
    'email': 'Bitte gib eine gültige E-Mail-Adresse ein.',
    'minLength': 'Das Feld „{{ field }}“ braucht mindestens {{ min }} Zeichen.',
    'maxLength': 'Das Feld „{{ field }}“ darf höchstens {{ max }} Zeichen lang sein.',
    'sameAs': 'Die Eingaben stimmen nicht überein.',
    'database.unique': '„{{ field }}“ ist leider schon vergeben.',
  },
  {
    username: 'Benutzername',
    email: 'E-Mail-Adresse',
    password: 'Passwort',
    passwordConfirmation: 'Passwort bestätigen',
  }
)

/**
 * Validator to use before validating user credentials
 * during login
 */
export const loginValidator = vine.create({
  email: email(),
  password: vine.string(),
})
