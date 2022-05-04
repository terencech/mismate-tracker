import React from 'react';
import ApiService from '../adapters/ApiService';

export default function MismatesTable() {

  const [mismates, setMismates] = React.useState(null);

  React.useEffect(() => {
    ApiService.get('/mismates', {
      headers: { 'x-access-token': localStorage.getItem('token') }
    }, res => {
      setMismates(res.data);
    });
  }, []);

  if (!mismates) return(
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
          mismates.map((mismate, index) => {
              return (
                <tr key={index}>
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