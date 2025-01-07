import { TPlaceCard } from "../../utils/types/types";
import PlaceCard from "../place-card/place-card";

import './popup.css';

export interface ICustomPopup {
  offer: TPlaceCard;
  onClose: () => void;
}

const CustomPopup = ({ offer, onClose }: ICustomPopup) => {
  return (
    <div className="popup-overlay">
    <div className="popup">
      <button className="popup-close" onClick={onClose}>
        &times;
      </button>
      <div className="popup-title">🔥 Burning Price of Hotels! 🔥</div>
      <PlaceCard place={offer} type="Main"></PlaceCard>
      <p>Book your stay now with amazing discounts!</p>
    </div>
  </div>
  )
};

export default CustomPopup;