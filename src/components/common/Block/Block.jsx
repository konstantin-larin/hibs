import "./style.scss"

export default function Block({style="default", className='', children}) {
    return (
        <div className={`block-${style} ${className}`}>
            {children}
        </div>
    )
}