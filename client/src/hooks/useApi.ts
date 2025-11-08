import { BASE_URL } from "@/constant"
import camelcaseKeys from "camelcase-keys";

export const useApi = () => {

    const exemptedUrls = ["login", "register"];

    const getHeaders = (url: string): HeadersInit => {
        const token = localStorage.getItem("token");

        if (exemptedUrls.some((u) => url.includes(u))) {
            return { "Content-Type": "application/json" };
        }

        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }

    const get = async <T>(url: string): Promise<T> => {
        const res = await fetch(`${BASE_URL}/${url}/`);

        const data = await res.json();
        return camelcaseKeys(data, { deep: true });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const post = async <T>(url: string, bodyData: Record<string, any>): Promise<T> => {
        const res = await fetch(`${BASE_URL}/${url}/`, {
            method: "POST",
            headers: getHeaders(url),
            body: JSON.stringify(bodyData)
        })

        const data = await res.json();
        return camelcaseKeys(data, { deep: true });
    }


    return { get, post }
} 
