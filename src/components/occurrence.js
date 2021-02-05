import withGlobalStateHookWrapper from "../context/withGlobalStateHookWrapper"
import styled from "styled-components"
import { StatusColor } from "../styles/statusColors"
import arrayContains from "../utils/arrayContains"
import formatMoney from '../utils/formatMoney'

const Wrapper = styled.table`
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

const OccurrenceComponent = ({ globalState, cols, occurrences }) => {
  
  const handleOccurrenceClick = (occurrence) => {
    globalState.setActualOccurrence({...occurrence})
    globalState.setModalActive(!globalState.modalActive)
  }

  return(
    <Wrapper>
      <HeadersLine>
        {cols.map(col => <Header>{col}</Header>)}
      </HeadersLine>
      {occurrences.map(occurrence => (
        <Line backgroundColor={StatusColor[occurrence.status]} onClick={e => handleOccurrenceClick(occurrence)}>
          {arrayContains('STATUS', cols) ? <ColumnItem >{occurrence.status}</ColumnItem> : null}
          {arrayContains('CLIENTE', cols) ? <ColumnItem >{occurrence.client.fantasy_name}</ColumnItem> : null}
          {arrayContains('FILIAL', cols) ? <ColumnItem >{occurrence.cte.filial}</ColumnItem> : null}
          {arrayContains('CTE', cols) ? <ColumnItem >{occurrence.cte.codigo}</ColumnItem> : null}
          {arrayContains('MOTORISTA', cols) ? <ColumnItem >{occurrence.name_mot}</ColumnItem> : null}
          {arrayContains('NFO', cols) ? <ColumnItem >{occurrence.nfo.number}</ColumnItem> : null}
          {arrayContains('DATA NFD', cols) ? <ColumnItem >{new Date(occurrence.nfd.emission).toLocaleDateString()}</ColumnItem> : null}
          {arrayContains('NFD', cols) ? <ColumnItem >{occurrence.nfd.number}</ColumnItem> : null}
          {arrayContains('VALOR', cols) ? <ColumnItem >R$ {formatMoney(occurrence.nfd.value, 2, ',', '.')}</ColumnItem> : null}
          {arrayContains('TIPO', cols) ? <ColumnItem >{occurrence.type}</ColumnItem> : null}
          {arrayContains('CHAVE DE ACESSO', cols)  ? <ColumnItem >{occurrence.nfd.key}</ColumnItem> : null}
          {arrayContains('DT/CARGA', cols) ? <ColumnItem >{occurrence.dt_carga}</ColumnItem> : null}
          {arrayContains('OCORRÊNCIA', cols)  ? <ColumnItem >{occurrence.occurrence_num_vr}</ColumnItem> : null}
          {arrayContains('LOCALIZAÇÃO ATUAL', cols) ? <ColumnItem >{occurrence.locale.name}</ColumnItem> : null}
          {arrayContains('OBS', cols)  ? <ColumnItem >{occurrence.obs}</ColumnItem> : null}
          {arrayContains('VENDIDO/DEBITADO', cols) ? <ColumnItem >R$ {formatMoney(occurrence.value_sold, 2, ',', '.')}</ColumnItem> : null}
          {arrayContains('PREJUIZO', cols)  ? <ColumnItem >R$ {formatMoney((occurrence.nfd.value - occurrence.value_sold), 2, ',', '.')}</ColumnItem> : null}
        </Line>
      ))}
    </Wrapper>
  )
}

export default withGlobalStateHookWrapper(OccurrenceComponent)