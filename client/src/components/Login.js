import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoggedNav from './LoggedNav';
import Footer from './Footer';
import '../styles/login.css'; 
import LoginNavB from './LoginNavB';

function Login() {
  const initialValues = {
    email: '',
    password: '',
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    .then((r) => {
      setIsLoading(false);
      if (r.ok) {
        return r.json().then((data) => {
          localStorage.setItem("token", data.access_token);
          navigate("/logged");
        });
      } else {
        return r.json().then((err) => {
          throw new Error(err.message);
        });
      }
    })
    .then((response) => {
      setSubmitting(false);
      console.log(response);
    })
    .catch((error) => {
      setSubmitting(false);
      setErrors(error.message || 'An error occurred');
    });
  };

  return (
    <div className="login-container ">
      <LoginNavB />

      <div className="container mt-2">
      <h2 className='mt-2 mb-2'>Welcome to Pawfect Match</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" id="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" id="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
            
              <div className="text-center">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting || isLoading}>
                  {isSubmitting || isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>

              {errors && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errors}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
