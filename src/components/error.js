import styled from "styled-components"

const CodeTranslate = {
  401: 'Não autorizado. Favor refazer login.'
}

const Wrapper = styled.div`
  background: ${props => props.theme.secondaryColors.background};
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 30%;
  margin: auto;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`

const Message = styled.div`
  color: ${props => props.theme.error};
  font-size: 160%;
`

const errorComponent = ({ message }) => {
  return (
    <Wrapper>
      <Message>ERRO {/\d+(?!\.)/.exec(message)[0]}</Message>
      <Message>{CodeTranslate[/\d+(?!\.)/.exec(message)[0]]}</Message>
    </Wrapper>
  )
}

export default errorComponent