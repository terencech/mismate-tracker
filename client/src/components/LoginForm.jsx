import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ApiService from "../adapters/ApiService";

export default function LoginForm() {

  const [ isLoggedIn, setIsLoggedIn ] = useState();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value
    }

    ApiService.post('/users/login', user, {}, res => {
      if (res.data.token) {
        const token = res.data.token
        localStorage.setItem('token', token);
        navigate('/mismates');
      }
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/mismates');
    } else {
      ApiService.get('/isUserAuth', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      }, (res) => {
        setIsLoggedIn(res.data.isLoggedIn);
      });
    }
  }, [isLoggedIn, navigate])

  return (
    <form id="login-form" onSubmit={ e => handleLogin(e) }>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" required />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" required />
      <input id="submit" type="submit" value="Submit"/>
    </form>
  );
}