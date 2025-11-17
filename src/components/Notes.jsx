const notes = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const NotesBoard = (props) => {
  return (
    <div className="grid grid-cols-3">
      {notes.map((row, rowIndex) => (
        <div key={rowIndex} className="contents">
          {row.map((note, noteIndex) => (
            <div
              key={noteIndex}
              className="w-5 h-5 flex justify-center items-center text-[13px]"
            >
              {note}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NotesBoard;
