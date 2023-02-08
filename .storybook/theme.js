import { create } from '@storybook/theming'
import packageJson from '../package.json'

const defaultOptions = {
  brandTitle: packageJson.name,
  brandImage: null,
}

export const lightMode = create({
  base: 'light',
  ...defaultOptions,
})

export const darkMode = create({
  base: 'dark',
  ...defaultOptions,
})

export default lightMode
