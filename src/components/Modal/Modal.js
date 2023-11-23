import React, { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setIsOpen, selectedData }) => {
  const handleCloseOnScroll = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleCloseOnScroll);
    return () => {
      window.removeEventListener("scroll", handleCloseOnScroll);
    };
  }, []);

  return (
    <>
      <div className={"darkBG"} onClick={() => setIsOpen(false)} />
      <div className={"centered"}>
        <div className={"modal"}>
          <div className={"modalHeader"}>
            <h5 className={"heading"}>{selectedData?.title}</h5>
          </div>
          <div className={"modalContent"}>{selectedData?.body}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
