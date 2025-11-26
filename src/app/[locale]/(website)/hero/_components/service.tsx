"use client";

import { Truck, RotateCw, ShieldCheck, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations(); // Translation

  // Services array with translations
  const services = [
    {
      icon: <Truck className="w-6 h-6 text-white" />,
      title: t("services-freeDelivery-title"),
      description: t("services-freeDelivery-description"),
    },
    {
      icon: <RotateCw className="w-6 h-6 text-white" />,
      title: t("services-refund-title"),
      description: t("services-refund-description"),
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: t("services-safePayment-title"),
      description: t("services-safePayment-description"),
    },
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      title: t("services-support-title"),
      description: t("services-support-description"),
    },
  ];

  return (
    <section className="w-full bg-red-50 rounded-xl py-6 px-8 flex flex-wrap justify-between items-center gap-6 shadow-sm">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center gap-4 flex-1 min-w-[200px]"
        >
          {/* Icon circle */}
          <div className="bg-red-800 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
            {service.icon}
          </div>

          {/* Text content */}
          <div>
            <h3 className="text-red-800 font-semibold text-base">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
