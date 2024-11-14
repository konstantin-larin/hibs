import "./style.scss"

export default function Block({style="default", tag = 'div', children, className='', ...props}) {
    const Tag = tag;
    return (
        <Tag className={`block-${style} ${className}`} {...props}>
            {children}
        </Tag>
    )
}