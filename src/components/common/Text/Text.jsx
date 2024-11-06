import "./styles.scss";

export default function Text({style = 'p', tag='p',  children}) {
    const Tag = tag;
    return (
        <Tag className={`text-${style}`}>{children}</Tag>
    )
}