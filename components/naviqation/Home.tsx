import Link from "next/link";
import { Icon } from "@iconify/react";
import { normalIcons } from "../../constant/icons";

const Home = () => {
  return (
    <Link
      href="/"
      className="bg-primary/20 p-1 rounded-full border-primary/40 border"
    >
      <Icon
        icon={normalIcons.home.icon}
        className="w-6 h-6 text-primary hover:scale-110"
      />
    </Link>
  );
};
export default Home;
