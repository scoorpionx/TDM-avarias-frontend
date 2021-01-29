import { useEffect, useState } from "react"
import styled from "styled-components"
import { getToken } from "./api/auth"
import { useRouter } from 'next/router'
import Filters from "../components/filters/index"
import Occurrences from "../components/occurrences"
import Modal from "../components/modal/index"
import withGlobalStateHookWrapper from '../context/withGlobalStateHookWrapper'
import background from '../../public/white-background-2.jpg'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import AssessmentIcon from '@material-ui/icons/Assessment';
import IconButton from '@material-ui/core/IconButton'
import Pagination from "../components/pagination"
import Occurrence from "../models/occurrence"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.modalActive ? `
    -webkit-filter: blur(4px);
    -moz-filter: blur(4px);
    -o-filter: blur(4px);
    -ms-filter: blur(4px);
    filter: blur(4px); 
  `:``}
`

const Image = styled.img`
  display: none; 
  ${props => props.modalActive ? `
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
  `:``}
`

const StyledAssessmentIcon = styled(AssessmentIcon)`
  && {
    font-size: 4rem;
  }
`

const StyledIconButtonAdd = styled(IconButton)`
  && {
    cursor: pointer;
  }
`

const StyledIconButtonAssessment = styled(IconButton)`
  && {
    cursor: pointer;
  }
`

const StyledAddCircleSharpIcon = styled(AddCircleSharpIcon)`
  && {
    font-size: 4rem;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-inline-end: 1rem;
`

function Home({ globalState }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const handleBlurredClick = () => {
    globalState.setActualOccurrence(new Occurrence(null))
    globalState.setModalActive(!globalState.modalActive)
  }

  const handleNewOccurrenceClick = () => {
    globalState.setActualOccurrence(new Occurrence(null))
    globalState.setModalActive(!globalState.modalActive)
  }

  const handleAssessmentButtonClick = async () => {
    router.push('/report')
  }
  
  useEffect(() => {
    const token = getToken()
    if(token) {
      setIsAuthenticated(true)
      globalState.setToken(token)
    }

    if(!token) {
      router.push('login')
    }
  }, [])

  return (
    !isAuthenticated ? 
      null 
    :
    <>
      <Wrapper modalActive={globalState.modalActive}>
        <Image
          src={background} 
          alt='BlurredView' 
          modalActive={globalState.modalActive} 
          onClick={handleBlurredClick} 
        />
        <Filters />
        <ButtonsWrapper>
          <StyledIconButtonAdd>
            <StyledAddCircleSharpIcon
              color='primary'
              onClick={handleNewOccurrenceClick}
            />
          </StyledIconButtonAdd>
            <StyledIconButtonAssessment>
              <StyledAssessmentIcon
                color='primary'
                onClick={handleAssessmentButtonClick}
              />
            </StyledIconButtonAssessment>
        </ButtonsWrapper>
        <Occurrences />
        <Pagination />
      </Wrapper>
    <Modal />
    </>
  )
}

export default withGlobalStateHookWrapper(Home)