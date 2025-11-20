import { Input } from "../ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";


export default function CouponInput() {
  const form = useFormContext();
  return (
    <>
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem className="mb-9">
            <FormControl>
              {/* Input Field */}
              <Input
                placeholder="Coupon Code"
                {...field}
                type="text"
                className={`placeholder:text-zinc-400 border `}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}