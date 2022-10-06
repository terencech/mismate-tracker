import { useState, useEffect } from 'react';
import MismatesTableRow from './MismatesTableRow';

export default function MismatesTable(props) {

  const [ mismates, setMismates ] = useState(props.mismates);
  const [ getMismatesDone, setGetMismatesDone ] = useState(props.getMismatesDone);

  useEffect(() => {
    setMismates(props.mismates);
    setGetMismatesDone(props.getMismatesDone);
  }, [props.mismates, props.getMismatesDone]);

  if (!mismates) {
    return(
      <p>Loading...</p>
    );
  } else if (getMismatesDone && !mismates.length) {
    return(
      <p>No mismates found.</p>
    ); 
  }

  return(
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Send to</th>
          <th>SKU</th>
          <th>Side</th>
          <th>Has box</th>
          <th>Tracking</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(mismates).map(key => {
              return (
                <MismatesTableRow
                  mismate={ mismates[key] }
                  key={ key }
                  handleDelete={ props.handleDelete }
                  handleEdit={ props.handleEdit }
                />
              )
            }
          )
        }
      </tbody>
    </table>
  );
}