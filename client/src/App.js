import { useState } from "react";
import axios from 'axios'

function App() {
  const [formValues, setFormValues] = useState({})
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    setMessage('')
    try {
      await axios.post('http://localhost:5000/register', formValues).then(res => {
        const data = res.data
        setMessage(data.message)
        setFormValues({})
      })
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <div id="container">
      <div className="form-container">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        {message !== '' && <p>{message}</p>}
        <button onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}

export default App;
