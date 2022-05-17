import { useState, useEffect } from 'react';

export default function MismatesTable(props) {

  const [ mismates, setMismates ] = useState(props.mismates);
  const [ getMismatesDone, setGetMismatesDone ] = useState(props.getMismatesDone);

  useEffect(() => {;
    setMismates(props.mismates);
    setGetMismatesDone(props.getMismatesDone);
  }, [props.mismates, props.getMismatesDone]);

  if (!mismates && !getMismatesDone) {
    return(
      <p>Loading...</p>
    );
  } else if (!mismates && getMismatesDone) {
    return(
      <p>No mismates found.</p>
    );
  }

  return(
    <form id="mismates-table" onSubmit={ e => props.handleDelete(e) }>
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Side</th>
            <th>Has box</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {
              Object.keys(mismates).map(key => {
                return (
                  <tr key={ key }>
                    <td>{ mismates[key].sku }</td>
                    <td>{ mismates[key].side }</td>
                    <td>{ mismates[key].hasBox ? '\u2713' : '\u274C' }</td>
                    <td>
                      <input type="checkbox" value={ mismates[key]._id } />
                    </td>
                  </tr>
                )
              })
          }
        </tbody>
      </table>
      <input type="submit" value="Delete" />
    </form>
  );
}