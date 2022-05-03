

import ApiService from "../adapters/ApiService";

export default function LoginForm() {
  function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value
    }

    ApiService.post('/users/login', user, res => {
      const token = res.data.token.split(" ")[1];
      localStorage.setItem('token', token);
    })
  }

  return (
    <form id="login-form" onSubmit={ e => handleLogin(e) }>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" required />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" required />
      <input type="submit" value="Submit"/>
    </form>
  );
}