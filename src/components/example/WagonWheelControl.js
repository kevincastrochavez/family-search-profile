import React from 'react'
import { colors, Grid, Radio, RadioGroup, FlowGrid, usePageWidth } from '@fs/zion-ui'
import { css } from '@emotion/core'
import WagonWheel from './WagonWheel'

export const WheelSpeedOptions = {
  stop: {
    label: 'Stopped',
    animationDuration: '0s',
  },
  slow: {
    label: 'Slow',
    animationDuration: '20s',
  },
  medium: {
    label: 'Medium',
    animationDuration: '7s',
  },
  fast: {
    label: 'Fast',
    animationDuration: '1s',
  },
}

const fallbackWidthValue = '740px' // This is an arbitray value found to be the best width to fall back to in this case.
const widthDivisor = 1.5

const colorCellCss = css`
  height: calc(var(--cell-width, ${fallbackWidthValue}) / ${widthDivisor});
  cursor: pointer;
`

const WagonWheelControl = ({ animationDuration, color, handleColorChange, handleAnimationDurationChange }) => {
  const atWidth = usePageWidth()

  return (
    <Grid>
      <WagonWheel columns={atWidth({ lg: 6 })} maxHeight={150} color={color} animationDuration={animationDuration} />
      <RadioGroup
        label="Wheel Speed"
        columns={atWidth({ lg: 6 })}
        orientation={atWidth({ sm: 'horizontal', lg: 'vertical' })}
      >
        {Object.keys(WheelSpeedOptions).map((k) => (
          <Radio
            checked={animationDuration === WheelSpeedOptions[k].animationDuration}
            name="wheelSpeed"
            label={WheelSpeedOptions[k].label}
            value={`${WheelSpeedOptions[k].animationDuration}`}
            onChange={(e) => handleAnimationDurationChange(e.target.value)}
            key={`${WheelSpeedOptions[k].animationDuration}`}
          />
        ))}
      </RadioGroup>
      <FlowGrid noGrowY columnCount={atWidth({ default: 4, sm: 6, md: 4 })}>
        {[
          colors.gray100,
          colors.danger40,
          colors.yellow20,
          colors.yellow60,
          colors.transparent.yellow02,
          colors.blue50,
          colors.blue05,
          colors.blue40,
          colors.gray40,
          colors.green30,
          colors.red40,
          colors.yellow40,
        ].map((c) => (
          <div
            key={c}
            tabIndex={0}
            role="button"
            onKeyPress={() => handleColorChange(c)}
            onClick={() => handleColorChange(c)}
            css={colorCellCss}
            style={{ backgroundColor: c }}
          />
        ))}
      </FlowGrid>
    </Grid>
  )
}

export default React.memo(WagonWheelControl)
