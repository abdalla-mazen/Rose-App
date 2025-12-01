"use client";

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

import { Image, Images, LoaderCircle, Upload } from "lucide-react";
import ErrorMessage from "@/components/shared/error-message";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProductSchema, UpdateProductValues } from "@/lib/schemas/add-update-product.schema";
import { useEffect } from "react";
import useUpdateProduct from "../_hooks/use-update-product";

// Props
type Props = {
  product: Product;
  categories: Category[];
  occasions: Occasion[];
};

export default function UpdateProductForm({ product, categories, occasions }: Props) {
  // Hooks
  const form = useForm<UpdateProductValues>({
    defaultValues: {
      title: product.title,
      description: product.description,
      price: Number(product.price),
      discount: Number(product.discount),
      priceAfterDiscount: Number(product.priceAfterDiscount),
      quantity: Number(product.quantity),
      category: product.category,
      occasion: product.occasion,
    },
    resolver: zodResolver(updateProductSchema),
  });

  const { error, isPending, updateProduct } = useUpdateProduct(product._id);

  // Calculate price after discount after any edit in price , discount
  useEffect(() => {
    const price = form.watch("price") || 0;
    const discount = form.watch("discount") || 0;

    const finalPrice = price - discount;

    // priceAfterDiscount update
    form.setValue("priceAfterDiscount", finalPrice);
  }, [form.watch("price"), form.watch("discount")]);

  // On submit
  const onSubmit: SubmitHandler<UpdateProductValues> = async (values) => {
    const { discount, occasion, ...data } = values; // remove discount , occasion
    await updateProduct(data);
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
                  <span className="required">Title</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input {...field} />
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
                  <span className="required">Description</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Textarea className="h-36 resize-none" {...field} />
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
                    <span className="required">Price</span>
                  </FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
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
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
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
                    <Input type="number" className="bg-zinc-100" readOnly {...field} />
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
                  <span className="required">Quantity</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem className="my-4">
                {/* Label */}
                <FormLabel>
                  <span className="required">Category</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.name} value={cat._id}>
                          {cat.name}
                        </SelectItem>
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
                  <span className="required">Occasion</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      {occasions.map((occ) => (
                        <SelectItem key={occ.name} value={occ._id}>
                          {occ.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product images */}
          <div className="flex gap-2 justify-end text-sm mb-4">
            <Button variant="outline" className="text-blue-600 w-48">
              <Image /> View product cover
            </Button>

            <Button variant="outline" className="text-blue-600 w-48">
              <Images /> View product gallery
            </Button>
          </div>

          {/* Update product error */}
          {error && <ErrorMessage message={error.message} />}

          <Button type="submit" variant="primary" className="capitalize mt-24">
            update product {isPending && <LoaderCircle className="me-2 animate-spin" size={16} />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
