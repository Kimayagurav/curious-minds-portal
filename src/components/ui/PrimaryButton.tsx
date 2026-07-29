import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function PrimaryButton({
  href,
  children,
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className="
        inline-flex
        items-center
        justify-center
        gap-2

        px-8
        py-4

        rounded-2xl

        bg-[#FFD54A]
        text-black
        font-semibold

        transition-all
        duration-300

        hover:scale-105
        hover:shadow-[0_0_30px_rgba(255,213,74,0.35)]
      "
    >
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}