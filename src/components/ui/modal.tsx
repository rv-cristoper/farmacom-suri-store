import { usePreferencesStore } from "../../store/preferences";
import isEmpty from "is-empty";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Modal() {
  const [mounted, setMounted] = useState(false);
  const setModalData = usePreferencesStore((state) => state.setModalData);
  const modalData = usePreferencesStore((state) => state.modalData);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (isEmpty(modalData.children)) {
      document.body.style.overflow = "auto";
      return;
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  }, [modalData]);

  const handleClose = () => {
    setModalData({ children: null });
    document.body.style.overflow = "auto";
  };
  if (!mounted || isEmpty(modalData.children)) return <></>;

  return ReactDOM.createPortal(
    <div
      style={{ zIndex: "100" }}
      className="w-screen h-screen backdrop-blur-sm backdrop-brightness-50 absolute top-0 left-0 right-0 bottom-0 grid place-content-center p-12"
    >
      <div
        className={`bg-white mx-auto rounded-2xl border border-border animate-in fade-in duration-300 py-4 px-8 relative overflow-auto ${modalData.containerClassName || ""
          }`}
      >
        {modalData.noCloseButton ? null : <div
          onClick={handleClose}
          className="w-10 h-10 cursor-pointer grid place-content-center absolute top-[4px] right-[4px] rounded-2xl bg-border-input bg-opacity-30"
        >
          <X color="black" />
        </div>}
        {modalData.children}
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
}

export default Modal;
