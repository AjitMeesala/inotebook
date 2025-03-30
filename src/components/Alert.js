import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    word = word === "danger" ? "Error" : word;
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} position-absolute end-0 alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
      </div>
    )
  );
}

export default Alert;
