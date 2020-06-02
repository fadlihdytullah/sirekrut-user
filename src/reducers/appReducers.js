export const initState = {
  loading: false,
  error: null,
  dataTimelines: [],
}

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_TIMELINES_INIT': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'FETCH_TIMELINES_SUCCESS': {
      return {
        ...state,
        dataTimelines: action.payload.dataTimelines,
        loading: false,
        error: null,
      }
    }

    case 'FETCH_TIMELINES_FAILURE': {
      console.log('❌ error:=', action.payload.error)

      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    }

    default: {
      return state
    }
  }
}

export type AppState = State
export type DispatchAction = (action: Action) => void

export default appReducer
