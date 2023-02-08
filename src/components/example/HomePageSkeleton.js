import React from 'react'
import { LayoutBand, Skeleton, useContainerWidth, Separator, FlowGrid } from '@fs/zion-ui'

const HomePageSkeleton = () => {
  // Initiate state variables and hooks
  const atWidth = useContainerWidth()

  return (
    <LayoutBand>
      <Skeleton.Image height={50} />
      <Skeleton.Image height={275} />
      <Separator />
      <Skeleton.Image height={60} />
      <Separator size="sm" />
      <FlowGrid columnCount={atWidth({ lg: 2 })}>
        <Skeleton.Image height={375} />
        <Skeleton.Image height={375} />
      </FlowGrid>
      <Separator />
      <Skeleton.Image height={250} />
    </LayoutBand>
  )
}

export default HomePageSkeleton
