const MessageBox = ({ isUser, profile, contents }) => {


  return (
    <div
      className={`relative w-full flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {!isUser && (
        <div className="mb-2 text-[#E6E0E9] rounded-full bg-[#4F378B] flex items-center justify-center font-mono w-12 h-12 m-2">
          {profile}
        </div>
      )}
      <div
        className={`w-fit h-fit p-3 rounded-xl ml-2 mr-5 flex items-center my-auto ${
          isUser ? 'bg-[#14C0FF] text-white' : 'bg-[#262628] text-white'
        }`}
      >
        <div className="text-center">{contents}</div>
      </div>

    </div>
  );
};

export default MessageBox;
