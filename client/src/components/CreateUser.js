import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoggedNav from './LoggedNav';
import Footer from './Footer';


function CreateUser(){
  const initialValues = {
    username: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: values.username, email: values.email }),
    })
    .then((r) => {
      setIsLoading(false);
      if (r.ok) {
        return r.json();
      } else {
        return r.json().then((err) => {
          throw new Error(err.errors);
        });
      }
    })
    .then((user) => {
      setSubmitting(false);
      console.log(user);
    })
    .catch((error) => {
      setSubmitting(false);
      setErrors(error.message || 'An error occurred');
    });
  };

  return (
    <div>
      <LoggedNav />
      <div className="container mt-5">
        <h2>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <Field type="text" id="username" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" id="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading ? 'Submitting...' : 'Sign Up'}
              </button>

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
};

export default CreateUser;
