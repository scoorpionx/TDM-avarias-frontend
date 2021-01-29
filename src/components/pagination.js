import withGlobalStateHookWrapper from "../context/withGlobalStateHookWrapper"
import styled from "styled-components"
import { Pagination } from "@material-ui/lab"

const StyledPagination = styled(Pagination)``
const WrapperPagination = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 0.3rem;
  margin-right: 1rem;
`

const paginationComponent = ({ globalState }) => {
  if(!globalState.paginationInfo) {
    return null
  }

  const handlePaginationChange = (event, value) => {
    globalState.setOccurrencesPage(value, globalState.filters)
  }

  return (
    <WrapperPagination>
      <StyledPagination
        count={globalState.paginationInfo.lastPage}
        page={globalState.paginationInfo.page}
        onChange={handlePaginationChange}
        shape={'rounded'}
      />
    </WrapperPagination>
  )
}

export default withGlobalStateHookWrapper(paginationComponent)
