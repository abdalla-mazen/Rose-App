import { ArrowRight, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-28 px-6 text-center">
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center shadow-inner">
          <Heart size={48} strokeWidth={1.5} className="text-rose-400" />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
          <Zap size={14} className="text-white fill-white" />
        </div>
      </div>

      <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-3">
        Your wishlist is empty
      </h2>
      <p className="text-slate-500 text-base max-w-xs leading-relaxed mb-8">
        Save items you love and come back to them whenever you&apos;re ready.
      </p>
      <Button
        asChild
        className="h-12 px-8 rounded-2xl bg-gradient-to-br from-maroon-400 to-maroon-700 hover:bg-gradient-to-br hover:from-maroon-500 hover:to-maroon-600 text-white font-semibold text-sm tracking-wide transition-all duration-200 active:scale-95 shadow-lg "
      >
        <Link href="/products" className="flex justify-center items-center w-full h-full">
          Start Exploring
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </Button>
    </div>
  );
}
