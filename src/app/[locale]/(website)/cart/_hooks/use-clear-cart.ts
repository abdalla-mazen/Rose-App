import { useMutation } from "@tanstack/react-query";
import { clearCartAction } from "../_actions/clear-cart.action";
import { revalidatePath } from "next/cache";


export default function useClearCart() {

    const { isPending, error, mutate } = useMutation({
        mutationFn: async () => {
            const response = await clearCartAction();
            if (response?.error) {
                throw new Error(response.error);
            }
 
            revalidatePath("/cart");
            return response;
        },
    });

    return {  error,  isPending, clear: mutate };
}