import { useEffect, useRef } from "react";

function Modal({ children, openModal, handleModal }) {
  const modal = useRef(null);

  useEffect(() => {
    modal.current?.close();
    if (openModal) {
      modal.current?.showModal();
    }
  }, [openModal]);

  return (
    <dialog ref={modal} onCancel={() => handleModal(0)}>
      {children}
      <button onClick={() => handleModal(0)}>Close</button>
    </dialog>
  );
}

export { Modal };
