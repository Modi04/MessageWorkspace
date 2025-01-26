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

  function formatDescription(description) {
    if (!description) return ''; // description이 null 또는 undefined인 경우 빈 문자열 반환
    return description.length > 30
      ? description.substring(0, 30) + '...'
      : description;
  }

  return (
    <div className="w-full bg-black h-fit p-4">
      <div className="w-full flex items-center place-contents-between">
        <div className="text-[#E6E0E9] rounded-full bg-[#4F378B] flex items-center justify-center font-mono w-12 h-12">
          {message.profile}
        </div>

        <div className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap text-start overflow-hidden px-4">
          <div className="font-bold text-[#E6E0E9] ">{message.name}</div>
          <div className="text-slate-500 text-[14px]">
            {formatDescription(message.description)}
          </div>
        </div>

        <BsThreeDotsVertical className="mb-5 text-lg text-[#CAC4D0]" />
      </div>
    </div>
  );
};

export default Card;
