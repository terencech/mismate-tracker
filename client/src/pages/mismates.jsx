import { useState, useEffect } from 'react';
import ApiService from '../adapters/ApiService';
import MismateForm from "../components/MismateForm";
import MismatesTable from "../components/MismatesTable";
import NavBar from "../components/NavBar";

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
      side: e.target[2].checked ? e.target[2].value : e.target[3].value,
      hasBox: e.target[4].checked
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

    const id = e.target[0].value;

    ApiService.delete('/mismates', {
      headers: { 'x-access-token': localStorage.getItem('token') },
      data: { id }
    }, res => {
      setMismates(null);
      setGetMismatesDone(false);
    })
  }

  function handleEdit(e) {
    e.preventDefault();

    const data = {
      id: e.target[0].value,
      sku: e.target[1].value,
      side: e.target[2].checked ? e.target[2].value : e.target[3].value,
      hasBox: e.target[4].checked
    }

    if (!data.hasBox) data.tracking = e.target[5].value;

    ApiService.put('/mismates', data, {
      headers: { 'x-access-token': localStorage.getItem('token') }
    }, res => {
      setMismates(null);
      setGetMismatesDone(false);
    });
  }

  const props = {
    mismates,
    getMismatesDone,
    handleDelete,
    handleEdit
  }

  return(
    <div>
      <NavBar />
      <MismateForm handleSubmit={ handleSubmit } />
      <MismatesTable { ...props } />
    </div>
  );
}