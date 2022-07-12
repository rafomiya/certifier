const PronounInput = ({ value, handler, index }) => (
  <select name={index} className='pronoun-input' value={value} onChange={handler}>
    <option value="o">Ele/dele</option>
    <option value="a">Ela/dela</option>
    <option value="neutro">Elu/delu</option>
  </select>
);

export default PronounInput;