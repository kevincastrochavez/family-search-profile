import React from 'react'
import { HeaderBlock, LayoutBand, Separator } from '@fs/zion-ui'

const Banner = ({ message, color }) => (
  <LayoutBand color={color}>
    <Separator />
    <HeaderBlock centered size="sm" heading={message} />
    <Separator />
  </LayoutBand>
)

export default React.memo(Banner)
