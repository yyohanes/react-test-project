import React from 'react'

import { useStyles } from 'app/UI/ThemeProvider'
import ListGroupItem from './ListGroupItem'

type Props = {
  children: React.ReactNode
}

const ListGroup = (props: Props) => {
  const { children } = props
  const { styles } = useStyles()

  return (
    <div className={styles.listGroup}>
      {children}
    </div>
  )
}

export default ListGroup

export {
  ListGroupItem,
}
