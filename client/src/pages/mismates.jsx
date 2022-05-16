import { useState, useEffect } from 'react';
import ApiService from '../adapters/ApiService';
import MismateForm from "../components/MismateForm";
import MismatesTable from "../components/MismatesTable";

export default function Mismates() {

  const [ mismates, setMismates ] = useState();

  useEffect(() => {
    if (!mismates) {
      ApiService.get('/mismates', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      }, res => {
        setMismates(res.data);
      });
    }
  }, [mismates]);

  function handleSubmit(e) {

    e.preventDefault();

    const mismate = {
      sku: Number(e.target[0].value),
      side: e.target[1].checked ? e.target[1].value : e.target[2].value,
      hasBox: e.target[3].checked
    }

    ApiService.get('/isUserAuth', {
      headers: { 'x-access-token': localStorage.getItem('token') }
    }, res => {
      mismate.userId = res.data.userId;

      ApiService.post('/mismates', mismate, {
        headers: { 'x-access-token': localStorage.getItem('token') }
      }, res => {
        setMismates(null);
      });
    });
  }

  return(
    <div>
      <MismateForm handleSubmit={ handleSubmit } />
      <MismatesTable { ...mismates } />
    </div>
  );
}