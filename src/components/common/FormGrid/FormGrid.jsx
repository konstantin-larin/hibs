import "./style.scss";

export default function FormGrid({children, className= '', tag = 'div', ...props}) {
    const Tag = tag;
    return (
        <Tag className={'form-gird ' + className} {...props}>
            {children}
        </Tag>
    )
}