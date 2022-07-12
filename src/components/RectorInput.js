import Input from './Input';

const RectorInput = ({ name, handlerName, pronoun, handlerPronoun, removeRector, index, isLastButton }) => {
  const labelText = {
    'o': 'NOME DO REITOR',
    'a': 'NOME DA REITORA',
    'neutro': 'NOME DE REITORE'
  }[pronoun];

  let button;
  if (!isLastButton) {
    button = (
      <button
        name={index}
        className='btn btn-danger rounded-1'
        onClick={removeRector}
        disabled={isLastButton}
      >
        <span className='bi bi-x fs-4'></span>
      </button>
    )
  } else {
    button = null;
  }

  return (
    <div className='rector-input'>
      {button}

      <Input
        labelText={labelText}
        name={name}
        pronoun={pronoun}
        handlerName={handlerName}
        handlerPronoun={handlerPronoun}
        index={index}
      />
    </div>
  )
};

export default RectorInput;