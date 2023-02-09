import React, { Suspense } from 'react'
import { Switch, Route, NotFound } from '@fs/zion-router'
import ErrorBoundary from '@fs/zion-error-boundary'

import HomePageSkeleton from './components/example/HomePageSkeleton'

// Dynamically load components to reduce bundle size
// https://reactjs.org/docs/react-api.html#reactlazy

const HomePage = React.lazy(() => import('./components/example/HomePage'))

const About = React.lazy(() => import('./components/About'))
const Hobbies = React.lazy(() => import('./components/Hobbies'))
const Projects = React.lazy(() => import('./components/Projects'))

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<HomePageSkeleton />}>
        <HomePage />
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/hobbies" component={Hobbies} />
          <Route exact path="/projects" component={Projects} />

          {/* <AuthRoute path="/user" component={UserInfoPage} /> */}

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  )
}
export default App
