import "./style.scss";

export default function PartItem({part}) {
    return (

        <div>{part.constructor.name}</div>
    )
}