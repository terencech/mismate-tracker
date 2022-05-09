import ApiService from "../adapters/ApiService";

export default function MismateForm() {

  function handleSubmit(e) {
    e.preventDefault();

    const mismate = {
      sku: Number(e.target[0].value),
      side: e.target[1].checked ? e.target[1].value : e.target[2].value,
      hasBox: e.target[3].checked
    }

    ApiService.get('/users/isUserAuth', {
      headers: { 'x-access-token': localStorage.getItem('token') }
    }, res => {
      mismate.userId = res.data.userId;
    })

    ApiService.post('/mismates', mismate, {
      headers: { 'x-access-token': localStorage.getItem('token') }
    }, res => {
      console.log(res.data);
    });
  }

  return (
    <form id="mismate-form" onSubmit={ e => handleSubmit(e) }>
      <label htmlFor="scan">Scan</label>
      <input type="text" id="sku" name="sku" />
      <label htmlFor="side">Which side foot?</label>
      <div id="side">
        <label htmlFor="left">Left</label>
        <input type="radio"
               id="left"
               name="side"
               value="left"
               defaultChecked />
        <label htmlFor="right">Right</label>
        <input type="radio"
               id="right"
               name="side"
               value="right" />
      </div>
      <label htmlFor="has-box">Has matching box?</label>
      <input type="checkbox" id="has-box" name="hasBox" />
      <input type="submit" value="Submit" />
    </form>
  );
}