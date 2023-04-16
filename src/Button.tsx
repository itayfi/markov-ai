import { Component, JSX } from "solid-js";

type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement>;

const Button: Component<ButtonProps> = (props) => {
    return (
        <button {...props} class={`bg-green-500 text-white px-4 py-2 rounded-md ${props.class}`}>
            {props.children}
        </button>
    );
}

export default Button;
