import React from 'react'
import { MenuNewWindow } from '@fs/zion-icon'
import { Button, Card, Row, HeaderBlock, Bleed, Image } from '@fs/zion-ui'
import ZionImage from './zion.jpg'

const ZionDesignCard = () => {
  return (
    <Card>
      <Bleed all>
        <Image src={ZionImage} alt="React" height="calc(var(--cell-width, 750px) / 2.5)" />
      </Bleed>
      <HeaderBlock heading="Zion Design System" size="md" />
      <Row>
        <Button Icon={MenuNewWindow} to="https://beta.familysearch.org/frontier/zion">
          Zion Components
        </Button>
        <Button Icon={MenuNewWindow} to="https://github.com/fs-webdev/zion">
          Github
        </Button>
      </Row>
    </Card>
  )
}

// Use React.memo() to keep our component from re-rendering if the props havent changed
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(ZionDesignCard)
