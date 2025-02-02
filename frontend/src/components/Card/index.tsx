import { useRouter } from 'next/router';
import { BsThreeDotsVertical } from 'react-icons/bs';

type Message = {
  profile: string;
  name: string;
  description: string;
  id: string;
};

interface CardProps {
  message: Message;
}

const Card: React.FC<CardProps> = ({ message }) => {
  const router = useRouter();

  return (
    <div className="w-full bg-black h-[90px] flex items-center place-contents-between p-4">
      <div className="text-[#E6E0E9] rounded-full bg-[#3A7940] flex items-center justify-center font-mono w-12 h-12">
        {message.profile}
      </div>
      <div className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap text-start overflow-hidden px-4">
        <div className="text-[#E6E0E9] ">{message.name}</div>
        <div className="text-slate-500 text-[14px] break-word">
          {message.description}
        </div>
      </div>
      <BsThreeDotsVertical className="mb-5 text-lg text-[#CAC4D0]" />{' '}
    </div>
  );
};

export default Card;
