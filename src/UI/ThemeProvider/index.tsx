import React from 'react'

import ThemeContext from './ThemeContext'
import useStyles from './useStyles'

export type AvailableStyle = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'

type Props = {
  styles: any
  children: React.ReactNode
}
const ThemeProvider = (props: Props) => {
  const { children, styles } = props

  return (
    <ThemeContext.Provider value={{ styles }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider

export {
  ThemeContext,
  useStyles,
}
