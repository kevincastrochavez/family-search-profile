// This is a magic file. You don't need to do anything special.
// CRA looks for this file before running any tests.
// For more details on how this file is used: https://bit.ly/31umnT1

/* eslint-disable import/no-extraneous-dependencies */
import '@fs/zion-testing-library'

// Use this file to reduce boilerplate when writing tests. Add code that
// needs to be run for all or most of your tests. The most common
// things found in a file like this are afterEach(), beforeEach(),
// afterAll(), beforeAll(), and any specific setup you need for your
// particular application/component.

// Add any global configuration for your tests below...

// Mock matchMedia (used in zion-ui dialog)
// See: https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}))
