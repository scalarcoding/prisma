import { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  open: boolean; // Controls whether the modal is open or not
  locked: boolean; // Prevents closing if true
  onClose: () => void; // Function to call when the modal should close
  children: React.ReactNode; // Children to render inside the modal
}

const Modal: React.FC<ModalProps> = ({ open, locked, onClose, children }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  // work out which classes should be applied to the dialog element
  const dialogClasses = useMemo(() => {
    const _arr = [styles["modal"]];
    if (!open) _arr.push(styles["modal--closing"]);
    return _arr.join(" ");
  }, [open]);

  // Eventlistener: trigger onclose when cancel detected
  const onCancel = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (!locked) onClose();
    },
    [locked, onClose]
  );

  // Eventlistener: trigger onclose when click outside
  const onClick = useCallback(
    ({ target }: React.MouseEvent) => {
      const { current: el } = modalRef;
      if (target === el && !locked) onClose();
    },
    [locked, onClose]
  );

  // Eventlistener: trigger close click on anim end
  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (!open) el?.close();
  }, [open]);

  // when open changes run open/close command
  useEffect(() => {
    const { current: el } = modalRef;
    if (open) el?.showModal();
  }, [open]);

  return (
    <dialog
      ref={modalRef}
      className={dialogClasses}
      onClose={onClose}
      onCancel={onCancel}
      onClick={onClick}
      onAnimationEnd={onAnimEnd}
    >
      <div className={styles["modal__container"]}>{children}</div>
    </dialog>
  );
};

export default Modal;
