import withGlobalStateHookWrapper from '../../context/withGlobalStateHookWrapper'
import ModalForm from './modalForm'
import styled from 'styled-components'

const Wrapper = styled.form`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background-color: ${props => props.theme.secondaryColors.background}; /* Fallback color */
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 85%;
  padding: 20px;
  padding-right: 40px;

  @media(min-width: 1777px) {
    top: 50%;
  }

  ${props => !props.active ? `
    display:none;
  `:``}
`

const Modal = ({ globalState }) => {
  return (
    <Wrapper active={globalState.modalActive}>
      <ModalForm />
    </Wrapper>
  )
}

export default withGlobalStateHookWrapper(Modal)