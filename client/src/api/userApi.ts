import camelcaseKeys from "camelcase-keys";
import { BASE_URL } from "@/constant";
import type { User } from "@/types";

export const getUserData = async (email: string): Promise<User> => {
    const res = await fetch(`${BASE_URL}/user/data/${email}`)

    if (!res.ok) {
        const errorText = await res.text();
        console.log(`User data fetch failed: ${errorText}`)
        throw new Error(`User data fetch failed: ${errorText}`);
    }

    const data = await res.json();
    return camelcaseKeys(data, { deep: true });
}

