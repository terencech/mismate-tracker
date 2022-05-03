import React from 'react';
import ApiService from '../adapters/ApiService';

export default function MismatesTable() {

  const [mismates, setMismates] = React.useState(null);

  React.useEffect(() => {
    ApiService.get('/mismates').then(res => setMismates(res.data));
  });

  console.log(mismates);

  if (!mismates) return(
    <p>Loading</p>
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
          mismates.map(mismate => {
              return (
                <tr>
                  <td>{ mismate.sku }</td>
                  <td>{ mismate.side }</td>
                  <td>{ mismate.hasBox }</td>
                </tr>
              )
            })
        }
      </tbody>
    </table>
  );
}