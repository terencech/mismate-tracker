import { useState, useEffect } from 'react';
import ApiService from '../adapters/ApiService';
import MismateForm from "../components/MismateForm";
import MismatesTable from "../components/MismatesTable";

export default function Mismates() {

  const [ mismates, setMismates ] = useState();

  useEffect(() => {
    ApiService.get('/mismates', {
      headers: { 'x-access-token': localStorage.getItem('token') }
    }, res => {
      setMismates(res.data);
    });
  }, []);

  return(
    <div>
      <MismateForm { ...mismates } />
      <MismatesTable { ...mismates } />
    </div>
  );
}