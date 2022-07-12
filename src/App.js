import { useState } from 'react';
import Preview from './components/Preview';
import Form from './components/Form';
import { isEmpty } from './utils';

const App = () => {
  const [state, setState] = useState({
    certified: '',
    pronoun: 'neutro',
    rectors: [{
      name: '',
      pronoun: 'neutro',
    }],
  });

  const certifiedHandlers = {
    name: event => {
      let value = event.target.value.toUpperCase();
      let copy = structuredClone(state);

      if (isEmpty(value)) {
        value = '';
      }

      copy.certified = value;

      setState(copy);
    },
    pronoun: event => {
      let copy = structuredClone(state);
      copy.pronoun = event.target.value;

      setState(copy);
    }
  }

  const rectorHandlers = {
    add: () => {
      let copy = structuredClone(state);

      copy.rectors.push({
        name: '',
        pronoun: 'neutro'
      });

      setState(copy);
    },
    remove: event => {
      let copy = structuredClone(state);
      copy.rectors.splice(event.target.name, 1);

      setState(copy);
    },
    name: event => {
      console.log(event.target.name)
      let value = event.target.value;
      let copy = structuredClone(state);

      if (isEmpty(value)) {
        value = '';
      }

      copy.rectors[event.target.name].name = value;

      setState(copy);
    },
    pronoun: event => {
      let copy = structuredClone(state);

      copy.rectors[event.target.name].pronoun = event.target.value;

      setState(copy);
    }
  }

  const isValid = () => (
    !isEmpty(state.certified) &&
    state.rectors.every(rector => !isEmpty(rector.name))
  );

  return (
    <>
      <Form
        certified={state.certified}
        pronoun={state.pronoun}
        certifiedHandlers={certifiedHandlers}
        rectorHandlers={rectorHandlers}
        rectors={state.rectors}
        isValid={isValid}
      />

      <Preview
        certified={state.certified}
        pronoun={state.pronoun}
        rectors={state.rectors}
      />
    </>
  );
}

export default App;
