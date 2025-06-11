import Link from '@/components/link';
import Image from 'next/image';

const Home = () => {
  return (
    <Link
      href="/"
      className="bg-primary p-1 rounded-full border-primary/40 border "
    >
      <Image
        src="/assets/dta.svg"
        alt="DreamToApp Logo"
        width={24}
        height={24}
        className="w-6 h-6 hover:scale-110 transition-transform"
        priority
      />
    </Link>
  );
};
export default Home;
