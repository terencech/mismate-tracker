import { useState, useEffect } from 'react';
import ApiService from '../adapters/ApiService';
import MismateForm from "../components/MismateForm";
import MismatesTable from "../components/MismatesTable";

export default function Mismates() {

  const [ mismates, setMismates ] = useState();
  const [ getMismatesDone, setGetMismatesDone ] = useState(false);

  useEffect(() => {
    if (!mismates) {
      ApiService.get('/mismates', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      }, res => {
        setMismates(res.data);
        setGetMismatesDone(true);
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
        setGetMismatesDone(false);
      });
    });
  }

  function handleDelete(e) {

    e.preventDefault();
    const selection = [];

    for (let i = 0; i < e.target.length - 1; i++) {
      if (e.target[i].checked) selection.push(e.target[i].value);
    }

    ApiService.delete('/mismates', {
      headers: { 'x-access-token': localStorage.getItem('token') },
      data: selection
    }, res => {
      setMismates(null);
      setGetMismatesDone(false);
    });
  }

  const props = {
    mismates,
    getMismatesDone,
    handleDelete
  }

  return(
    <div>
      <MismateForm handleSubmit={ handleSubmit } />
      <MismatesTable { ...props } />
    </div>
  );
}