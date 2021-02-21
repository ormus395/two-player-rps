import React, { useState } from "react";

const Form = (props) => {
  const [values, setValues] = useState({});
  const children = props.children.map((child) =>
    React.cloneElement(child, {
      handleChange: setValues,
      value: values[child.props.name],
    })
  );
  return <form onSubmit={(e) => props.handleSubmit(e)}>{children}</form>;
};

export default Form;
