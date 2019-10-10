import React from 'react'

import ListGroupItem from './ListGroupItem'

type Props = {
  children: React.ReactNode
}

const ListGroup = (props: Props) => {
  const { children } = props

  return (
    <div className="list-group">
      {children}
    </div>
  )
}

export default ListGroup

export {
  ListGroupItem,
}
