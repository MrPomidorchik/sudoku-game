const NotesBoard = (props) => {
  const { notes } = props;

  return (
    <div className="grid grid-cols-3">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((note) => (
        <div
          key={note}
          className={
            "w-5 h-5 flex justify-center items-center text-[13px] text-slate-400" +
            notes.includes(note)
              ? ""
              : " opacity-20"
          }
        >
          {note}
        </div>
      ))}
    </div>
  );
};

export default NotesBoard;
