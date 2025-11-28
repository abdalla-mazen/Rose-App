import  z  from "zod";

export const OccasionsSchema = () =>{
return z.object({
name: z.string().nonempty("Name is required"),
 image: z.any()
})
}
export type Occasions = z.infer<typeof OccasionsSchema>