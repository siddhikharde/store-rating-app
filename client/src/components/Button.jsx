function Button({
  children,
  type = "submit",
  variant = "primary",
  onClick,
  className = ""
}) {
  const styles = {
    primary: "bg-[#eebbc3] text-[#232946] hover:bg-[#f5cbd2]",
    secondary: "bg-[#b8c1ec] text-[#232946] hover:bg-[#aab4e5]",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-[#232946] text-[#232946] hover:bg-[#232946] hover:text-white"
  };

  return (
    <button
      type={type}
      onClick={onClick}
     className={` h-12 px-6 rounded-lg font-bold transition cursor-pointer
  ${styles[variant]} ${className}
`}
    >
      {children}
    </button>
  );
}

export default Button;