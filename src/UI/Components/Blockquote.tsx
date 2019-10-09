import React from 'react'
import classNames from 'classnames'

import { useStyles } from 'app/UI/ThemeProvider'

type Props = {
  footerLine?: string
  children?: React.ReactNode
}

export default (props: Props) => {
  const { children, footerLine } = props
  const { styles } = useStyles()

  return (
    <blockquote className={styles.blockquote}>
      {children}
      {footerLine && (
        <footer className={classNames([styles.blockquoteFooter, styles.textRight])}>
          <small className={styles.textMuted}>
            {footerLine}
          </small>
        </footer>
      )}
    </blockquote>
  )
}
