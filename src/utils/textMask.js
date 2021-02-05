import MaskedInput from 'react-text-mask';
import masks from "./masks";

export default function TextMask({ inputRef, ...other }) {
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[masks.cnpj]}
      placeholder={''}
    />
  );
}