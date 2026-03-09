"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, Flower2, CreditCard, Truck, RefreshCcw, Shield, Scale } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TermsConditions() {
  const t = useTranslations();

  const sections = [
    {
      icon: FileText,
      title: t("introTitle"),
      content: t("introContent"),
    },
    {
      icon: Flower2,
      title: t("productsTitle"),
      content: t("productsContent"),
    },
    {
      icon: CreditCard,
      title: t("ordersTitle"),
      content: t("ordersContent"),
    },
    {
      icon: Truck,
      title: t("deliveryTitle"),
      content: t("deliveryContent"),
    },
    {
      icon: RefreshCcw,
      title: t("returnsTitle"),
      content: t("returnsContent"),
    },
    {
      icon: Shield,
      title: t("ipTitle"),
      content: t("ipContent"),
    },
    {
      icon: Scale,
      title: t("liabilityTitle"),
      content: t("liabilityContent"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-16 px-6 transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("termsTitle")}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">{t("termsSubtitle")}</p>
        </motion.div>

        {/* Sections */}
        <div className="grid gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-900/30">
                        <Icon className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {section.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
