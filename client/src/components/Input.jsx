function Input({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  className = ""
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`inputStyle ${className}`}
    />
  );
}
export default Input;