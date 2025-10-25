import camelcaseKeys from "camelcase-keys";
import { BASE_URL } from "@/constant";
import type { Post } from "@/types";


export const getUserPostApi = async (email:string): Promise<Post[]> =>{
    const res = await fetch(`${BASE_URL}/post/allPost/${email}`)

    const data = await res.json();
    return camelcaseKeys(data, { deep: true });
}