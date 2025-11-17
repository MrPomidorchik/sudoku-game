import Notes from "./Notes.jsx";

const Cell = (props) => {
  const { value, onChange } = props;
  return (
    <div
      className="w-[60px] h-[60px] flex justify-center items-center border border-black text-[40px] bg-white"
      onChange={onChange}
    >
      {value !== 0 ? value : <Notes />}
    </div>
  );
};

export default Cell;
