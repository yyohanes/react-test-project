import React from 'react'
import dayjs from 'dayjs'

import { Badge } from 'app/UI'

type Props = {
  issue: any
}

export default ({ issue }: Props) => (
  <div>
    <h5>{issue.title}</h5>
    <small>{`Posted at ${dayjs(issue.updatedAt).format('MMM DD YYYY HH:mm:ss')}`}</small>
    {issue.labels.map((label: any, idx: number) => (
      <Badge
        key={idx}
        style={{
          backgroundColor: `#${issue.color}`,
        }}
      >
        {issue.name}
      </Badge>
    ))}
  </div>
)
