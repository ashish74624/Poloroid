/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/constant"
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

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

    const post = async <T>(url: string, bodyData: Record<string, any>): Promise<T> => {
        const res = await fetch(`${BASE_URL}/${url}/`, {
            method: "POST",
            headers: getHeaders(url),
            body: JSON.stringify(bodyData)
        })

        const data = await res.json();
        return camelcaseKeys(data, { deep: true });
    }

    const put = async <T>(url: string, bodyData: Record<string, any>): Promise<T> => {
        const snakeBody = snakecaseKeys(bodyData, { deep: true });

        const res = await fetch(`${BASE_URL}/${url}/`, {
            method: "PUT",
            headers: getHeaders(url),
            body: JSON.stringify(snakeBody)
        });

        const data = await res.json();
        return camelcaseKeys(data, { deep: true });
    };

    return { get, post, put }
} 
