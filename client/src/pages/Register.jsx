import { useContext, useState } from "react";
import { AuthContext } from "../context/authCreateContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
const { register } = useContext(AuthContext);
const navigate = useNavigate();

const [form, setForm] = useState({
name: "",
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
await register(form);
navigate("/");
} catch (err) {
console.error(err);
alert("Registration failed");
}
};

return ( <div> <h2>Register</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
    </div>

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

    <button type="submit">Register</button>
  </form>
</div>


);
};

export default Register;
