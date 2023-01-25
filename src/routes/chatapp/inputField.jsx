import React, { useState } from "react";
import { Send } from "@material-ui/icons";

const InputField = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 mb-3 flex gap-3 h-14">
      <input
        className="h-full flex-grow outline-1 outline outline-gray-100 rounded-2xl px-5"
        placeholder="Message..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      ></input>
      <button
        type="submit"
        className="h-full w-20 text-white bg-blue-30 rounded-3xl grid place-content-center"
        onClick={handleSubmit}
      >
        <Send />
      </button>
    </form>
  );
};

export default InputField;
