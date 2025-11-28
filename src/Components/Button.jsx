

export default function Button({title, onClick, className, icon}) {
  return (
    <button className={`btn ${className} onClick={onClick}`}>
        {title}
        {icon}
    </button>
  )
}
