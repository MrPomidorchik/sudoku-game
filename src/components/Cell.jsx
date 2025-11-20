import Notes from "./Notes.jsx";

function classNames(...args) {
  return args.filter(Boolean).join(" ");
}

const cellBorder = (row, col) => {
  const classes = [];
  if (row % 3 === 0) classes.push("border-t-3 border-t-black");
  if (col % 3 === 0) classes.push("border-l-3 border-l-black");
  if (row === 8) classes.push("border-b-3 border-b-black");
  if (col === 8) classes.push("border-r-3 border-r-black");
  return classes.join(" ");
};

const Cell = (props) => {
  const {
    value,
    isDisabled,
    onClick,
    r,
    c,
    cellNotes,
    showNotes,
    isGiven,
    isSelected,
    isIncorrect,
  } = props;
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={classNames(
        "relative w-[60px] h-[60px] flex justify-center items-center border border-black text-[40px]",
        cellBorder(r, c),
        isGiven ? "" : " text-[#1C7320]",
        isSelected ? "bg-[#9CE7A0]" : "bg-white",
        !isGiven && !isDisabled ? "bg-[#9CE7A0]" : "",
        isGiven || isDisabled ? "cursor-default" : "cursor-pointer"
      )}
    >
      {showNotes ? (
        <Notes notes={cellNotes} />
      ) : value !== 0 ? (
        <div
          className={classNames(
            isGiven ? "" : "",
            isIncorrect ? "text-red-600 bg-[#e77e7e]" : ""
          )}
        >
          {value}
        </div>
      ) : null}
    </button>
  );
};

export default Cell;
