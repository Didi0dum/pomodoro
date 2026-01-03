import React from "react";

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, ...rest }) => {
  return <label {...rest}>{children}</label>;
};