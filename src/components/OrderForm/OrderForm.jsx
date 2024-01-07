import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { clearCart } from "../../redux/cartSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{11}$/, "Invalid phone number. Must be 11 digits")
    .required("Phone number is required"),
});

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart: cartItems } = useSelector((state) => state.cart);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Order Data:", { customer: values, products: cartItems });
    dispatch(clearCart());

    try {
      console.log(`${process.env.REACT_APP_SERVICE_ID}`);
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        {
          to_email: values.email,
          subject: "Order Confirmation",
          message: "Thank you for placing an order!",
          name: values.name,
        },
        process.env.REACT_APP_USER_PUBLIC_KEY
      );
    } catch (error) {
      console.error("Error sending email:", error);
    }
    navigate("/success");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order Form</h2>
      <Formik
        initialValues={{ name: "", email: "", phone: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="px-4 py-2 border border-gray-300 rounded w-full focus:outline-none"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="px-4 py-2 border border-gray-300 rounded w-full focus:outline-none"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone:
            </label>
            <Field
              type="tel"
              id="phone"
              name="phone"
              className="px-4 py-2 border border-gray-300 rounded w-full focus:outline-none"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </Form>
      </Formik>
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Products in Cart:</h3>
        <ul>
          {cartItems.map((item) => (
            <div className="border-b py-2">
              <Link
                to={`/product/${item.productId}`}
                key={item.productId}
                className="mb-2 text-gray-700 font-bold text-[14px] block hover:underline hover:text-blue-600"
              >
                {item.title}
              </Link>
              <span>Quantity: {item.quantity}</span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default OrderForm;
