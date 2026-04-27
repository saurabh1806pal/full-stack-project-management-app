import { useState, useContext } from "react";
import { AuthContext } from "../context/authCreateContext";

import { useNavigate } from "react-router-dom";

const Login = () => {
const { login } = useContext(AuthContext);
const navigate = useNavigate();

const [form, setForm] = useState({
email: "",
password: "",
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
await login(form);
navigate("/");
} catch (err) {
console.error(err);
alert("Login failed");
}
};

return ( <div> <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
    </div>

    <div>
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
    </div>

    <button type="submit">Login</button>
  </form>
</div>

);
};

export default Login;
