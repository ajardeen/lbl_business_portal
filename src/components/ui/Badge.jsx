
function Badge({ text = "Badge",badgeClassName = "" }) {
  return (
    <span className={`inline-flex items-center cursor-auto gap-x-1.5 py-0.5 px-2 rounded-full text-[10px] font-medium border border-gray-500 text-gray-500 ${badgeClassName}`}>
      {text}
    </span>
  );
}

export default Badge;
