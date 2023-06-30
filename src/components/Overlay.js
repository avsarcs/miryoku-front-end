import { Fragment, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function Overlay({ isOpen, onClose, children, customClass }) {

  const [overlayStyle, setOverlayStyle] = useState({})

  return (
    <Fragment>
      {isOpen && (
        <div className={customClass ? ("overlay-" + customClass) : "overlay"}>
          <div className={customClass ? ("overlay-background-" + customClass) : "overlay-background"} onClick={onClose} />
          <div className={customClass ? ("overlay-container-" + customClass) : "overlay-container"}>
            <div className={customClass ? ("overlay-controls-" + customClass) : "overlay-controls"}>
              <button
                className={customClass ? ("overlay-close-" + customClass) : "overlay-close"}
                type="button"
                onClick={onClose}
              ><i className="fa fa-window-close" ariaHidden="true"></i>
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Overlay;