function Badge({
  text = "Badge",
  variant = "default", // default, success, warning, danger, info
  badgeClassName = "",
}) {
  const variants = {
    default:
      "border-gray-500 text-gray-500",
    success:
      "border-green-500 text-green-600 bg-green-50",
    warning:
      "border-yellow-500 text-yellow-600 bg-yellow-50",
    danger:
      "border-red-500 text-red-600 bg-red-50",
    info:
      "border-blue-500 text-blue-600 bg-blue-50",
  };

  return (
    <span
      className={`inline-flex items-center cursor-auto gap-x-1.5 py-0.5 px-2 rounded-full text-[10px]  font-medium border ${variants[variant]} ${badgeClassName}`}
    >
      {text}
    </span>
  );
}

export default Badge;
