import PronounInput from './PronounInput';

const Input = ({ labelText, name, pronoun, handlerName, handlerPronoun, index }) => (
  <div className='filter'>
    <input
      name={index}
      value={name}
      onChange={handlerName}
      required
    />
    <label>{labelText}</label>

    <div className='separator'></div>

    <PronounInput
      value={pronoun}
      handler={handlerPronoun}
      index={index}
    />
  </div>
);

export default Input;