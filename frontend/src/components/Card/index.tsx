import { useRouter } from 'next/router';
import { BsThreeDotsVertical } from "react-icons/bs";

type Message = {
  profile: string;
  name: string;
  description: string;
};

interface CardProps {
  message: Message;
}

const Card: React.FC<CardProps> = ({ message }) => {
  const router = useRouter();

  return (
    <div className="border-b border-slate-700 grid grid-cols-[1.5fr_8fr_1fr] grid-rows-1 gap-2 bg-black h-20 place-items-center">
      <div className="text-white rounded-full bg-[#4F378B] flex items-center justify-center font-mono w-12 h-12">
        {message.profile}
      </div>
      <div className="text-white text-left flex justify-start w-full flex-col">
        <div>{message.name}</div>
        <div>{message.description}</div>
      </div>
      <div className=''>
        <BsThreeDotsVertical />
      </div>
    </div>
  );
};

export default Card;
