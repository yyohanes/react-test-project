import { struct } from 'superstruct'
import { Label } from 'app/Services/SourceControl/Models'

export const LabelStruct = struct.partial({
  color: 'string?',
  name: 'string',
})

export default function (raw: any): Label | null {
  const [error, validatedData] = LabelStruct.validate(raw)

  if (validatedData) {
    return {
      color: validatedData.color,
      name: validatedData.name,
    }
  }

  console.error(error)
  return null
}
