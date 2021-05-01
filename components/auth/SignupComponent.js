import React from "react";
import { useState } from "react";
import { signup } from "../../actions/auth";

const SignupComponent = () => {
  // Get Values In Form
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  //   Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    // send data to DB
    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          error: false,
          name: "",
          email: "",
          password: "",
          error: false,
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  //   Handle Values In Form
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  // Display Response Based on Entered Data
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-primary">{message}</div> : "";

  // Main Form Function
  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            placeholder="Enter Name"
          />
        </div>

        <div className="form-group">
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            className="form-control"
            placeholder="Enter Email"
          />
        </div>

        <div className="form-group">
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            className="form-control"
            placeholder="Enter Password"
          />
        </div>

        <div>
          <button className="btn btn-primary">SignUp</button>
        </div>
      </form>
    );
  };

  return <React.Fragment>
    {showError()}
    {showLoading()}
    {showMessage()}
    {showForm && signupForm()}

    </React.Fragment>;
};

export default SignupComponent;
