
export default function Die({isHeld, value, handler}) {
    return (
        <div onClick={handler} className={`die-face ${isHeld && "isHeld"} `}>
            <h2 className="die-num">{value}</h2>
        </div>
    )
}