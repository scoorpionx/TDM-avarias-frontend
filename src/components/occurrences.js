import React from "react"
import styled from "styled-components"
import withGlobalStateHookWrapper from "../context/withGlobalStateHookWrapper"
import Loading from "./loading"
import OccurrenceComponent from './occurrence'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.secondaryColors.background};
  border-radius: 25px;
  overflow: scroll;
  white-space: nowrap;
  height: 500px;
  width: 97%;
  align-self: center;
`

const occurrencesComponent = ({ globalState }) => {
  return (
    <>
      {!globalState.occurrences ? 
          <Loading />
        :
          null
      }
      {globalState.occurrences ?
        <Wrapper> 
          <OccurrenceComponent
            cols={globalState.filters.columns}
            occurrences={globalState.occurrences}
          />
        </Wrapper>
        :
        null
      }
    </>
  )
}

export default withGlobalStateHookWrapper(occurrencesComponent)