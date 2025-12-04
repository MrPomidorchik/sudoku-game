import Button from "../components/Button.jsx";

const ControlBar = (props) => {
  const {
    onNumberClick,
    onUndoClick,
    onEraserClick,
    noteMode,
    onToggleNoteMode,
  } = props;
  return (
    <div className="flex flex-col gap-2.5 justify-center">
      <div className="flex flex-row gap-[5px] justify-between">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <Button key={num} label={num} onClick={() => onNumberClick(num)} />
        ))}
      </div>
      <div className="flex flex-row gap-[5px] w-full">
        <Button label="undo" onClick={onUndoClick} />
        <Button label="eraser" onClick={onEraserClick} />
        <Button label="note" isSwitcher={noteMode} onClick={onToggleNoteMode} />
      </div>
    </div>
  );
};

export default ControlBar;
