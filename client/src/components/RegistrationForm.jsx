export default function RegistrationForm() {
  return (
    <form method="post" action="/register">
      <input type="text" name="username" />
      <input type="password" name="password" />
    </form>
  )
}