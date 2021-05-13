// import Router from "next/dist/next-server/lib/router/router";
import React from "react";
import { useState , useEffect} from "react";
import { signIn,authenticate, isAuth } from "../../actions/auth";
import Router from 'next/router'

const SignInComponent = () => {
  // Get Values In Form
  const [values, setValues] = useState({
    email: "",
    password: " ",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  // useEffect(()=>{
  //    isAuth() && Router.push('/')
  // },[])

  //   Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });
    const user = {email, password };

    // send data to DB
    signIn(user).then((data) => {
      if (data.err) {
        setValues({ ...values, error: data.err });
      } else {

        authenticate(data, () => {
         if(isAuth() && isAuth().role == 1){
          Router.push(`/admin`);
         }else {
          Router.push(`/user`);
         }
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
  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
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
          <button className="btn btn-primary">signin</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </React.Fragment>
  );
};

export default SignInComponent;
