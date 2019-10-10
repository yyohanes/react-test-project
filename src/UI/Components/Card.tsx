import React from 'react'
import classNames from 'classnames'

import { AvailableStyle } from 'app/UI/Theme'

type Props = {
  title?: string
  colorStyle?: AvailableStyle
  children: React.ReactNode
  footer?: React.ReactNode
}

export default (props: Props) => {
  const {
    children,
    colorStyle,
    title,
    footer,
  } = props

  return (
    <div className={classNames(['card', colorStyle ? `bg-${colorStyle}` : undefined, 'm-3'])}>
      <div className="card-body">
        {title && (
          <h5 className="card-title">
            {title}
          </h5>
        )}
        <div className="card-text">
          {children}
        </div>
      </div>
      {footer && (
        <div className={classNames(['card-footer', 'text-muted'])}>
          {footer}
        </div>
      )}
    </div>
  )
}
