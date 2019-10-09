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
    <button
      type="button"
      className={classNames(styles.btn, colorStyle && styles[`btn-${colorStyle}`])}
    >
      {children}
    </button>
  )
}
