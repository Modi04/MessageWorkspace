import { useState } from 'react';
import { HiPencil } from 'react-icons/hi';

export default function AddFriendsPopup({
  showPopup,
  setShowPopup,
  handleButtonClick,
}) {
  const [inputval, setInputVal] = useState();

  const handleInputChange = (e) => setInputVal(e.target.value);

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setShowPopup(true)}
        className="flex items-center justify-center fixed bottom-[15vh] left-[60vw] bg-[#CDFF7B] text-black [#00000] w-40 h-16 rounded-[15px]"
      >
        <HiPencil className="text-2xl mr-2" />
        <p className="text-medium">Add friends</p>
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
          <div className="bg-[#CDFF7B] rounded-[15px] flex flex-col w-72">
            <h2 className="text-black text-lg mt-6 ml-5">
              Add Friend - Are you sure?
            </h2>
            <input
              type="text"
              value={inputval}
              onChange={handleInputChange}
              className="px-9 py-1 ml-3 w-64 my-3 h-7 rounded-xl placeholder:text-sm pl-4 text-[#757575]"
              placeholder="Enter Username"
            />
            <div className="mb-1 flex ml-[167px] mt-[-10px] text-sm">
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 px-4 py-2 text-black"
              >
                No
              </button>
              <button
                className="mt-4 px-4 py-2 text-black"
                onClick={() => setShowPopup(false)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
