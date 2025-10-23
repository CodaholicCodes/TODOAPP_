import React from 'react';

const Button = ({ btnType = 'primary', btnText, handler }) => {
  if (btnType === 'success') {
    return (
      <button
        className="px-4 py-2 rounded border bg-green-600 hover:bg-green-700 text-white border-green-700"
        onClick={handler}
      >
        {btnText}
      </button>
    );
  } else if (btnType === 'danger') {
    return (
      <button
        className="px-4 py-2 rounded border bg-red-600 hover:bg-red-700 text-white border-red-700"
        onClick={handler}
      >
        {btnText}
      </button>
    );
  } else {
    return (
      <button
        className="px-4 py-2 rounded border bg-gray-600 hover:bg-gray-700 text-white border-gray-700"
        onClick={handler}
      >
        {btnText}
      </button>
    );
  }
};

export default Button;
