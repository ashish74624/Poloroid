import { BASE_URL } from "@/constant";

export interface AuthResponse {
    email: string;
    token: string;
}

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Login failed: ${errorText}`);
    }

    return res.json();
};

export const signupApi = async (email: string, password: string): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Signup failed: ${errorText}`);
    }

    return res.json();
};
