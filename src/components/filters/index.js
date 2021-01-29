import styled from "styled-components"
import ColumnFiltersComponent from "./columns"
import withGlobalStateHookWrapper from '../../context/withGlobalStateHookWrapper'
import StatusFiltersComponent from "./status"

const Container = styled.div`
  display: flex;
  margin: 25px 25px 0 25px;
  padding: 25px;
  background-color: ${props => props.theme.secondaryColors.background};
  border-radius: 20px;
  color: #000;
`

const filtersComponent = ({ globalState }) => {
  return (
    <Container >
      <ColumnFiltersComponent globalState={globalState}/>
      <StatusFiltersComponent globalState={globalState}/>
    </Container>
  )
}

export default withGlobalStateHookWrapper(filtersComponent)