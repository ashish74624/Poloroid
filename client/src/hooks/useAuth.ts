import { useMutation } from "@tanstack/react-query";
import { loginApi, signupApi } from "../api/authApi";
import { useAuthContext } from "@/context/useAuthContext";

export const useAuth = () => {
    const { setEmail } = useAuthContext();

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            loginApi(email, password),
        onSuccess: (data) => {
            setEmail(data.email);
            // localStorage.setItem("token", data.token);
        },

    });

    const signupMutation = useMutation({
        mutationFn: ({ firstName, lastName, email, password }: { firstName: string, lastName: string, email: string; password: string }) =>
            signupApi(firstName, lastName, email, password),
        onSuccess: (data) => {
            setEmail(data.email);
            // localStorage.setItem("token", data.token);
        },
    });

    return { loginMutation, signupMutation };
};
