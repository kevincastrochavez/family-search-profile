import React from 'react'
import { HeaderBlock, LayoutBand, Tab, Tabs } from '@fs/zion-ui'

// import { Link } from '@fs/zion-router'
import { css } from '@emotion/core'
// import zionDebug from '@fs/zion-debug'
// import { NoticeLoading } from '@fs/zion-icon'

import ProfileImg from './profile.jpeg'
import BackgroundImg from './background.jpeg'

const headerGridCss = css`
  display: grid;
  grid-template-rows: 210px 60px 90px;
  grid-template-columns: 32px 150px auto 1fr;
  column-gap: 12px;
  margin: 32px 0 60px;
`

const backgroundImgCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-row: 1/3;
  grid-column: 1/-1;
  border-radius: 8px 8px 0 0;
`

const profileImgCss = css`
  width: 100%;
  border-radius: 50%;
  grid-row: 2/4;
  grid-column: 2/3;
`

const headerBlockCss = css`
  grid-row: 3/4;
  grid-column: 3/4;
`

const HomePage = () => {
  return (
    <LayoutBand>
      <header css={headerGridCss}>
        <img src={BackgroundImg} alt="Laptop in desk" css={backgroundImgCss} />
        <img src={ProfileImg} alt="Kevin Castro" css={profileImgCss} />

        <div css={headerBlockCss}>
          <HeaderBlock size="md" heading="Kevin Castro" subHeading="Web Developer" />
        </div>
      </header>

      <Tabs centered>
        <Tab title="About" to="/" />
        <Tab title="Hobbies" to="/hobbies" />
        <Tab title="Projects" to="/projects" />
      </Tabs>
    </LayoutBand>
  )
}

export default HomePage
