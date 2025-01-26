import { IoIosSend } from "react-icons/io";

export default function MesssageInput({
  inputval,
  handleInputChange,
  handleKeyDown,
}) {
  return (
    <div>
      <input
        type="text"
        value={inputval}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="fixed bottom-[80px] w-[600px] py-8 px-3 rounded-xl  text-[#757575]"
        placeholder="Write your message"
      />
      <button className="absolute bottom-[102px] right-2 transform -translate-x-1/2 flex items-center"
      onClick={() => console.log("메시지 보냄!")}>
        <IoIosSend className="w-10 h-10 text-[#14C0FF]"/>
      </button>
    </div>
  );
}
