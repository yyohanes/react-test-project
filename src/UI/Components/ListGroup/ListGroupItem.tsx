import React from 'react'
import classNames from 'classnames'

import { AvailableStyle } from 'app/UI/Theme'

type Props = {
  colorStyle?: AvailableStyle
  children: React.ReactNode
}

export default (props: Props) => {
  const { children, colorStyle } = props

  return (
    <div className={classNames(['list-group-item', 'list-group-item-action', colorStyle ? `list-group-item-${colorStyle}` : undefined])}>
      {children}
    </div>
  )
}
