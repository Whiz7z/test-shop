import React from "react";
import { createPortal } from "react-dom";

const ProductAddedModal = ({ children, wrapperId }) => {
  return createPortal(children, document.getElementById(wrapperId));
};

export default ProductAddedModal;
