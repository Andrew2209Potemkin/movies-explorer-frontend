import React from "react";
import "./InfoTooltip.css";
import imageFailed from "../../images/popup-message-fail.svg";
import imageSuccess from "../../images/popup-message-successfully.svg";

function InfoTooltip({ isOpen, isSuccess, onClose, handleOverlay }) {
  return (
    <div
      className={`popup ${isOpen && 'popup_opened'}`}
      onClick={handleOverlay}
    >
      <div className="popup__content">
        <img
          src={isSuccess ? imageSuccess : imageFailed}
          className="popup__image"
          alt={isSuccess ? "черная галка" : "красный крест"}
        />
        <h2
          className="popup__message">{`${isSuccess
            ? "Добро пожаловать!"
            : "Что-то пошло не так. Попробуйте ещё раз!"}`

          }
        </h2>
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
