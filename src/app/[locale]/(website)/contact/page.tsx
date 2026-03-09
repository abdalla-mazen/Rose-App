import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Facebook, Instagram, Calendar } from "lucide-react";
import React from "react";
import ContactForm from "./_components/contact-form";
import { useTranslations } from "next-intl";

export default function Page() {
  // Translation
  const t = useTranslations();

  return (
    <div className="bg-[#f6f6f6] min-h-screen dark:bg-zinc-800">
      {/* Hero Section */}
      <section className="bg-[#e9dede] py-16 text-center dark:bg-zinc-700 ">
        <p className="text-sm tracking-widest text-maroon-700 dark:text-softPink-300 uppercase mb-2">
          {t("getInTouch")}
        </p>
        <h1 className="text-4xl font-serif font-semibold dark:text-slate-50 text-slate-900">
          {t("contactTitle")}
        </h1>
        <p className="mt-4 text-muted-foreground dark:text-zinc-400 max-w-xl mx-auto">
          {t("contactDescription")}
        </p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* Left - Form */}
        <ContactForm />

        {/* Right - Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-2 dark:text-zinc-50">
              {t("information")}
            </h2>
            <p className="text-muted-foreground text-sm dark:text-zinc-400">
              {t("informationDescription")}
            </p>
          </div>

          {/* Address */}
          <Card className="rounded-2xl bg-rose-50 border-none dark:bg-zinc-700">
            <CardContent className="p-6 flex gap-4 items-start">
              <div className="bg-maroon-600 text-white p-3 rounded-xl dark:bg-softPink-500">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold">{t("ourStudio")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("addressLine1")} <br />
                  {t("addressLine2")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="rounded-2xl bg-rose-50 border-none dark:bg-zinc-700">
            <CardContent className="p-6 flex gap-4 items-start">
              <div className="bg-maroon-600 text-white p-3 rounded-xl dark:bg-softPink-500">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold">{t("callUs")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("customerSupport")} <br />
                  {t("corporate")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="rounded-2xl bg-rose-50 border-none dark:bg-zinc-700">
            <CardContent className="p-6 flex gap-4 items-start">
              <div className="bg-maroon-600 dark:bg-softPink-500 text-white p-3 rounded-xl">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold">{t("emailUs")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("supportEmail")} <br />
                  {t("infoEmail")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              {t("followJourney")}
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-maroon-600" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-maroon-600" />
              <Calendar className="h-5 w-5 cursor-pointer hover:text-maroon-600" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
