import "./style.scss";

export default function CrossIcon(){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className={'icon cross'}
        >
            <path
                fillRule="evenodd"
                d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
                clipRule="evenodd"
            ></path>
        </svg>
    );
}