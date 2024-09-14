import { useEffect, useState } from "react";
import "../styles/pages/Register.scss";
import { useNavigate } from "react-router-dom";
import addImage from "../assets/addImage.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }
      // try console.log
      // profileImage: frame 6.png

      const response = await fetch("http://localhost:8003/api/register", {
        method: "POST",
        body: register_form,
      });

      //await axios.post("http://localhost:8003/api/register", formData) // In case it was without file upload

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log("registration failed", err);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Password are not matched!</p>  //ternary operator&&  if password not match display p
          )}

          {/* Business Logic */}
          <input
            type="file"
            id="image"
            onChange={handleChange}
            name="profileImage"
            accept="image/*"
          />

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login Here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
