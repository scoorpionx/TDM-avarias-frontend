import styled from "styled-components"
import { Select, FormControl, MenuItem, Checkbox, ListItemText, InputLabel, Input } from "@material-ui/core"

const StyledFormControl = styled(FormControl)`
  && {
    max-width: 16%;
    margin-right: 12px;
  }
` 

const columnFiltersComponent = ({ globalState }) => {
  const columns = [
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
  ]

  const handleChange = (e) => {
    const sortedColumns = e.sort((a, b) => {  
      return columns.indexOf(a) - columns.indexOf(b);
    });

    globalState.setFilters({
      ...globalState.filters,
      columns: sortedColumns
    })
  }

  return (
    <StyledFormControl>
      <InputLabel>Colunas</InputLabel>
      <Select 
        multiple
        value={globalState.filters.columns}
        input={<Input />}
        renderValue={(selected) => selected.join(', ')}
        onChange={e => handleChange(e.target.value)}
      >
        {columns.map((column) => (
          <MenuItem key={column} value={column}>
            <Checkbox checked={globalState.filters.columns.indexOf(column) > -1} />
            <ListItemText primary={column} />
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  )
}

export default columnFiltersComponent