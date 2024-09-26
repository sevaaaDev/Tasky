import { useEffect, useRef } from "react";
import { Button } from "./Button";

function Modal({ children, openModal, handleModal }) {
  const modal = useRef(null);

  useEffect(() => {
    modal.current?.close();
    if (openModal) {
      modal.current?.showModal();
    }
  }, [openModal]);

  return (
    <dialog
      className="border border-black rounded p-4"
      ref={modal}
      onCancel={() => handleModal(0)}
    >
      {children}
      <Button className="mt-4" onClick={() => handleModal(0)}>
        Close
      </Button>
    </dialog>
  );
}

export { Modal };
