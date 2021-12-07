import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

export type ModalProps = {
  isShowing: boolean;
  onHide: (...args: any) => any;
  children: React.ReactNode;
};

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  const handleOnPressEsc = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      toggle();
    }
  };

  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    document.addEventListener("keydown", handleOnPressEsc);

    return () => {
      document.removeEventListener("keydown", handleOnPressEsc);
    };
  }, [isShowing]);

  return {
    isShowing,
    toggle,
  };
};

export const Modal = ({ isShowing, onHide, children }: ModalProps) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className={styles.overlay} onClick={onHide} />
          <div
            className={styles.root}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className={styles.modal}>{children}</div>
          </div>
        </>,
        document.body
      )
    : null;

Modal.useModal = useModal;
export default Modal;
