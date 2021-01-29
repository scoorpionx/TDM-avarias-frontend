import { useEffect, useState } from "react"
import styled from "styled-components"
import { useGet } from '../pages/api/hooks';
import { getToken } from "./api/auth"
import { useRouter } from 'next/router'
import withGlobalStateHookWrapper from '../context/withGlobalStateHookWrapper'
import Loading from "../components/loading";
import IconButton from '@material-ui/core/IconButton'
import TableChartIcon from '@material-ui/icons/TableChart';
import formatMoney from "../utils/formatMoney";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.secondaryColors.background};
  border-radius: 25px;
  overflow: scroll;
  white-space: nowrap;
  height: 500px;
  width: 97%;
  transform: translate(-50%, -50%);
  align-self: center;
  position: absolute;
  top: 50%;
  left: 50%;
`
const TableWrapper = styled.table`
  color: #000;
  text-align: center;
  margin: 0 1rem;
`
const Header = styled.th`
  padding: 0.5rem;
  position: sticky;
  top: 0rem;
  background: ${props => props.theme.secondaryColors.background};
`
const HeadersLine = styled.tr``
const ColumnItem = styled.td`
  padding: 0.3rem;
  border: 1px solid #c9c3c3;

`
const Line = styled.tr`
  cursor: pointer;
  ${ColumnItem} {
      background-color: ${props => props.backgroundColor};
    }
  &:hover {
    ${ColumnItem} {
      background-color: ${props => props.backgroundColor + 'E6'};
    }
  }
`

const StyledTableChartIcon = styled(TableChartIcon)`
  && {
    font-size: 4rem;
  }
`

const StyledIconButtonTableChart = styled(IconButton)`
  && {
    cursor: pointer;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-inline-end: 1rem;
  margin-top: 1rem;
`

const Table = ({ data }) => {
  const headers = [
    "MÊS",
    "QUANTIDADE DE NOTAS",
    "VALOR TOTAL NFDS",
    "NFD -> SEGURO",
    "VALOR DO PREJUÍZO",
    "SERÁ DEVOLVIDO",
    "VALOR JÁ DEVOLVIDO",
    "EM ESPERA",
    "FALTAS QUE PROCEDEM (FINALIZADAS)",
    "VALOR VENDIDO/DEBITADO",
    "PENDENTE DE VENDA",
    "TOTAL DE NFD QUE ACIONAMOS SEGURO",
    "FRANQUIAS"
  ]

  return (
    <Wrapper>
      <TableWrapper>
        <HeadersLine>
          {headers.map(header => <Header>{header}</Header>)}
        </HeadersLine>
        {
          data.map(item => (
            <Line>
              <ColumnItem>{item.MES}</ColumnItem>
              <ColumnItem>{item.QTD_NF}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.VALOR_TOTAL_NFDS, 2, ',', '.')}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.NFD_SEGURO, 2, ',', '.')}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.VALOR_PREJUIZO, 2, ',', '.')}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.SERA_DEVOLVIDO, 2, ',', '.')}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.VALOR_DEVOLVIDO, 2, ',', '.')}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.EM_ESPERA, 2, ',', '.')}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.FALTAS_QUE_PROCEDEM_FINALIZADAS, 2, ',', '.')}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.VALOR_VENDID_DEBITADO, 2, ',', '.')}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.PENDENTE_DE_VENDA, 2, ',', '.')}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.TOTAL_NFD_QUE_ACIONAMOS_SEGURO, 2, ',', '.')}</ColumnItem>
              <ColumnItem>R$ {formatMoney(item.FRANQUIAS, 2, ',', '.')}</ColumnItem>
            </Line>
          ))
        }
      </TableWrapper>
    </Wrapper>
  )
}

function Report({ globalState }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { data, error } = useGet('report/classic-report', getToken())
  
  const handleTableChartButtonClick = () => {
    router.push('/')
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

  useEffect(() => {
    data ? setIsLoading(false) : setIsLoading(true)
  })

  return (
    !isAuthenticated ? 
      null 
    :
      isLoading ? <Loading /> : 
        data ? (
          <>
          <ButtonsWrapper>
              <StyledIconButtonTableChart>
                <StyledTableChartIcon
                  color='primary'
                  onClick={handleTableChartButtonClick}
                />
              </StyledIconButtonTableChart>
            </ButtonsWrapper>
            <Table data={data}/>
          </>
        ) : null
  )
}

export default withGlobalStateHookWrapper(Report)