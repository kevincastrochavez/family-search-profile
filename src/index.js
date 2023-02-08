import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import '@fs/react-scripts/polyfills'
import * as Sentry from '@sentry/browser'
import { FeatureFlagsProvider } from '@fs/zion-flags'
import { addTranslations } from '@fs/zion-locale'
import Root from '@fs/zion-root'
import { AppLayout } from '@fs/zion-ui'
import { Router } from '@fs/zion-router'
import { appPath, sentryDSN, mergeSentryConfig } from '@fs/zion-config'

import { NoticeLoading } from '@fs/zion-icon'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import translations from './locales'

// Enable local feature flag development using the file "dev.flags.js"
// If that file exports anything truthy it will initialize feature flags in localhost mode
// and use the flags defined in that file, instead of flags defined in split.
const mockFlags = process.env.NODE_ENV === 'development' ? import('./dev.flags').then((m) => m.default) : undefined

// initialize Sentry for the app
if (sentryDSN) {
  // pass Sentry overrides to mergeSentryConfig
  Sentry.init(
    mergeSentryConfig({
      dsn: sentryDSN,
    })
  )
}

// For details about loading translations: https://www.familysearch.org/frontier/docs/develop/i18n
addTranslations(translations)

// This is where you pass data from the server to the client using the SERVER_DATA global.
// Here we pass the mounted app path from the server to the client.
const base = appPath ? new URL(appPath).pathname : ''

const FrontierRoot = () => (
  <React.StrictMode>
    <Suspense fallback={<NoticeLoading />}>
      <FeatureFlagsProvider mockFlags={mockFlags}>
        <Router basename={base}>
          <Root analytics>
            <AppLayout fullWidth>
              <App />
            </AppLayout>
          </Root>
        </Router>
      </FeatureFlagsProvider>
    </Suspense>
  </React.StrictMode>
)

ReactDOM.render(<FrontierRoot />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()
