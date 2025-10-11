import BestSelling from "./_components/best-selling/best-seliing";
import MostPopular from "./_components/most-popular/most-popular";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-[1280px]">
      <BestSelling />
      <MostPopular />
    </div>
  );
}
