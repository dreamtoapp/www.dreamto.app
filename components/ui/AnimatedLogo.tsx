
import Image from "next/image";


export default function AnimatedLogo() {
  return (
    <div
     
      className="relative w-8 h-8 flex items-center bg-white rounded-full shadow-md p-1"
      style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)' }}
    >
      <Image
        src="/assets/dta.svg"
        alt="DreamToApp Logo"
        fill
        priority
        className="h-9 w-auto"
      />
    </div>
  );
}
