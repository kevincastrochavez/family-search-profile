import React from 'react'
import { useUser } from '@fs/zion-user'

const RequireSignedInUser = ({ Component, fallback, ...props }) => {
  const user = useUser()
  return user.signedIn ? <Component user={user} {...props} /> : fallback
}

export default RequireSignedInUser
