"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Faqs() {
  const t = useTranslations();

  const faqs = [
    {
      question: t("faq1Question"),
      answer: t("faq1Answer"),
    },
    {
      question: t("faq2Question"),
      answer: t("faq2Answer"),
    },
    {
      question: t("faq3Question"),
      answer: t("faq3Answer"),
    },
    {
      question: t("faq4Question"),
      answer: t("faq4Answer"),
    },
    {
      question: t("faq5Question"),
      answer: t("faq5Answer"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t("faqsTitle")}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">{t("faqsSubtitle")}</p>
        </motion.div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md hover:shadow-2xl"
              >
                <AccordionTrigger className="p-6 text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-6 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
