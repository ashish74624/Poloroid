import { BASE_URL } from "@/constant"
import camelcaseKeys from "camelcase-keys";

export const useApi = () => {
    const get = async <T>(url: string): Promise<T> => {
        const res = await fetch(`${BASE_URL}/${url}/`);

        const data = await res.json();
        return camelcaseKeys(data, { deep: true });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const post = async <T>(url: string, bodyData: Record<string, any>): Promise<T> => {
        const res = await fetch(`${BASE_URL}/${url}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData)
        })

        const data = await res.json();
        return camelcaseKeys(data, { deep: true });
    }


    return { get, post }
} 
