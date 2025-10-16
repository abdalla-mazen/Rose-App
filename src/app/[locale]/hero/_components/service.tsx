import { Truck, RotateCw, ShieldCheck, Headphones } from "lucide-react";

const services = [
  {
    icon: <Truck className="w-6 h-6 text-white" />,
    title: "Free Delivery",
    description: "For orders above 120 EGP",
  },
  {
    icon: <RotateCw className="w-6 h-6 text-white" />,
    title: "Get Refund",
    description: "Refunds within 30 days",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: "Safe Payment",
    description: "100% Secure Payment",
  },
  {
    icon: <Headphones className="w-6 h-6 text-white" />,
    title: "24/7 Support",
    description: "Contact us at any time",
  },
];

export default function Services() {
  return (
    <section className="w-full bg-red-50 rounded-xl py-6 px-8 flex flex-wrap justify-between items-center gap-6 shadow-sm">
      {services.map((service, index) => (
        <div
          key={index}
          className="flex items-center gap-4 flex-1 min-w-[200px]"
        >
          <div className="bg-red-800 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
            {service.icon}
          </div>
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
