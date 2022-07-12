import signature1 from './../assets/images/signature1.svg';
import signature2 from './../assets/images/signature2.svg';
import signature3 from './../assets/images/signature3.svg';

const signatures = [signature1, signature2, signature3];

const Rector = ({ name, pronoun, index }) => {
  const title = {
    'o': 'Reitor',
    'a': 'Reitora',
    'neutro': 'Reitore',
  }[pronoun];

  return (
    <div className='d-flex flex-column justify-content-center align-content-start'>
      <img src={signatures[index]} alt="signature" className='signature' />
      <hr className='signature-line' />
      <span className='rector'>{name || 'Nome'}</span>
      <span className='rector-title'>{title}</span>
    </div>
  )
};

const RectorList = ({ rectors }) => (
  <div className='d-flex flex-row justify-content-around w-50'>
    {rectors.map((rector, index) =>
      <Rector
        key={index}
        name={rector.name}
        pronoun={rector.pronoun}
        index={index}
      />
    )}
  </div>
);

export default RectorList;