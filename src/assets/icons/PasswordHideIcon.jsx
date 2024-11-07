import "./style.scss";

export default function PasswordHideIcon({className}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={'icon ' + className}
            viewBox="0 0 16 14"
        >
            <path
                d="M8.42.334c3.687 0 6.673 3 6.673 6.667s-2.986 6.666-6.673 6.666c-2.34 0-4.387-1.213-5.58-3.046l1.053-.834a5.32 5.32 0 0 0 4.534 2.547 5.333 5.333 0 1 0 0-10.667c-2.72 0-4.96 2.04-5.287 4.667h1.84L2.487 8.821 0 6.334h1.793a6.664 6.664 0 0 1 6.627-6m1.973 5.493a.615.615 0 0 1 .607.614v3.073a.616.616 0 0 1-.613.613H6.7a.616.616 0 0 1-.613-.613V6.441c0-.34.273-.607.606-.614v-.673a1.85 1.85 0 0 1 3.7 0zM8.54 4.241c-.5 0-.913.406-.913.913v.673H9.46v-.673a.916.916 0 0 0-.92-.913"
            ></path>
        </svg>
    )
}