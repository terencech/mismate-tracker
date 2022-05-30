import { useState } from 'react';

export default function MismatesTableRow(props) {
  const { _id, sku, side, hasBox } = props.mismate;
  const [ isEdit, setEdit ] = useState(false);

  function handleEdit() {
    isEdit ? setEdit(false) : setEdit(true);
  }

  if (!isEdit) {
    return (
      <tr>
        <td>
          <form id="table-form" onSubmit={ e => props.handleDelete(e) } >
            <input type="hidden" name="id" value={ _id } />
          </form>
        </td>
        <td>{ sku }</td>
        <td>{ side }</td>
        <td>{ hasBox ? "\u2713" : "\u2717" }</td>
        <td>
          <input form="table-form" type="submit" value="Delete" />
          <button onClick={ e => handleEdit(e) }>Edit</button>
        </td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>
          <form id="edit-form" />
          <input type="hidden" name="id" value={ _id } />
        </td>
        <td><input form="edit-form" type="text" name="sku" defaultValue={ sku } /></td>
        <td>
          <input form="edit-form" type="radio" name="side" value="left" />
          <input form="edit-form" type="radio" name="side" value="right" />
        </td>
        <td><input form="edit-form" type="checkbox" name="hasBox" /></td>
        <td>
          <input form="edit-form" type="submit" value="Save" />
          <button onClick={ e => handleEdit(e) }>Cancel</button>
        </td>
      </tr>
    )
  }
}