"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShieldCheck, Database, Lock, Mail, Cookie, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations();

  const sections = [
    {
      icon: ShieldCheck,
      title: t("introTitle"),
      content: t("introContentPrivacy"),
    },
    {
      icon: Database,
      title: t("infoCollectTitle"),
      content: t("infoCollectContent"),
    },
    {
      icon: Lock,
      title: t("dataProtectTitle"),
      content: t("dataProtectContent"),
    },
    {
      icon: Cookie,
      title: t("cookiesTitle"),
      content: t("cookiesContent"),
    },
    {
      icon: RefreshCcw,
      title: t("dataRetentionTitle"),
      content: t("dataRetentionContent"),
    },
    {
      icon: Mail,
      title: t("contactTitle"),
      content: t("contactContent"),
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
            {t("privacyTitle")}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">{t("privacySubtitle")}</p>
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
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
