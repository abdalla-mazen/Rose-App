import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const occasions = [
  {
    tag: "Wedding",
    title: "Celebrate Her Forever with a Gift She’ll Always Remember",
    image: "/images/flower.png",
  },
  {
    tag: "Engagement",
    title: "Honor the Beginning of a Beautiful Journey Together",
    image: "/images/notebook.png",
  },
  {
    tag: "Anniversary",
    title: "Mark Every Year of Love with a Meaningful Surprise",
    image: "/images/anniversary.png",
  },
];

export default function Occasion() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {occasions.map((item) => (
            <Card
              key={item.tag}
              className="relative rounded-2xl overflow-hidden border-none shadow-md group"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />

              <CardContent className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2 text-white">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 rounded-full text-red-800 bg-red-50 hover:bg-red-50 text-md font-medium w-fit"
                >
                  {item.tag}
                </Badge>
                <h3 className="text-lg font-semibold leading-snug">
                  {item.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
