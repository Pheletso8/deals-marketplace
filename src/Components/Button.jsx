export default function Button({ title, onClick, className, icon }) {
  return (
    <button
      onClick={onClick}                    
      className={`btn ${className}`}       
    >
      {title}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
}


