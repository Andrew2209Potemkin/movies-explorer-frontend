import React from "react";
import imageFailed from "../../images/popup-message-fail.svg";
import imageSuccess from "../../images/popup-message-successfully.svg";

function InfoTooltipProfile({ isOpen, isUpdate, onClose, handleOverlay }) {
  return (
    <div
      className={`popup ${isOpen && 'popup_opened'}`}
      onClick={handleOverlay}
    >
      <div className="popup__content">
        <img
          src={isUpdate ? imageSuccess : imageFailed}
          className="popup__image"
          alt={isUpdate ? "черная галка" : "красный крест"}
        />
        <h2
          className="popup__message">{`${isUpdate
            ? "Данные изменены!"
            : "Что-то пошло не так. Попробуйте ещё раз!"}`
          }
        </h2>
        <button className="popup__close-btn" type="button" aria-label="Закрыть" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltipProfile;
