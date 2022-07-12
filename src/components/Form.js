import DownloadButtons from './../components/DownloadButtons';
import Input from './../components/Input';
import RectorInput from './../components/RectorInput';

const Form = ({ certified, pronoun, certifiedHandlers, rectors, rectorHandlers, isValid }) => (
  <div className='col-12 col-md-4 bg-dark flex-stuff'>
    <a className='github-link p-3 fs-2' rel="noreferrer" target='_blank' href="https://www.github.com/rafomiya/certifier">
      <span className='bi bi-github'></span>
    </a>

    <div className='col-11 col-md-8 flex-stuff mb-3'>
      <legend className='text text-white'>Certificando</legend>
      <Input
        labelText={'NOME NO CERTIFICADO'}
        name={certified}
        pronoun={pronoun}
        handlerName={certifiedHandlers.name}
        handlerPronoun={certifiedHandlers.pronoun}
      />

      <legend className='text text-white'>Reitores</legend>
      {rectors.map((rector, index) =>
        <RectorInput
          key={index}
          name={rector.name}
          handlerName={rectorHandlers.name}
          pronoun={rector.pronoun}
          handlerPronoun={rectorHandlers.pronoun}
          removeRector={rectorHandlers.remove}
          index={index}
          isLastButton={rectors.length === 1}
        />
      )}

      <button className='btn btn-outline-warning rounded-1 w-100' onClick={rectorHandlers.add} disabled={rectors.length === 3}>
        <span className='bi bi-person-plus-fill fs-4'></span>
      </button>
    </div>
    <DownloadButtons isValid={isValid()} />
  </div>
);

export default Form;