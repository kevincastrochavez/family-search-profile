import React, { Suspense } from 'react'
import {
  Body1,
  colors,
  DialogOverlay,
  Grid,
  FlowGrid,
  Row,
  HeaderBlock,
  LayoutBand,
  Separator,
  Skeleton,
  useContainerWidth,
  useOverlay,
} from '@fs/zion-ui'

import { Link } from '@fs/zion-router'
import { css } from '@emotion/core'
import zionDebug from '@fs/zion-debug'
import { NoticeLoading } from '@fs/zion-icon'
import ZionDesignCard from './ZionDesignCard'
import LearnReactCard from './LearnReactCard'
import PurposeStatementGenerator from './PurposeStatementGenerator'
import WagonWheel from './WagonWheel'
import ResponsiveDebug from './ResponsiveDebug'
import RequireSignedInUser from './RequireSignedInUser'

const debug = zionDebug('frontier:cra:example')
const WagonWheelControl = React.lazy(() => import('./WagonWheelControl'))
const ArtifactsViewer = React.lazy(() => import('./ArtifactsViewer'))

const wagonButtonCss = css`
  cursor: pointer;
  border: none;
  background-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -html-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  &:focus {
    outline: none;
    background-color: ${colors.gray02};
  }
`
const HomePage = () => {
  // Initiate state variables and hooks
  const atWidth = useContainerWidth()
  const overlay = useOverlay({})
  const [wheelColor, setWheelColor] = React.useState(colors.gray100)
  const [wheelSpeed, setWheelSpeed] = React.useState('0s')

  const handleWheelSpeedChange = React.useCallback(
    (speed) => {
      debug(`changing wheel animation speed: ${speed}`)
      setWheelSpeed(speed)
    },
    [setWheelSpeed]
  )

  const handleWheelColorChange = React.useCallback(
    (color) => {
      debug(`changing wheel color: ${color}`)
      setWheelColor(color)
    },
    [setWheelColor]
  )

  return (
    <LayoutBand>
      <Grid>
        <HeaderBlock
          alignY="middle"
          columns={atWidth({ sm: 8 })}
          size={atWidth({ default: 'md', lg: 'lg', xl: 'xl' })}
          heading="This is the beginning of something amazing"
          subHeading="Welcome to the start of your new Frontier application."
        />

        <button
          columns={atWidth({ sm: 4 })}
          aria-label="Configure wagon wheel"
          css={wagonButtonCss}
          type="button"
          tabIndex={0}
          onClick={overlay.handleClick}
        >
          <WagonWheel
            alt="Wagon Wheel"
            color={wheelColor}
            animationDuration={wheelSpeed}
            handleClick={overlay.handleClick}
          />
        </button>
      </Grid>
      <Separator />
      <LayoutBand color={colors.gray02}>
        <Separator size="xxs" />
        <Body1>
          To get started, take a look at the code in <code>src/App.js</code>. Ready to learn more? Check out the
          resources below or visit the <Link to="https://beta.familysearch.org/frontier/docs">Frontier Docs</Link>.
        </Body1>
      </LayoutBand>
      <Separator />
      <FlowGrid gutters="md" columnCount={atWidth({ lg: 2 })}>
        <ZionDesignCard />
        <LearnReactCard />
      </FlowGrid>
      <Separator />
      <PurposeStatementGenerator />
      <Separator />
      <React.Suspense fallback={<Skeleton.Image height={250} />}>
        <RequireSignedInUser
          Component={ArtifactsViewer}
          fallback={
            <LayoutBand color={colors.blue05}>
              <Separator size="xxs" />
              <Body1 centered>
                We really want to show you some pictures of your ancestors but you must sign in first.
              </Body1>
            </LayoutBand>
          }
        />
      </React.Suspense>
      <Separator size="md" />
      {/* Overlay */}
      <DialogOverlay title="Wagon Wheel Controls" {...overlay}>
        <Suspense
          fallback={
            <Row alignX="center">
              <NoticeLoading size="md" />
            </Row>
          }
        >
          <WagonWheelControl
            color={wheelColor}
            animationDuration={wheelSpeed}
            handleColorChange={handleWheelColorChange}
            handleAnimationDurationChange={handleWheelSpeedChange}
          />
        </Suspense>
      </DialogOverlay>
      <ResponsiveDebug />
    </LayoutBand>
  )
}

export default HomePage
