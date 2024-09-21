import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoggedNav from './LoggedNav';
import Footer from './Footer';

function CreateUser() {
  const initialValues = {
    first_name: '',
    second_name: '',
    email: '',
    password: '',
  };
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    second_name: Yup.string().required('Second name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);
    fetch("/signup", { // Update endpoint to match back end
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), // Send all fields
    })
    .then((r) => {
      setIsLoading(false);
      if (r.ok) {
        return r.json();
        navigate("/")

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
                <label htmlFor="first_name" className="form-label">First Name</label>
                <Field type="text" id="first_name" name="first_name" className="form-control" />
                <ErrorMessage name="first_name" component="div" className="error" />
              </div>

              <div className="mb-3">
                <label htmlFor="second_name" className="form-label">Second Name</label>
                <Field type="text" id="second_name" name="second_name" className="form-control" />
                <ErrorMessage name="second_name" component="div" className="error" />
              </div>

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

              <button type="submit" className="btn btn-margin mb-2 logout-btn" disabled={isSubmitting || isLoading}>
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
}

export default CreateUser;
