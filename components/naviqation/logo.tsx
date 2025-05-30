import Image from "next/image";
import dreamtoapp from "@/public/assets/logo.webp";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="relative flex aspect-square size-6 p-2 items-center justify-center rounded-md bg-sidebar-primary  text-sidebar-primary-foreground mr-3">
      <Link href="/">
        <Image
          src={dreamtoapp}
          alt="dreamtoapp"
          // width={20}
          // height={20}
          fill
          loading="eager"
          priority
          sizes="(max-width: 640px) 20px, 24px"
          className="object-contain"
        />
      </Link>
    </div>
  );
};
export default Logo;
