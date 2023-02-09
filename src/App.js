import React, { Suspense } from 'react'
import { Switch, Route } from '@fs/zion-router'
import ErrorBoundary from '@fs/zion-error-boundary'
import { css } from '@emotion/core'

import { LayoutBand } from '@fs/zion-ui'
import HomePageSkeleton from './components/example/HomePageSkeleton'

const HomePage = React.lazy(() => import('./components/example/HomePage'))

const About = React.lazy(() => import('./components/About'))
const Hobbies = React.lazy(() => import('./components/Hobbies'))
const Projects = React.lazy(() => import('./components/Projects'))

const containerCss = css`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 44px 1fr 44px;
`

const innerContainerCss = css`
  grid-column: 2;
`

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<HomePageSkeleton />}>
        <HomePage />
        <Switch>
          <LayoutBand>
            <div css={containerCss}>
              <div css={innerContainerCss}>
                <Route exact path="/" component={About} />
                <Route exact path="/hobbies" component={Hobbies} />
                <Route exact path="/projects" component={Projects} />

                {/* <AuthRoute path="/user" component={UserInfoPage} /> */}
              </div>
            </div>
          </LayoutBand>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  )
}
export default App
