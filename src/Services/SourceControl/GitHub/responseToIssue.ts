import { struct } from 'superstruct'

import { Issue, User } from '../Models'
import responseToLabel, { LabelStruct } from './responseToLabel'
import responseToUser, { UserStruct } from './responseToUser'

export const IssueStruct = struct.partial({
  id: 'number',
  number: 'number',
  title: 'string',
  body: 'string',
  created_at: 'string',
  updated_at: 'string',
  html_url: 'string',
  state: struct.enum(['open', 'closed']),
  labels: [LabelStruct],
  user: UserStruct,
})

export default function (raw: any): Issue | null {
  const [error, validatedData] = IssueStruct.validate(raw)

  if (validatedData) {
    return {
      id: validatedData.id,
      reference: validatedData.number,
      title: validatedData.title,
      body: validatedData.body,
      createdAt: new Date(validatedData.created_at),
      updatedAt: new Date(validatedData.updated_at),
      url: validatedData.html_url,
      state: validatedData.state,
      labels: validatedData.labels.map(validatedLabel => responseToLabel(validatedLabel)),
      user: responseToUser(validatedData.user) as User,
    }
  }

  console.error(error)
  return null
}
