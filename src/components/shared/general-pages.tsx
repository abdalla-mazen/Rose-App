import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type GeneralPagesProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  primaryText: string;
  secondaryText: string;
  button?: boolean;
  className?: boolean;
};

export default function GeneralPages({
  src,
  alt,
  width,
  height,
  primaryText,
  secondaryText,
  button,
  className,
}: GeneralPagesProps) {
  // Translation
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center items-center space-y-1.5 translate-y-24">
      <Image src={src} alt={alt} width={width} height={height} />

      {/* Primary Text */}
      <p
        className={cn("font-semibold text-4xl", {
          "translate-y-10": className,
        })}
      >
        {primaryText}
      </p>

      {/* Secondary Text */}
      <p
        className={cn("font-normal text-zinc-400 text-xl", {
          "translate-y-10": className,
        })}
      >
        {secondaryText}
      </p>

      {/* Button Link */}
      {button && (
        <div className="flex flex-col justify-center items-center border-zinc-300 border-t min-w-[29rem] h-20 translate-y-4">
          <Link
            href="/"
            className="mt-4 px-4 pt-2 border border-zinc-300 rounded-lg w-44 h-10 text-zinc-800 text-center"
          >
            {t("go-to-homepage")}
          </Link>
        </div>
      )}
    </div>
  );
}
