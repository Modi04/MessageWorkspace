import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiMiniBars4 } from "react-icons/hi2";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { BsFillXCircleFill } from "react-icons/bs";


const RequestCard = () => {
  return (
    <div className="grid grid-cols-[25%,50%,10%,15%] grid-rows-2 w-[90%] ml-[5%] h-[85px] bg-[#1D1B20] rounded-2xl border border-[#CAC4D0]
    flex items-center mb-2">
      <div className="row-span-2 flex items-center justify-center w-12 h-12 rounded-full bg-[#D3C1FF] font-bold text-black ml-5">A</div>
      <div className="mt-3 ml-3">Name</div>
      <BsFillXCircleFill size={24} className="text-white mt-10"/>
      <IoCheckmarkCircleSharp size={28} className="text-lime-400 mt-10"/>
      <div className="text-sm mb-5 ml-3">Purpose of request</div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <>

    <div className="bg-[#3D3D3F] w-[55%] h-[600px] rounded-3xl ml-auto">
      <div className="text-[#E6E0E9] text-[23px] ml-4 mb-4 pt-6">Friend Request</div>
      <div className="grid grid-cols-[10%,70%,20%] grid-rows-1 flex items-center rounded-lg ml-[5%] w-[90%] h-10 bg-[#333333] mb-6">
        <HiMagnifyingGlass size={20} className="ml-3"/>
        <div className="text-[#9E9E9E] ml-4">Search</div>
        <HiMiniBars4 size={20} className="text-[#9E9E9E] ml-8"/>
      </div>
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />

    </div>
    </>
  );
};

export default Sidebar;