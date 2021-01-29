import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ClientForm from '../forms/client'
import withGlobalStateHookWrapper from "../../context/withGlobalStateHookWrapper"
import CloseIcon from '@material-ui/icons/Close'
import Occurrence from "../../models/occurrence"
import LocaleForm from "../forms/locale"
import NfForm from "../forms/nf"
import editOccurrence from "../../pages/api/requests/edit/index"
import newOccurrence from "../../pages/api/requests/new/index"
import { api } from "../../pages/api/hooks"

const type = [
  'AVARIA', 
  'FALTA', 
  'VALIDADE PRÓXIMA', 
  'DESACORDO COMERCIAL', 
  'INVERSÃO / SOBRA', 
  'DESACORDO COM O PEDIDO', 
  'SEM PEDIDO'
]

const status = [
  'PENDENTE',
  'DEVOLUÇÃO',
  'EM ESPERA',
  'VENDA',
  'FINALIZADO'
]

const StyledCloseIcon = styled(CloseIcon)`
  && {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    margin: 4px;

  }
`
const Title = styled.span`
  color: #b5b3b3;
  margin: 0.5rem 0 0.5rem 0;
`
const StyledTextField = styled(TextField)`
  && {
    margin: 4px;
    width: auto;
  }
`
const StyledSelect = styled(Select)`
  && {
    margin: 4px;
  }
`
const SendButton = styled(Button)`
  && {
    width: 100%;
    margin-top: 15px;
    background-color: ${props => props.theme.primaryColors.primary}
  }
` 
const StyledInputLabel = styled(InputLabel)`
  && {
    margin-left: 1.2rem;
  }
`
const DivisorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-top: 0.8rem;
`
const Divisor = styled.hr``
const OccurrenceWrapper = styled.div`
  display:flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

const ModalForm = ({ globalState }) => {
  const [occurrence, setOccurrence] = useState(new Occurrence(null))
  
  const handleCloseClick = () => {
    globalState.setActualOccurrence(new Occurrence(null))
    globalState.setModalActive(!globalState.modalActive)
  }

  const handleSendClick = async () => {
    if(!globalState.actualOccurrence) {
      const editAll = editOccurrence(occurrence)
      const response = await api.post('view-index-all',   {
        status: globalState.filters.status,
      }, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
        params: { page: globalState.filters.occurrencesPage }
      });
      globalState.setAll(response.data)
    }
  }

  useEffect(() => {
    setOccurrence(globalState.actualOccurrence)
  }, [globalState.actualOccurrence])

  return (
    <>
      <StyledCloseIcon 
        fontSize='large'
        color='secondary'
        onClick={handleCloseClick}
      />
      <ClientForm
        value={occurrence?.client}
        onChange={e => setOccurrence({ ...occurrence, client: e })}
      />
      <LocaleForm
        value={occurrence?.locale}
        onChange={e => setOccurrence({ ...occurrence, locale: e })}
      />
      <NfForm
        value={occurrence?.nfd}
        onChange={e => setOccurrence({ ...occurrence, nfd: e })}
        type={'DEVOLUÇÃO'}
      />
      <NfForm
        value={occurrence?.nfo}
        onChange={e => setOccurrence({ ...occurrence, nfo: e })}
        type={'ORIGEM'}
      />
      <DivisorWrapper><Divisor /></DivisorWrapper>
      <Title>OCORRÊNCIA</Title>
      <OccurrenceWrapper>
        <FormControl>
          <StyledInputLabel>STATUS</StyledInputLabel>
          <StyledSelect
            label="STATUS"
            variant="outlined"
            value={occurrence?.status}
            onChange={e => setOccurrence({ ...occurrence, status: e.target.value })}
          >
            {status.map((item) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <StyledTextField
          label="FILIAL"
          variant="outlined"
          value={occurrence?.cte.filial}
          onChange={e => setOccurrence({ ...occurrence, cte: { filial: e.target.value }})}
        />
        <StyledTextField
          label="CTE"
          variant="outlined"
          value={occurrence?.cte.codigo}
          onChange={e => setOccurrence({ ...occurrence, cte: { codigo: e.target.value }})}
        />
        <StyledTextField
          label="MOTORISTA"
          variant="outlined"
          value={occurrence?.name_mot}
          onChange={e => setOccurrence({ ...occurrence, name_mot: e.target.value })}
        />
        <FormControl>
          <StyledInputLabel>TIPO</StyledInputLabel>
          <StyledSelect
            label="TIPO"
            variant="outlined"
            value={occurrence?.type}
            onChange={e => setOccurrence({ ...occurrence, type: e.target.value })}
          >
            {type.map((item) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
        <StyledTextField
          label="DT/CARGA"
          variant="outlined"
          value={occurrence?.dt_carga}
          onChange={e => setOccurrence({ ...occurrence, dt_carga: e.target.value })}
        />
        <StyledTextField
          label="OCORRÊNCIA"
          variant="outlined"
          value={occurrence?.occurrence_num_vr}
          onChange={e => setOccurrence({ ...occurrence, occurrence_num_vr: e.target.value })}
        />
        <StyledTextField
          label="OBS"
          variant="outlined"
          value={occurrence?.obs}
          onChange={e => setOccurrence({ ...occurrence, obs: e.target.value })}
        />
        <StyledTextField
          label="VENDIDO/DEBITADO"
          variant="outlined"
          value={occurrence?.value_sold}
          onChange={e => setOccurrence({ ...occurrence, value_sold: e.target.value })}

        />
        <StyledTextField
          label="PREJUIZO"
          variant="outlined"
          value={occurrence?.nfd.value - occurrence?.value_sold}
          onChange={e => setOccurrence({ ...occurrence, loss: occurrence?.nfd.value - occurrence?.value_sold })}
          disabled
        />
      </OccurrenceWrapper>
      <SendButton
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSendClick}
        disableElevation
      >
        Enviar
      </SendButton>
    </>
  )
}

export default withGlobalStateHookWrapper(ModalForm)