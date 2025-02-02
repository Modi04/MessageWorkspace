import { IoMdSend } from 'react-icons/io';

export default function MesssageInput({
  inputval,
  handleInputChange,
  handleKeyDown,
}) {
  return (
    <div className="fixed bottom-0 w-full flex">
      <div className="relative w-[600px]">
        <input
          type="text"
          value={inputval}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full py-4 pr-14 pl-6 text-[#757575] border rounded-xl"
          placeholder="Write your message"
        />

        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={() => console.log('메시지 보냄!')}
        >
          <IoMdSend className="w-8 h-8 text-[#3A7940]" />
        </button>
      </div>
    </div>
  );
}
