import { useMutation } from "@tanstack/react-query";
import { useApi } from "./useApi";
import type { User } from "@/types";

export const useAuth = () => {

    const { post } = useApi()
    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            post<User>("user/login", { email, password })

    });

    const signupMutation = useMutation({
        mutationFn: ({ firstName, lastName, email, password }: { firstName: string, lastName: string, email: string; password: string }) =>
            post<User>("user/register", { firstName, lastName, email, password }),
    });

    return { loginMutation, signupMutation };
};
