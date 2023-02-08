import { useEffect, useReducer } from 'react'
import axios from '@fs/zion-axios'

// Hook for fetching a users details
export default function usePersonDetails(personId) {
  const reducer = (state, { type, response }) => {
    switch (type) {
      case 'FETCHING':
        return { ...state, status: 'FETCHING' }
      case 'SUCCESS':
        return { ...state, status: 'SUCCESS', details: response.data }
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

    axios
      .get(`/service/tree/tf/person/CURRENT`, {
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
