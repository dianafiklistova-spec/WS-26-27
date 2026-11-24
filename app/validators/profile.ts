import vine, { SimpleMessagesProvider } from '@vinejs/vine'

/**
 * Validator für "Profil bearbeiten" (US-02).
 *
 * Der Benutzername muss eindeutig sein. Der eigene Name zählt dabei
 * nicht als Dublette, deshalb wird die ID des eingeloggten Nutzers
 * als Metadaten übergeben und in der Unique-Prüfung ausgeschlossen:
 *   request.validateUsing(updateProfileValidator, { meta: { userId: user.id } })
 */
export const updateProfileValidator = vine.withMetaData<{ userId: number }>().create({
  username: vine
    .string()
    .trim()
    .minLength(3)
    .maxLength(30)
    .unique({
      table: 'users',
      column: 'username',
      filter: (db, _value, field) => {
        db.whereNot('id', field.meta.userId)
      },
    }),
  bio: vine.string().trim().maxLength(300).nullable(),

  // Profilfoto ist optional. Erlaubt sind nur Bilder bis 2 MB.
  // AdonisJS prüft den Dateityp anhand des Inhalts, nicht nur anhand der Endung.
  avatar: vine
    .file({
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    })
    .optional(),
})

updateProfileValidator.messagesProvider = new SimpleMessagesProvider(
  {
    'username.required': 'Bitte gib einen Benutzernamen ein.',
    'username.minLength': 'Dein Benutzername braucht mindestens {{ min }} Zeichen.',
    'username.maxLength': 'Dein Benutzername darf höchstens {{ max }} Zeichen lang sein.',
    'username.database.unique': 'Dieser Benutzername ist leider schon vergeben.',
    'bio.maxLength': 'Deine Bio darf höchstens {{ max }} Zeichen lang sein.',
    'avatar.file': 'Bitte wähle eine Bilddatei aus.',
    'avatar.file.size': 'Das Profilfoto darf höchstens 2 MB groß sein.',
    'avatar.file.extname': 'Erlaubt sind nur JPG-, PNG- und WebP-Bilder.',
  },
  {
    username: 'Benutzername',
    bio: 'Bio',
    avatar: 'Profilfoto',
  }
)
