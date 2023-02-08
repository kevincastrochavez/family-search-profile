import React from 'react'
import { css } from '@emotion/core'
import { colors, useContainerWidth } from '@fs/zion-ui'

const containerCss = css`
  position: fixed;
  bottom: 0px;
  right: 0px;
  background: ${colors.transparent.blue02};
  color: ${colors.gray100};
  padding: 5px;
`

const ResponsiveDebug = () => {
  const atWidth = useContainerWidth()

  return <div css={containerCss}>{atWidth({ default: 'XS', sm: 'SM', md: 'MD', lg: 'LG', xl: 'XL' })}</div>
}

export default ResponsiveDebug
