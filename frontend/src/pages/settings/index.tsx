import { useRouter } from 'next/router';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosCamera } from "react-icons/io";

export default function Index() {
  const router = useRouter();

  return (
    <div className="text-white">
      <div className='grid grid-cols-3 grid-rows-1 gap-2 bg-[#1C1C1E] text-[17px]'>
        <div className='flex'>
          <IoIosArrowBack size={40}/>
          <p className='flex items-center'>Back</p>
        </div>
        <div className='flex items-center justify-center'>Edit Profile</div>
        <div className='flex items-center justify-self-end mr-5'>Done</div>
      </div>


      <div className='mb-8'>
        <div className='grid grid-cols-[20%,80%] grid-rows-2 flex items-center bg-[#1C1C1D] h-[105.48px] text-[#545458A6] text-[17px]'>
          <div className='row-span-2 ml-5 flex justify-center items-center w-[75px] h-[75px] bg-black rounded-full text-white'>
            <IoIosCamera className="w-10 h-10"/>
          </div>
          <div className='relative'>
            <p className='ml-3'>Name</p>
            <div className='absolute bottom-[-16px] left-0 w-[100%] border-b-[0.5px] border-[#545458A6]'></div>
          </div>
          <div className='ml-3'>Last Name</div>
        </div>
        <p className='text-[#8E8E93] ml-4 text-[14px]'>Enter your name and add an optional profile photo.</p>
      </div>


      <div className='mb-8'>
        <div className='bg-[#1C1C1D] h-[50.29px] flex items-center text-[#545458A6]'>
          <div className='ml-4 text-[17px]'>Enter Description</div>
        </div>
        <div className='ml-4 text-[#8E8E93] text-[14px]'>
          <p className='m-0 leading-tight'>Any details such as age, occupation or city.</p>
          <p className='m-0 leading-tight'>Example: 23 y.o. designer from San Francisco.</p></div>
      </div>


      <div className='grid grid-rows-2 flex items-center bg-[#1C1C1D] h-[101.14px] mb-11 text-[17px]'>
          <div className='flex items-center relative'>
            <p className='ml-4'>Change Number</p>
            <div className='gap-2 flex text-[#EBEBF599] ml-auto mr-3'>
              <p>+82 123 456 789_</p>
              <IoIosArrowForward size={20} className='mt-1'/>
              <div className='absolute bottom-[-16px] left-0 w-full border-b-[0.5px] border-[#545458A6]'></div>
            </div>
          </div>
          <div className='flex items-center'>
            <p className='ml-4'>Username</p>
            <div className='gap-2 flex text-[#EBEBF599] ml-auto mr-3'>
              <p>@icp_hackathon</p>
              <IoIosArrowForward size={20} className='mt-1'/>
           </div>
          </div>
      </div>


      <div className='bg-[#1C1C1D] h-[51px] text-[17px] flex items-center justify-center mb-11'>Add Account</div>


      <div className='bg-[#1C1C1D] text-[#EB5545] text-[17px] h-[51px] flex items-center justify-center'>Log Out</div>
    </div>
  );
}
