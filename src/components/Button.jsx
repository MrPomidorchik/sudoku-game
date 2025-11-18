const Button = (props) => {
  const { onClick, label } = props;
  return (
    <button
      onClick={onClick}
      className="min-h-[50px] min-w-[50px] flex-1 rounded-[10px] bg-[#84E188] text-[#208325] button-font shadow-[0_5px_0_rgba(48,197,55,1)] hover:bg-[#9CE7A0] hover:text-[#249429] active:shadow-none active:translate-y-[5px] transition-all duration-75 cursor-pointer"
    >
      {label}
    </button>
  );
};

export default Button;
