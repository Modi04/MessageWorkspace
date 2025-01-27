import { IoMdSend } from "react-icons/io";

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
      <button className="absolute bottom-[102px] right-0 transform -translate-x-1/2 flex items-center"
      onClick={() => console.log("메시지 보냄!")}>
        <div className="flex items-center justify-center w-11 h-11 bg-[#14C0FF] rounded-full">
          <IoMdSend className="w-8 h-8 text-white"/>
        </div>
      </button>
    </div>
  );
}
