import { memo } from "react";
import s from "./GameButton.module.css";

interface GameButtonProps {
  image: string;
  text: string;
  onClick: () => void;
}

export const GameButton = memo(({ image, text, onClick }: GameButtonProps) => {
  return (
    <button className={s.gameButton} onClick={onClick}>
      <img className={s.gameButtonImage} src={image} alt={text} />
      <p className={s.gameButtonText}>{text}</p>
    </button>
  );
});
