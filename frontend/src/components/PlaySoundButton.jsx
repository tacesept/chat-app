import React from "react";
import notificationSound from "../assets/sounds/notification.mp3";

const PlaySoundButton = () => {
  const playSound = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch((err) => console.log("Error playing sound:", err));
  };

  return (
    <button
      onClick={playSound}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Play Notification
    </button>
  );
};

export default PlaySoundButton;
