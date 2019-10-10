import React, { CSSProperties } from 'react'
import classNames from 'classnames'

import { AvailableStyle } from 'app/UI/Theme'

type Props = {
  style?: CSSProperties
  colorStyle?: AvailableStyle
  children: React.ReactNode
}

export default (props: Props) => {
  const { style, children, colorStyle } = props

  return (
    <span style={style} className={classNames(['badge', 'badge-pill', colorStyle ? `badge-${colorStyle}` : undefined])}>
      {children}
    </span>
  )
}
