import React, { Suspense } from 'react'
import { Switch, Route, NotFound } from '@fs/zion-router'
import ErrorBoundary from '@fs/zion-error-boundary'
import HomePageSkeleton from './components/example/HomePageSkeleton'

// Dynamically load components to reduce bundle size
// https://reactjs.org/docs/react-api.html#reactlazy

const HomePage = React.lazy(() => import('./components/example/HomePage'))

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<HomePageSkeleton />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <AuthRoute path="/user" component={UserInfoPage} /> */}

          <Route path="/blank" component={() => 'This page is intentionally left blank'} />

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  )
}
export default App
