import React from 'react'

import RequireSignedInUser from './RequireSignedInUser'

export default {
  title: 'Require Signed In User',
}
export const RequireSignedInUserStory = () => {
  const SignedInComponent = ({ user }) => <div>Hello {user.displayName}!!</div>
  const NotSignedInComponent = () => <div>You are not signed in</div>

  return <RequireSignedInUser Component={SignedInComponent} fallback={<NotSignedInComponent />} />
}
