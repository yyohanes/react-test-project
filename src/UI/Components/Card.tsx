import React from 'react'
import classNames from 'classnames'

import { useStyles, AvailableStyle } from 'app/UI/ThemeProvider'

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
  const { styles } = useStyles()

  return (
    <div className={classNames([styles.card, colorStyle && styles[`bg-${colorStyle}`], styles.m3])}>
      <div className={styles.cardBody}>
        {title && (
          <h5 className={styles.cardTitle}>
            {title}
          </h5>
        )}
        <div className={styles.cardText}>
          {children}
        </div>
      </div>
      {footer && (
        <div className={classNames([styles.cardFooter, styles.textMuted])}>
          {footer}
        </div>
      )}
    </div>
  )
}
