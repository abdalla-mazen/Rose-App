"use client";

import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderCircle, Upload } from "lucide-react";
import useAddProduct from "../_hooks/use-add-product";
import ErrorMessage from "@/components/shared/error-message";
import { addProductSchema, AddProductValues } from "@/lib/schemas/add-update-product.schema";

// Props
type Props = {
  occasions: Occasion[];
  categories: Category[];
};

export default function AddProductForm({ occasions, categories }: Props) {
  // Hooks
  const { error, isPending, addProduct } = useAddProduct();

  const form = useForm<AddProductValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      discount: "",
      priceAfterDiscount: "",
      quantity: "",
      category: "",
      occasion: "",
      images: [],
      imgCover: [],
    },
    resolver: zodResolver(addProductSchema),
  });

  // Calculate price after discount after any edit in price , discount
  const price = form.watch("price");
  const discount = form.watch("discount");

  useEffect(() => {
    const pri = Number(price) || 0;
    const dis = Number(discount) || 0;

    const finalPrice = pri - dis;

    form.setValue("priceAfterDiscount", String(finalPrice > 0 ? finalPrice : 0));
  }, [price, discount, form]);

  // On submit
  const onSubmit: SubmitHandler<AddProductValues> = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("discount", values.discount.toString());
    formData.append("priceAfterDiscount", values.priceAfterDiscount.toString());
    formData.append("quantity", values.quantity.toString());
    formData.append("category", values.category);
    formData.append("occasion", values.occasion);

    if (values.imgCover.length > 0) {
      formData.append("imgCover", values.imgCover[0]);
    }

    values.images.forEach((file, index) => {
      formData.append(`images`, file);
    });

    addProduct(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg w-[1081px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[746px]">
          {/* Product title */}
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel>
                  Title <span className="text-red-600">*</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input {...field} placeholder="Enter product title" />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product description */}
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-4">
                {/* Label */}
                <FormLabel>
                  Description <span className="text-red-600">*</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Textarea
                    className="h-36 resize-none"
                    {...field}
                    placeholder="Enter product description"
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product prices */}
          <div className="flex justify-evenly gap-2.5">
            {/* Price */}
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/3">
                  {/* Label */}
                  <FormLabel>
                    Price <span className="text-red-600">*</span>
                  </FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input {...field} type="number" placeholder="Example: 5000" />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discount */}
            <FormField
              name="discount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/3">
                  {/* Label */}
                  <FormLabel>Discount</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input type="number" {...field} placeholder="Example: 5" />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price after discount  */}
            <FormField
              name="priceAfterDiscount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/3">
                  {/* Label */}
                  <FormLabel>Price after discount</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input type="number" disabled {...field} placeholder="Example: 4995" />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/*Product quantity */}
          <FormField
            name="quantity"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-4">
                {/* Label */}
                <FormLabel>
                  Quantity <span className="text-red-600">*</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input type="number" {...field} placeholder="Example: 200" />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product images */}
          <div className="flex justify-evenly gap-4">
            {/* Product cover image */}
            <FormField
              name="imgCover"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>
                    Product cover image <span className="text-red-600">*</span>
                  </FormLabel>

                  <FormControl>
                    <div className="border rounded-lg p-2 flex items-center justify-between">
                      {/* {field.value.length > 0 ? (
                        <img
                          src={URL.createObjectURL(field.value[0])} // ✅ field.value[0] هو File
                          alt="Cover preview"
                          className="w-full h-40 object-cover rounded-md mb-3"
                        />
                      ) : (
                        <p className="text-gray-500 text-sm mb-2">No image uploaded</p>
                      )} */}

                      {field.value.length > 0 ? (
                        typeof field.value[0] === "string" ? (
                          <img
                            src={field.value[0]} // URL موجود مسبقًا
                            alt="Cover preview"
                            className="w-full h-40 object-cover rounded-md mb-3"
                          />
                        ) : (
                          <img
                            src={URL.createObjectURL(field.value[0] as File)} // File جديد
                            alt="Cover preview"
                            className="w-full h-40 object-cover rounded-md mb-3"
                          />
                        )
                      ) : (
                        <p className="text-gray-500 text-sm mb-2">No image uploaded</p>
                      )}

                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="imgCoverInput"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange([file]); // ✅ حط File مباشرة في array
                          }
                        }}
                      />

                      <FormLabel
                        htmlFor="imgCoverInput"
                        className="cursor-pointer text-sm text-maroon-500 flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" /> Upload file
                      </FormLabel>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product gallery */}
            <FormField
              name="images"
              control={form.control}
              render={({ field }) => {
                const galleryFiles = Array.isArray(field.value) ? field.value : [];

                return (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      Product gallery <span className="text-red-600">*</span>
                    </FormLabel>

                    <FormControl>
                      <div className="border rounded-lg p-2">
                        {/* Preview Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          {/* {galleryFiles.map((file, index) => (
                            <img
                              key={index}
                              src={URL.createObjectURL(file)} // فقط للعرض
                              className="w-full h-20 object-cover rounded-md"
                            />
                          ))} */}

                          {galleryFiles.map((file, index) => (
                            <img
                              key={index}
                              src={typeof file === "string" ? file : URL.createObjectURL(file)}
                              className="w-full h-20 object-cover rounded-md"
                            />
                          ))}
                        </div>

                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          id="galleryInput"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            field.onChange([...galleryFiles, ...files]); // ✅ خزّن File objects مباشرة
                          }}
                        />

                        <FormLabel
                          htmlFor="galleryInput"
                          className="cursor-pointer text-sm text-maroon-500 flex items-center justify-end gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload file
                        </FormLabel>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Category */}
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-4">
                {/* Label */}
                <FormLabel>
                  Category <span className="text-red-600">*</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem value={cat._id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Occasion */}
          <FormField
            name="occasion"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4">
                {/* Label */}
                <FormLabel>
                  Occasion <span className="text-red-600">*</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      {occasions.map((occ) => (
                        <SelectItem value={occ._id}>{occ.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Add product error */}
          {error && <ErrorMessage message={error.message} />}

          <Button type="submit" disabled={isPending} variant="primary" className="capitalize mt-24">
            add product {isPending && <LoaderCircle className="me-2 animate-spin" size={16} />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
