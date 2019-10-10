import React from 'react'
import dayjs from 'dayjs'

import { Badge, ExternalLinkIcon } from 'app/UI'
import { Issue } from 'app/Services/SourceControl'

type Props = {
  issue: Issue
}

export default ({ issue }: Props) => (
  <div>
    <h5>
      {issue.title}
      &nbsp;
      <ExternalLinkIcon />
    </h5>
    <small>{`Posted at ${dayjs(issue.createdAt).format('MMM DD YYYY HH:mm:ss')}`}</small>
    <div className="float-right">
      {issue.labels.map((label, idx: number) => (
        <Badge
          key={idx}
          style={{
            backgroundColor: `#${label.color}`,
          }}
        >
          {label.name}
        </Badge>
      ))}
    </div>
  </div>
)
