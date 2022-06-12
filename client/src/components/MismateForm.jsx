import { useState } from 'react';

export default function MismateForm(props) {

  const [ sku, setSku ] = useState('');

  function submitForm(e) {
    props.handleSubmit(e);
    setSku('');
  }

  return (
    <form id="mismate-form" onSubmit={ e => submitForm(e) }>
      <label htmlFor="scan">Scan</label>
      <input type="text" id="sku" name="sku" value={ sku } onChange={ e => setSku(e.target.value) } />
      <label htmlFor="side">Which side foot?</label>
      <div id="side">
        <label htmlFor="left">Left</label>
        <input type="radio"
               id="left"
               name="side"
               value="left"
               defaultChecked />
        <label htmlFor="right">Right</label>
        <input type="radio"
               id="right"
               name="side"
               value="right" />
      </div>
      <label htmlFor="has-box">Has matching box?</label>
      <input type="checkbox" id="has-box" name="hasBox" />
      <input type="submit" value="Submit" />
    </form>
  );
}