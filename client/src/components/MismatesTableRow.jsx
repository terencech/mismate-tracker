import { useState } from 'react';

export default function MismatesTableRow(props) {
  const { _id, sku, side, hasBox, matchId, tracking } = props.mismate;
  const [ isEdit, setEdit ] = useState(false);

  function toggleEdit() {
    isEdit ? setEdit(false) : setEdit(true);
  }

  if (!isEdit) {
    return (
      <tr>
        <td>
          <form id={ "delete-" + _id } onSubmit={ e => props.handleDelete(e) } >
            <input type="hidden" name="id" value={ _id } />
          </form>
        </td>
        <td>{ sku }</td>
        <td>{ side }</td>
        <td>{ hasBox ? "\u2713" : "\u2717" }</td>
        <td>{ tracking }</td>
        <td>
          <input form={ "delete-" + _id } type="submit" value="Delete" />
          { !tracking && <button onClick={ e => toggleEdit(e) }>Edit</button> }
        </td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>
          <form id={ "edit-" + _id } onSubmit={ e => props.handleEdit(e) }/>
          <input form={ "edit-" + _id } type="hidden" name="id" value={ _id } />
        </td>
        <td><input form={ "edit-" + _id } type="text" name="sku" defaultValue={ sku } /></td>
        <td>
          <input form={ "edit-" + _id } type="radio" name="side" value="left" defaultChecked={ side === 'left' } />
          <input form={ "edit-" + _id } type="radio" name="side" value="right" defaultChecked={ side === 'right' } />
        </td>
        <td><input form={ "edit-" + _id } type="checkbox" name="hasBox" defaultChecked={ hasBox }/></td>
        <td>{
          hasBox && matchId ? tracking : 
          <input form={ "edit-" + _id } type="text" name="tracking" defaultValue={ tracking }/>
        }</td>
        <td>
          <input form={ "edit-" + _id } type="submit" value="Save" />
          <button onClick={ e => toggleEdit(e) }>Cancel</button>
        </td>
      </tr>
    )
  }
}