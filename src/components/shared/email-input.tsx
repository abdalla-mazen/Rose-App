import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
export default function EmailInput() {
const t = useTranslations()

  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="mb-9">
            <FormLabel className="text-base text-zinc-800  dark:text-zinc-50 ">
            {t("emailLabel")}
            </FormLabel>
            <FormControl>
              <Input
                placeholder="user@example.com"
                {...field}
                type="email"
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
