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
      className="border border-black rounded p-2"
      ref={modal}
      onCancel={() => handleModal(0)}
    >
      <div className="flex justify-end mb-2">
        <Button
          className="font-bold bg-inherit text-black out"
          onClick={() => handleModal(0)}
        >
          X
        </Button>
      </div>
      {children}
    </dialog>
  );
}

export { Modal };
