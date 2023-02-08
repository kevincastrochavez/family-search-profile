/* eslint global-require: 0 */
import React, { Suspense } from 'react'
import { configure, addParameters, addDecorator } from '@storybook/react'
import '@storybook/addon-console'
import { withA11y } from '@storybook/addon-a11y'
import { darkMode, lightMode } from './theme'
import { I18nProvider, i18n, addTranslations } from '@fs/zion-locale'
import { Providers, Theme } from '@fs/zion-ui'
import StoryRouter from '@fs/storybook-react-router'

const ThemeWrapper = (Story) => {
  return (
    <Theme theme="day">
      <Story />
    </Theme>
  )
}

import translations from '../src/locales'

addTranslations(translations)

addDecorator(withA11y)
addDecorator((StoryFn) => (
  <Suspense fallback={<div>Storybook Wrapper Loading...</div>}>
    <I18nProvider i18nInstance={i18n}>
      <Providers>
        <StoryFn />
      </Providers>
    </I18nProvider>
  </Suspense>
))
addDecorator(ThemeWrapper)
addDecorator(StoryRouter())

addParameters({
  options: {
    showPanel: true,
    theme: window.localStorage.getItem('themeId') === 'nightfall' ? darkMode : lightMode,
  },
})
