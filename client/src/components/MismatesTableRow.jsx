import { useState } from 'react';

export default function MismatesTableRow(props) {
  const { _id, userName, sku, side, hasBox, matchId, matchUser, tracking } = props.mismate;
  const [ isEdit, setEdit ] = useState(false);

  function toggleEdit() {
    isEdit ? setEdit(false) : setEdit(true);
  }

  function getReceivingUser() {
    if (matchId) {
      if (hasBox) return userName;
      else return matchUser;
    } else return "";
  }

  if (!isEdit) {
    return (
      <tr className="mismate-row">
        <td className="row-form">
          <form id={ "delete-" + _id } onSubmit={ e => props.handleDelete(e) } >
            <input type="hidden" name="id" value={ _id } />
          </form>
        </td>
        <td>{ getReceivingUser() }</td>
        <td className="sku-col">{ sku }</td>
        <td className="side-col">{ side }</td>
        <td className="hasBox-col">{ hasBox ? "\u2713" : "\u2717" }</td>
        <td className="tracking-col">{ tracking }</td>
        <td className="row-buttons">
          <input form={ "delete-" + _id } type="submit" value="Delete" />
          { !tracking && <button onClick={ e => toggleEdit(e) }>Edit</button> }
        </td>
      </tr>
    )
  } else {
    return (
      <tr className="mismate-row">
        <td className="row-form">
          <form id={ "edit-" + _id } onSubmit={ e => props.handleEdit(e) }/>
          <input form={ "edit-" + _id } type="hidden" name="id" value={ _id } />
        </td>
        <td>{ getReceivingUser() }</td>
        <td className="edit-sku"><input form={ "edit-" + _id } type="text" name="sku" defaultValue={ sku } /></td>
        <td className="edit-side">
          <input form={ "edit-" + _id } type="radio" name="side" value="left" defaultChecked={ side === 'left' } />
          <input form={ "edit-" + _id } type="radio" name="side" value="right" defaultChecked={ side === 'right' } />
        </td>
        <td><input form={ "edit-" + _id } type="checkbox" name="hasBox" defaultChecked={ hasBox }/></td>
        <td className="row-buttons">
          <input form={ "edit-" + _id } type="submit" value="Save" />
          <button onClick={ e => toggleEdit(e) }>Cancel</button>
        </td>
      </tr>
    )
  }
}