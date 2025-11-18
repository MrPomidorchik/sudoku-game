import Button from "./Button.jsx";

const ControlBar = (props) => {
  return (
    <div className="flex flex-col gap-2.5 justify-center">
      <div className="flex flex-row gap-[5px] justify-between">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
          <Button key={num} label={num} onClick={() => {}} />
        ))}
      </div>
      <div className="flex flex-row gap-[5px] w-full">
        <Button label="Undo" onClick={() => {}} />
        <Button label="Eraser" onClick={() => {}} />
        <Button label="Notes" onClick={() => {}} />
      </div>
    </div>
  );
};

export default ControlBar;
