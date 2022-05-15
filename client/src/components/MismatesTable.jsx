import { useState, useEffect } from 'react';

export default function MismatesTable(props) {

  const [ mismates, setMismates ] = useState(props);

  useEffect(() => {;
    setMismates(props);
  }, [props]);

  if (!Object.keys(mismates).length) return(
    <p>Loading...</p>
  );

  return(
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Side</th>
          <th>Has box</th>
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
                </tr>
              )
            })
        }
      </tbody>
    </table>
  );
}