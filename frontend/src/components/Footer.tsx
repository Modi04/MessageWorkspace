import { useRouter } from 'next/router';
import { MdOutlinePersonOutline, MdSettings } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";

export default function Footer() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[600px] fixed bottom-0 h-20 bg-[#211F26] flex justify-around items-center">
      <div className="flex flex-col items-center">
        <MdOutlinePersonOutline size='24' />
        <p>Friends</p>
      </div>
     <div className="flex flex-col items-center">
        <FiMessageSquare  size='24' />
        <p>Message</p>
      </div>
      <div className="flex flex-col items-center">
        <MdSettings  size='24' />
        <p>Setting</p>
      </div>
    </div>
  );
}
