//creating a button component which is reusable
function Button({ children, type = "button", className = "", onClick , disabled = false}) {
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
