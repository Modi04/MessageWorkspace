import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { profileExample } from '../../db/userProfile';
import { useEffect, useState } from 'react';
import UserList from '../../components/UserList';
import { HiPencil } from 'react-icons/hi';

export default function Index() {
  const router = useRouter();

  const { identity } = router.query;

  const [friendsIdentity, setFriendsIdentity] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [inputValue, setInputValue] = useState(''); 
  const handleInputChange = (e) => { 
  setInputValue(e.target.value); 
  };

  const App = () => {
    const [showPopup, setShowPopup] = useState(false);
    const handleButtonClick = () => {
    setShowPopup(true);
    };
    const handleClosePopup = () => {
    setShowPopup(false);
    };

    return (
      <div className="flex justify-center items-center min-h-screen">
        <button
        onClick={handleButtonClick}
        className="flex items-center fixed bottom-[15vh] left-[59vw] bg-[#E8DEF9] text-[#65558F] w-40 h-16 rounded-[15px]"
        >
          <HiPencil className="text-2xl mr-3 ml-3"/>
          <p className='text-medium mr-3'>Add friends</p>
        </button>

        {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center">
        <div className="bg-[#ECE6F0] rounded-3xl flex flex-col w-72">
        <h2 className="text-black text-lg mb-1 mt-4 ml-5">Add Friend - Are you sure?</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="px-9 py-1 ml-3 w-64 h-7 rounded-xl placeholder:text-sm pl-4 text-[#757575]"
          placeholder="Enter Username"
        />
        <div className='mb-1 flex ml-[167px] mt-[-10px] text-sm'>
          <button
          onClick={handleClosePopup}
          className="mt-4 px-4 py-2 text-[#65558F]"
          >
          No
          </button>
          <button
          className="mt-4 px-4 py-2 text-[#65558F]">
          Yes
          </button>
        </div>
        </div>
        </div>
      )}
      </div>
    );
    };


  console.log(friendsIdentity);
  

  useEffect(() => {
    if (isSelected) {
      router.push({
        pathname: `/messages`, // 이동할 경로
        query: { identity: identity, friendsIdentity: friendsIdentity },
      });
    }
  }, [isSelected]);

  return (
    <div className="bg-black">
      <UserList
        title="Friends"
        contents={profileExample}
        setIsSelected={setIsSelected}
        setValue={setFriendsIdentity}
      />
      <App />
      </div>
  );
}
