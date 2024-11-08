import "./style.scss";

export default function ExercisesIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={'icon'}
            viewBox="0 0 16 16"
        >
            <rect width="7" height="10" fill="#fff" rx="1"></rect>
            <rect width="7" height="5" y="11" fill="#fff" rx="1"></rect>
            <rect
                width="7"
                height="10"
                x="16"
                y="16"
                fill="#fff"
                rx="1"
                transform="rotate(-180 16 16)"
            ></rect>
            <rect
                width="7"
                height="5"
                x="16"
                y="5"
                fill="#fff"
                rx="1"
                transform="rotate(-180 16 5)"
            ></rect>
        </svg>
    )
}