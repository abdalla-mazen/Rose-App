"use server"

import { userToken } from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

export async function clearCartAction() {
const token = await userToken();

    const response = await fetch(`${process.env.API}/cart`, { method: "DELETE" ,
     headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    );
    revalidatePath("/cart");
    return response.json();
}