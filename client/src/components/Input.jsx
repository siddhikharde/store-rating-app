function Input({
  type = "text",
  name,
  placeholder,
  value,
  onChange
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 mb-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#eebbc3]"
    />
  );
}

export default Input;