import React from 'react'
import classNames from 'classnames'

type Props = {
  footerLine?: string
  children?: React.ReactNode
}

export default (props: Props) => {
  const { children, footerLine } = props

  return (
    <blockquote className="blockquote">
      {children}
      {footerLine && (
        <footer className={classNames(['blockquote-footer', 'text-right'])}>
          <small className="text-muted">
            {footerLine}
          </small>
        </footer>
      )}
    </blockquote>
  )
}
