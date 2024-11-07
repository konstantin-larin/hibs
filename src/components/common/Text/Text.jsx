import "./style.scss";

export default function Text({style = 'p', tag='p', className="",  children}) {
    const Tag = tag;
    return (
        <Tag className={`text-${style} ${className}`}>{children}</Tag>
    )
}