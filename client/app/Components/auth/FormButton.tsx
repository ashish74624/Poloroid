import React from "react";

type FormButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const FormButton: React.FC<FormButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className="text-white w-full bg-primaryYellow hover:bg-yellow-500 focus:outline-none focus:ring-yellow-500 focus:ring-2 active:bg-white active:text-primaryYellow font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            {...props}
        >
            {children}
        </button>
    );
};

export default FormButton;
