import upLeft from './../assets/images/1_4.svg';
import downLeft from './../assets/images/2_3.svg';
import RectorList from './Rector';
import wreath from './../assets/images/wreath.svg';

const Frame = () => (
	<>
		<img src={upLeft} className='frame up left' alt="frame" />
		<img src={downLeft} className='frame up right' alt="frame" />
		<img src={downLeft} className='frame down left' alt="frame" />
		<img src={upLeft} className='frame down right' alt="frame" />
	</>
);

const Preview = ({ pronoun, certified, rectors }) => {
	const messages = {
		'o': {
			title: 'GOSTOSO CERTIFICADO',
			honor: 'por ser um grande gostoso'
		},
		'a': {
			title: 'GOSTOSA CERTIFICADA',
			honor: 'por ser uma grande gostosa'
		},
		'neutro': {
			title: 'GOSTOSE CERTIFICADE',
			honor: 'por ser ume grande gostose'
		}
	}[pronoun];

	rectors = rectors.slice(0, 3); // limits the amount of rectors to 3

	return (
		<div className='col-12 col-md-8 d-flex justify-content-center align-content-center'>
			<div className='col-12 col-md-9 my-auto'>
				<div id="preview-container">
					<div id="preview">
						<Frame />
						<img className='wreath' src={wreath} alt="wreath" />
						<span className='university'>UNIVERSIDADE FEDERAL DAS GOSTOSAS</span>
						<span className='normal-text'>concede a</span>
						<span className='certified-name'>{certified || 'NOME'}</span>
						<span className='normal-text'>o título ofical de</span>
						<span className='title'>{messages.title}</span>
						<span className='normal-text'>{messages.honor}</span>
						<RectorList rectors={rectors} />
					</div>
				</div>
			</div>
		</div>

	)
};

export default Preview;