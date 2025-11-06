"use client";
import React, { useState } from "react";
import {
  useFormik,
  Form as FormikForm,
  Field as FormikField,
  ErrorMessage,
  Formik,
} from "formik";
import * as Yup from "yup";
import { Button } from "./ui/button";

const Form = () => {
  const [status, setStatus] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    mobile: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .min(10, "Mobile number must be at least 10 digits"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      setStatus(data.message);
    } catch (error) {
      console.log(error);
      setStatus("Error submitting form");
    }
  };

  return (
    <div className="w-full text-center">
      <h1 className="text-2xl font-bold mb-4 uppercase">Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormikForm className="flex flex-col gap-4">
          <FormikField
            type="text"
            name="name"
            placeholder="Name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
          <ErrorMessage name="name" component="div" className="text-red-500" />
          <FormikField
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
          <FormikField
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
          <FormikField
            type="text"
            name="mobile"
            placeholder="Mobile"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage
            name="mobile"
            component="div"
            className="text-red-500"
          />

          <Button type="submit" className="cursor-pointer">
            Submit
          </Button>
        </FormikForm>
      </Formik>
      {status && <p className="text-green-500 mt-4">{status}</p>}
    </div>
  );
};

export default Form;
