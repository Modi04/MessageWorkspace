import { useRouter } from 'next/router';
import Card from './Card';

export default function UserList({ title, setIsSelected, setValue, contents }) {
  const router = useRouter();

  const onCardClick = (value: string) => {
    setValue(value);
    setIsSelected(true);
  };

  return (
    <div className="w-full h-full">
      <div className="text-[18px] font-bold  p-3 text-white">{title}</div>
      {contents?.map((message, index) => (
        <div className="w-full border-b border-slate-700">
          <button
            className="w-full "
            key={index}
            onClick={() => onCardClick(message.id)} // 화살표 함수로 래핑
          >
            <Card message={message} />
          </button>
        </div>
      ))}
    </div>
  );
}
