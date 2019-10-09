import React from 'react'

import { useStyles } from 'app/UI/ThemeProvider'

type Props = {
  children: React.ReactNode
}

export default (props: Props) => {
  const { children } = props
  const { styles } = useStyles()

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
