import { useState } from 'react';

export default function MismateForm(props) {

  const [ sku, setSku ] = useState('');

  function submitForm(e) {
    props.handleSubmit(e);
    setSku('');
  }

  return (
    <form id="mismate-form" onSubmit={ e => submitForm(e) }>
      <div>
        <label htmlFor="sku">SKU</label>
        <input type="text" id="sku" name="sku" value={ sku } onChange={ e => setSku(e.target.value) } placeholder="Enter SKU"/>
      </div>
      <div id="side">
        <fieldset>
          <legend>Which side?</legend>
          <input type="radio"
                id="left"
                name="side"
                value="left"
                defaultChecked />
          <label htmlFor="left">Left</label>
          <input type="radio"
                id="right"
                name="side"
                value="right" />
          <label htmlFor="right">Right</label>
        </fieldset>
      </div>
      <div>
        <input type="checkbox" id="has-box" name="hasBox" />
        <label htmlFor="has-box">Has matching box?</label>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}