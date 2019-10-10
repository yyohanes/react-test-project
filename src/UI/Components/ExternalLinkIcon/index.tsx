import React from 'react'

import icon from './external-link.svg'

type Props = {
  width?: number
  height?: number
}
export default ({ width = 12, height = 12 }: Props) => (
  <span>
    <img
      style={{
        width,
        height,
      }}
      src={icon}
      alt="External link"
    />
  </span>
)
