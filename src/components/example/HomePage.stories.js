import React from 'react'

import HomePageComponent from './HomePage'
import LearnReactCardComponent from './LearnReactCard'
import ZionDesignCardComponent from './ZionDesignCard'
import WagonWheelComponent from './WagonWheel'
import PurposeStatementGeneratorComponent from './PurposeStatementGenerator'

export default {
  title: 'Home Page',
}

export const HomePage = () => <HomePageComponent />

export const LearnReactCard = () => <LearnReactCardComponent />

export const ZionDesignCard = () => <ZionDesignCardComponent />

export const PurposeStatementGenerator = () => <PurposeStatementGeneratorComponent />

export const WagonWheel = (args) => <WagonWheelComponent {...args} />

WagonWheel.args = {
  animationDuration: '30s',
  color: '#000',
}
