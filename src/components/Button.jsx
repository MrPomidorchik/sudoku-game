import UndoIcon from "../Icons/UndoIcon.jsx";
import EraserIcon from "../Icons/EraserIcon.jsx";
import PenIcon from "../Icons/PenIcon.jsx";
import { classNames } from "../logic/utils.js";

const Button = (props) => {
  const { onClick, label, isSwitcher } = props;
  return (
    <button
      onClick={onClick}
      className={classNames(
        "min-h-[50px] min-w-[50px] flex-1 flex justify-center items-center rounded-[10px] bg-[#84E188] text-[#208325] button-font shadow-[0_5px_0_rgba(48,197,55,1)] hover:bg-[#9CE7A0] hover:text-[#249429] active:shadow-none active:translate-y-[5px] cursor-pointer",
        isSwitcher ? "text-[#f2f1e5] hover:text-[#f2f1e5]" : ""
      )}
    >
      {label === "undo" ? (
        <UndoIcon />
      ) : label === "eraser" ? (
        <EraserIcon />
      ) : label === "note" ? (
        <PenIcon />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
