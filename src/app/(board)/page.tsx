import Feed from "@/components/Feed";
import Share from "@/components/Share";
import Link from "next/link";

const Homepage = async () => {
  return (
    <div className="">
      <div className="px-4 pt-4  flex justify-between text-textGray font-bold border-b-[1px] border-borderGray">
        <Link className="pb-3 items-center border-b-4 border-iconBlue" href="/">
          For you
        </Link>
        <Link className="pb-3 items-center  " href="/">
          For you
        </Link>
      </div>
      <Share />
      <Feed />
    </div>
  );
};

export default Homepage;
