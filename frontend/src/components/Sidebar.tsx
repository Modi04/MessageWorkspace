import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const Sidebar = () => {
  return (
    <>

    <div className="bg-[#3D3D3F] w-20 h-80">
      <div className="text-[#E6E0E9]">Friend Request</div>
      <div className="grid grid-cols-3 grid-rows-1 w-18 h-10 bg-[#333333]">
        <HiMagnifyingGlass />
        <div className="text-[#9E9E9E]">Search</div>
        <FaBars className="text-[#9E9E9E]"/>
      </div>
      <div className="grid grid-cols-[30%, 50%, 10%, 10%] grid-rows-2">
        <div className="row-span-2 flex items-center justify-center w-8 h-8 rounded-full bg-[#D3C1FF] text-black">A</div>
        <div>Name</div>
        <div>Purpose of request</div>
        <FaRegTimesCircle />
        <FaRegCheckCircle />
      </div>

    </div>
    </>
  );
};

export default Sidebar;