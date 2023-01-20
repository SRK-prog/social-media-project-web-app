import React, { useEffect, useRef } from "react";

function ClickOutside({ isOpen = true, onClickOutside, children, ...rest }) {
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        onClickOutside(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [onClickOutside, isOpen]);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}

export default ClickOutside;
