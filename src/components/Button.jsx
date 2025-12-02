import './Button.css'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  ...props 
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button


