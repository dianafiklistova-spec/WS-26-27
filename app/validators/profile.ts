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
})

updateProfileValidator.messagesProvider = new SimpleMessagesProvider(
  {
    'username.required': 'Bitte gib einen Benutzernamen ein.',
    'username.minLength': 'Dein Benutzername braucht mindestens {{ min }} Zeichen.',
    'username.maxLength': 'Dein Benutzername darf höchstens {{ max }} Zeichen lang sein.',
    'username.database.unique': 'Dieser Benutzername ist leider schon vergeben.',
    'bio.maxLength': 'Deine Bio darf höchstens {{ max }} Zeichen lang sein.',
  },
  {
    username: 'Benutzername',
    bio: 'Bio',
  }
)
