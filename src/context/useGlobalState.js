import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';
import Occurrence from '../models/occurrence';
import { getToken } from '../pages/api/auth';
import { api, useGetIndexAll } from '../pages/api/hooks';

const FILTERS_KEY = "@TDM-Filters";
const SET_TOKEN = 'SET_TOKEN';
const SET_OCCURRENCES = 'SET_OCCURRENCES';
const SET_OCCURRENCES_PAGE = 'SET_OCCURRENCES_PAGE';
const SET_FILTERS = 'SET_FILTERS';
const SET_PAGINATION_INFO = 'SET_PAGINATION_INFO';
const SET_MODAL_ACTIVE = 'SET_MODAL_ACTIVE';
const SET_ACTUAL_OCCURRENCE = 'SET_ACTUAL_OCCURRENCE';

const AppContext = createContext();

const initialState = {
  token: null,
  occurrences: null,
  paginationInfo: null,
  filters: {
    occurrencesPage: 1,
    columns: [
      'STATUS',	
      'CLIENTE', 
      'FILIAL',	
      'CTE', 
      'MOTORISTA',
      'NFO',
      'DATA NFD', 
      'NFD',
      'VALOR',
      'TIPO',
      'CHAVE DE ACESSO', 
      'DT/CARGA', 
      'OCORRÊNCIA',	
      'LOCALIZAÇÃO ATUAL', 
      'OBS', 
      'VENDIDO/DEBITADO', 
      'PREJUIZO'
    ],
    status: [
      'PENDENTE',
      'DEVOLUÇÃO',
      'EM ESPERA',
      'VENDA',
      'FINALIZADO'
    ],
  },
  actualOccurrence: null,
  modalActive: false
}

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }

    case SET_OCCURRENCES:
      return {
        ...state,
        occurrences: action.payload
      }
      
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload
      }

    case SET_PAGINATION_INFO:
      return {
        ...state,
        paginationInfo: action.payload
      }

    case SET_MODAL_ACTIVE:
      return {
        ...state,
        modalActive: action.payload
      }
    
    case SET_ACTUAL_OCCURRENCE:
      return {
        ...state,
        actualOccurrence: action.payload
      }
  }
}

export function GlobalStateProvider ({ children }) {
  const [cookies, setCookies] = useCookies([FILTERS_KEY])
  const [state, dispatch] = useReducer(globalStateReducer, !cookies[FILTERS_KEY] ? initialState : {
    ...initialState,
    filters: cookies[FILTERS_KEY]
  })
  
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

const useGlobalState = () => {
  const [state, dispatch] = useContext(AppContext)
  const [cookie, setCookie] = useCookies([FILTERS_KEY])
  const { data, error } = useGetIndexAll('view-index-all', getToken(), state.filters.occurrencesPage, state.filters.status)
  
  const setToken = useCallback(
    (token) => {
      dispatch({
        type: SET_TOKEN,
        payload: token,
      })
    },
    [dispatch]
  )

  const setOccurrences = useCallback(
    (occurrences) => {
      dispatch({
        type: SET_OCCURRENCES,
        payload: occurrences,
      })
    },
    [dispatch]
  )

  const setOccurrencesPage = useCallback(
    (occurrencesPage, filters) => {
      dispatch({
        type: SET_FILTERS,
        payload: { ...filters, occurrencesPage },
      })
    },
    [dispatch]
  )
   
  const setFilters = useCallback(
    (filters) => {
      dispatch({
        type: SET_FILTERS,
        payload: filters,
      })
    },
    [dispatch]
  )

  const setPaginationInfo = useCallback(
    (paginationInfo) => {
      dispatch({
        type: SET_PAGINATION_INFO,
        payload: paginationInfo,
      })
    },
    [dispatch]
  )

  const setAll = (data) => {
    const oc = data.data.map(occurrence => new Occurrence(occurrence))
    setPaginationInfo(data.pagination)
    setOccurrences(oc)
  }

  useEffect(() => {
    if(data) {
      setAll(data)
    }
  }, [data])

  useEffect(async () => {
    const { data } = await api.post('view-index-all', {
      status: state.filters.status,
    }, {
      headers: { 'Authorization': `Bearer ${getToken()}` },
      params: { page: state.filters.occurrencesPage }
    });

    setPaginationInfo(data.pagination)

    const oc = data.data.map(occurrence => new Occurrence(occurrence))
    setOccurrences(oc)
  }, [state.filters.occurrencesPage, state.filters.status])

  useEffect(() => {
    setCookie([FILTERS_KEY], state.filters)
  }, [state.filters])

  const setModalActive = useCallback(
    (modalActive) => {
      dispatch({
        type: SET_MODAL_ACTIVE,
        payload: modalActive,
      })
    },
    [dispatch]
  )

  const setActualOccurrence = (actualOccurrence) => {
    dispatch({
      type: SET_ACTUAL_OCCURRENCE,
      payload: actualOccurrence,
    })
  }

  useEffect(() => {
    setCookie(FILTERS_KEY, state)
  }, [state])

  return {
    setToken,
    setOccurrences,
    setFilters,
    setModalActive,
    setActualOccurrence,
    setOccurrencesPage,
    setAll,
    occurrencesPage: state.filters.occurrencesPage,
    token: state.token,
    occurrences: state.occurrences,
    filters: state.filters,
    paginationInfo: state.paginationInfo,
    modalActive: state.modalActive,
    actualOccurrence: state.actualOccurrence
  }
}

export default useGlobalState
