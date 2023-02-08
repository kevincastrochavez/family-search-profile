import { useEffect, useReducer } from 'react'
import axios from '@fs/zion-axios'

// Hook for fetching a users portrait
export default function usePersonPortrait(personId) {
  const reducer = (state, { type, response }) => {
    switch (type) {
      case 'FETCHING':
        return { ...state, status: 'FETCHING' }
      case 'SUCCESS':
        return {
          ...state,
          status: 'SUCCESS',
          // eslint-disable-next-line no-underscore-dangle
          portraitUrl: response.data._links.thumbSquare.href,
        }
      case 'ERROR':
        return { ...state, status: 'ERROR', response }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, { status: null, response: null })

  useEffect(() => {
    const source = axios.CancelToken.source()
    let unmounted = false

    if (!personId) return () => {}
    dispatch({ type: 'FETCHING' })
    axios
      .get(`/service/memories/tps/persons/${personId}/portrait`, {
        cancelToken: source.token,
      })
      .then((response) => {
        if (!unmounted) dispatch({ type: 'SUCCESS', response })
      })
      .catch((response) => {
        if (!unmounted) dispatch({ type: 'ERROR', response })
      })
    return () => {
      unmounted = true
      source.cancel()
    }
  }, [personId])

  return [state]
}
