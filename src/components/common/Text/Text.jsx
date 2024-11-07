import "./style.scss";

export default function Text({style = 'p', tag='div', className="",  children}) {
    const Tag = tag;
    return (
        <Tag className={`text-${style} ${className}`}>{children}</Tag>
    )
}