import React from 'react'
import marked from 'marked'
import dayjs from 'dayjs'

import { Issue } from 'app/Services/SourceControl'
import { Card, Blockquote } from 'app/UI'

type Props = {
  issue: Issue
}

export default ({ issue }: Props) => (
  <Card
    title={issue.title}
    footer={(
      <small>
        {`Issue #${issue.reference}. Posted on ${dayjs(issue.createdAt).format('MMM DD YYYY HH:mm:ss')}`}
      </small>
    )}
  >
    {issue.body && (
      // eslint-disable-next-line react/no-danger
      <div dangerouslySetInnerHTML={{ __html: marked(issue.body) }} />
    )}

    <Blockquote footerLine={issue.user.name} />
  </Card>
)
