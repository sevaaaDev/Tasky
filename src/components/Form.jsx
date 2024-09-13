import PropTypes from "prop-types";
import { useState } from "react";

function Form({ submit }) {
  const [val, setVal] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    submit(val);
    setVal("");
  }

  return (
    <form onSubmit={handleSubmit}>
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
