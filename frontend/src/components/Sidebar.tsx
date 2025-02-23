import { HiMagnifyingGlass } from 'react-icons/hi2';
import { HiMiniBars4 } from 'react-icons/hi2';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { IoCloseCircle } from 'react-icons/io5';
import { createIdentity } from '../api/icp/context';


const RequestCard = ({ profile, title, description, setShow, setShowAddFriend }) => {
  return (
    <div className="flex w-full h-[100px] border-b border-[#4A4A4B] justify-between items-center mb-2 px-6">
      <div className="flex">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3A7940] text-white">
          {profile}
        </div>

        <div className="flex flex-col items-start text-start ml-4">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-400">{description}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <IoCloseCircle size={36} className="text-white cursor-pointer" />
        <IoCheckmarkCircle
          cursor="pointer"
          onClick={() => {
            setShow(false);
            setShowAddFriend(true);
          }}
          size={36}
          className="text-[#CDFF7B] cursor-pointer"
        />
      </div>
    </div>
  );
};

const Sidebar = ({ setShow, setShowAddFriend }) => {
  return (
    <>
      <div className="absolute top-0 right-0 bg-[#3D3D3F] w-[70%] h-[100%]">
        <div className="w-full flex justify-between items-center px-6 my-4">
          <div className="text-[#E6E0E9] text-[23px]">Requests</div>
          <button
            onClick={() => {
              setShow(false);
              setShowAddFriend(true);
            }}
          >
            <IoClose size={32} color="grey" />
          </button>
        </div>

        <div className="grid grid-cols-[10%,70%,20%] grid-rows-1 flex items-center rounded-lg ml-[5%] w-[90%] h-10 bg-[#333333] mb-6">
          <HiMagnifyingGlass size={20} className="ml-3" />
          <div className="text-[#9E9E9E] ml-4">Search</div>
        </div>
        <RequestCard
          profile="A"
          title="Group A"
          description="Request from Identity A"
          setShow={setShow}
          setShowAddFriend={setShowAddFriend}
        />
        <RequestCard
          profile="B"
          title="Group B"
          description="Request from Identity Sangjun"
          setShow={setShow}
          setShowAddFriend={setShowAddFriend}
        />
      </div>
    </>
  );
};

export default Sidebar;
