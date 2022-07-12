import { ReactComponent as UpLeft } from './../assets/images/1_4.svg';
import { ReactComponent as DownLeft } from './../assets/images/2_3.svg';
import RectorList from './Rector';
import wreath from './../assets/images/wreath.svg';

const Frame = () => (
	<>
		<UpLeft className='frame up left' alt="frame" />
		<DownLeft className='frame up right' alt="frame" />
		<DownLeft className='frame down left' alt="frame" />
		<UpLeft className='frame down right' alt="frame" />
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
	)
};

export default Preview;