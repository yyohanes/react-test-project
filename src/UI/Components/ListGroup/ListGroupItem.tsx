import React from 'react'
import classNames from 'classnames'

import { useStyles, AvailableStyle } from 'app/UI/ThemeProvider'

type Props = {
  colorStyle?: AvailableStyle
  children: React.ReactNode
}

export default (props: Props) => {
  const { children, colorStyle } = props
  const { styles } = useStyles()

  return (
    <div className={classNames(styles.listGroupItem, styles.listGroupItemAction, colorStyle && styles[`list-group-item-${colorStyle}`])}>
      {children}
    </div>
  )
}
