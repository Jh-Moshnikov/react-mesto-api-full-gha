function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={`popup popup_image-wide-opacity popup_image-opened ${isOpen ? 'popup_opened' : null}`}>
      <div className="popup__image-container  popup__close-by-overlay">
        <button type="button" className="popup__close popup__close_image-wide" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__image-caption">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;