import UndoIcon from "../Icons/UndoIcon.jsx";
import EraserIcon from "../Icons/EraserIcon.jsx";
import PenIcon from "../Icons/PenIcon.jsx";

const Button = (props) => {
  const { onClick, label } = props;
  return (
    <button
      onClick={onClick}
      className="min-h-[50px] min-w-[50px] flex-1 flex justify-center items-center rounded-[10px] bg-[#84E188] text-[#208325] button-font shadow-[0_5px_0_rgba(48,197,55,1)] hover:bg-[#9CE7A0] hover:text-[#249429] active:shadow-none active:translate-y-[5px] cursor-pointer"
    >
      {label === "undo-icon" ? (
        <UndoIcon />
      ) : label === "eraser-icon" ? (
        <EraserIcon />
      ) : label === "note-icon" ? (
        <PenIcon />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
