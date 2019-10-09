import React, { CSSProperties } from 'react'
import classNames from 'classnames'

import { useStyles, AvailableStyle } from 'app/UI/ThemeProvider'

type Props = {
  style?: CSSProperties
  colorStyle?: AvailableStyle
  children: React.ReactNode
}

export default (props: Props) => {
  const { style, children, colorStyle } = props
  const { styles } = useStyles()

  return (
    <span style={style} className={classNames(styles.badge, styles.badgePill, colorStyle && styles[`badge-${colorStyle}`])}>
      {children}
    </span>
  )
}
