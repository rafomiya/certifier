import { useState } from 'react';
import Preview from './components/Preview';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { isEmpty } from './utils';

const DownloadButtons = ({ isValid }) => (
  <div className='w-100'>
    <button
      className='btn btn-danger col-6 rounded-0'
      onClick={() => {
        html2canvas(document.querySelector('#preview')).then(canvas => {
          const pdf = new jsPDF('landscape', 'px', [canvas.width, canvas.height]);

          const image = canvas.toDataURL('image/png');

          pdf.addImage(image, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save('certificado.pdf');
        });
      }}
      disabled={!isValid}
    >
      <span className='bi bi-filetype-pdf me-2 display-3'></span>
    </button>

    <button
      className='btn btn-danger col-6 rounded-0'
      onClick={() => {
        html2canvas(document.querySelector('#preview')).then(canvas => {
          const image = canvas.toDataURL('image/png');

          const link = document.createElement('a');
          link.href = image;
          link.download = 'certificado.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      }}
      disabled={!isValid}
    >
      <span className='bi bi-filetype-png me-2 display-3'></span>
    </button>
  </div>
);

const InputProunon = ({ value, handler, index }) => (
  <select name={index} className='pronoun-input' value={value} onChange={handler}>
    <option value="o">Ele/dele</option>
    <option value="a">Ela/dela</option>
    <option value="neutro">Elu/delu</option>
  </select>
);

const Input = ({ labelText, name, pronoun, handlerName, handlerPronoun, index }) => {
  return (
    <div className='filter'>
      <input name={index} value={name} onChange={handlerName} required />
      <label>{labelText}</label>
      <div className='separator'></div>
      <InputProunon value={pronoun} handler={handlerPronoun} index={index} />
    </div>
  )
};


const InputRector = ({ name, handlerName, pronoun, handlerPronoun, removeRector, index, isLastButton }) => {
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

const App = () => {

  const [state, setState] = useState({
    certified: '',
    pronoun: 'neutro',
    rectors: [{
      name: '',
      pronoun: 'neutro',
    }],
  });

  const handleNameChange = event => {
    let value = event.target.value.toUpperCase();
    let copy = structuredClone(state);

    if (isEmpty(value)) {
      value = '';
    }

    copy.certified = value;

    setState(copy);
  };

  const handlePronounChange = event => {
    let copy = structuredClone(state);
    copy.pronoun = event.target.value;

    setState(copy);
  };

  const addRector = () => {
    let copy = structuredClone(state);

    copy.rectors.push({
      name: '',
      pronoun: 'neutro'
    });

    setState(copy);
  };

  const handleRectorNameChange = event => {
    console.log(event.target.name)
    let value = event.target.value;
    let copy = structuredClone(state);

    if (isEmpty(value)) {
      value = '';
    }

    copy.rectors[event.target.name].name = value;

    setState(copy);
  };

  const handleRectorPronounChange = event => {
    let copy = structuredClone(state);

    copy.rectors[event.target.name].pronoun = event.target.value;

    setState(copy);
  };

  const removeRector = event => {
    let copy = structuredClone(state);
    copy.rectors.splice(event.target.name, 1);

    setState(copy);
  };

  const isValid = () => {
    return (
      !isEmpty(state.certified) &&
      state.rectors.every(rector => !isEmpty(rector.name))
    )
  };

  return (
    <>
      <div className='col-12 col-md-4 d-flex flex-column justify-content-between align-items-center bg-dark m-0 p-0'>
        <a className='github-link p-3 fs-2' rel="noreferrer" target='_blank' href="https://www.github.com/rafomiya/certifier">
          <span className='bi bi-github'></span>
        </a>
        <div className='d-flex col-11 col-md-8 flex-column justify-content-center align-items-center'>
          <legend className='text text-white'>Certificando</legend>

          <Input
            labelText={'NOME NO CERTIFICADO'}
            name={state.certified}
            pronoun={state.pronoun}
            handlerName={handleNameChange}
            handlerPronoun={handlePronounChange}
          />

          <legend className='text text-white'>Reitores</legend>
          {state.rectors.map((rector, index) =>
            <InputRector
              key={index}
              name={rector.name}
              handlerName={handleRectorNameChange}
              pronoun={rector.pronoun}
              handlerPronoun={handleRectorPronounChange}
              removeRector={removeRector}
              index={index}
              isLastButton={state.rectors.length === 1}
            />
          )}

          <button className='btn btn-outline-warning rounded-1 w-100' onClick={addRector} disabled={state.rectors.length === 3}>
            <span className='bi bi-person-plus-fill fs-4'></span>
          </button>
        </div>
        <DownloadButtons isValid={isValid()} />
      </div>

      <div className='col-12 col-md-8 d-flex justify-content-center align-content-center'>
        <div className='col-12 col-md-9 my-auto'>
          <div id="preview-container">
            <Preview certified={state.certified} pronoun={state.pronoun} rectors={state.rectors} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
