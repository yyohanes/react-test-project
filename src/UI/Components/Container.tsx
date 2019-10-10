import React from 'react'

type Props = {
  children: React.ReactNode
}

export default (props: Props) => {
  const { children } = props

  return (
    <div className="container">
      {children}
    </div>
  )
}
