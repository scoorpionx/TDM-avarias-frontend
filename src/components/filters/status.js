import styled from "styled-components"
import { Select, FormControl, MenuItem, Checkbox, ListItemText, InputLabel, Input } from "@material-ui/core"

const StyledFormControl = styled(FormControl)`
  && {
    max-width: 16%;
    margin-right: 12px;
  }
`

const statusFiltersComponent = ({ globalState }) => {
  const status = [
    'PENDENTE',
    'DEVOLUÇÃO',
    'EM ESPERA',
    'VENDA',
    'FINALIZADO'
  ]

  const handleChange = (e) => {
    const sortedStatus = e.sort((a, b) => {  
      return status.indexOf(a) - status.indexOf(b);
    });

    globalState.setFilters({
      ...globalState.filters,
      status: sortedStatus
    })
  }

  return (
      <StyledFormControl>
        <InputLabel>Status</InputLabel>
        <Select 
          multiple
          value={globalState.filters.status}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          onChange={e => handleChange(e.target.value)}
        >
          {status.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={globalState.filters.status.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
  )
}

export default statusFiltersComponent