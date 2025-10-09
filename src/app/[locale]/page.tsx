import BestSelling from "./_components/best-selling/page";
import MostPopular from "./_components/most-popular/page";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-[1280px]">
      <BestSelling />
      <MostPopular />
    </div>
  );
}
