// Zachary, do unto this as thou hast done undo ZionDesignCard
// zion-ui v9 Card has moved to @fs/zion-memory-card. You should update to use the new Card in zion-ui v10 in the near future
import React from 'react'
import { MenuNewWindow } from '@fs/zion-icon'
import { Button, Row, Card, HeaderBlock, Image, Bleed } from '@fs/zion-ui'
import ReactImage from './reactjs.jpg'

const LearnReactCard = () => (
  <Card>
    <Bleed all>
      <Image src={ReactImage} alt="React" height="calc(var(--cell-width, 750px) / 2.5)" />
    </Bleed>
    <HeaderBlock heading="Learn React" size="md" />
    <Row>
      <Button Icon={MenuNewWindow} href="https://reactjs.org/docs/getting-started.html">
        React Docs
      </Button>
      <Button
        Icon={MenuNewWindow}
        href="https://github.com/fs-webdev/skill-building-program/tree/master/badges-active/react"
      >
        Earn your Badge
      </Button>
    </Row>
  </Card>
)

// Use React.memo() to keep our component from re-rendering if the props haven't changed
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(LearnReactCard)
