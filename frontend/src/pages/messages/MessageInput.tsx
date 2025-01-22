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
        placeholder="Enter Message"
      />
    </div>
  );
}
