import { struct } from 'superstruct'
import { User } from 'app/Services/SourceControl/Models'

export const UserStruct = struct.partial({
  login: 'string',
})

export default function (raw: any): User | null {
  const [error, validatedData] = UserStruct.validate(raw)

  if (validatedData) {
    return {
      name: validatedData.login,
    }
  }

  if (__DEBUG__) {
    console.error(error)
  }
  return null
}
