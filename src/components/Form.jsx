import PropTypes from "prop-types";
import { useState } from "react";

function Form({ submit, initVal, closeModal }) {
  const [val, setVal] = useState(initVal);

  function handleSubmit(e) {
    e.preventDefault();
    submit(val);
    closeModal();
    setVal("");
  }

  return (
    <form onSubmit={handleSubmit} method="dialog">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        onChange={(e) => setVal(e.target.value)}
        value={val}
      />
    </form>
  );
}

Form.propTypes = {
  submit: PropTypes.func,
};

export { Form };
