// import React, { useEffect, useState } from 'react'
// import { Firebase } from '../Context/ContextPage'
// import { getAuth,updateProfile } from 'firebase/auth'
// import NavbarComponent from '../Components/navbar/NavbarComponent';

// const Profile = () => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     const [Name, setName] = useState(user?.displayName || "")
//     const [profile, setProfile] = useState<File|null>(null)
//     const [defaultProfilepic, setdefaultProfilepic] = useState("")
//     const {uploadProfilePic,}=Firebase()

//     const buttonclicked = async () => {
//         if (profile) {
//           try {
//             const url = await uploadProfilePic(profile);

//             setdefaultProfilepic(url); // Update the component's state with the new URL
//           } catch (error) {
//             console.error('Error uploading profile picture:', error);
//           }
//         }

//         if (user) {
//             try {
//               await updateProfile(user, {
//                 displayName: Name,
//               });
//               console.log('Username updated successfully');
//               // You can also update the state or context here if needed
//             } catch (error) {
//               console.error('Error updating username:', error);
//               // Handle errors here, such as displaying a message to the user
//             }
//           }
//       }; 




//     useEffect(() => {
//         const auth = getAuth();
//         const user = auth.currentUser;

//         if (user && user.photoURL) {
//             setdefaultProfilepic(user.photoURL);
//         }

//         if(user && user.displayName){
//             setName(user.displayName)
//         }
//     }, [user]);





//   return (<>
//   <NavbarComponent/>
//     <div className=" px-6 py-6  text-center bg-gray-800 rounded-lg lg:mt-0 xl:px-10 w-[100vw] h-[100vh] flex justify-center items-center">
//     <div className="space-y-4 xl:space-y-6">
//         <img className="mx-auto rounded-full h-36 w-36" src={user?.photoURL ||defaultProfilepic} alt="author avatar"/>
//         <div className="space-y-2">
//             <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
//               <input type="text" className='text-[white] bg-[transparent] h-[30px] px-[3px]' value={Name}  onChange={(e)=>{setName(e.target.value)}} placeholder='ENTER NAME'/>
//                <input type="file" placeholder='Upload Profile Picture' className='!mt-[3vh]'
//                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
//                 if(e.target.files){  setProfile(e.target.files[0])}  
//               }}
//                />
//                 <p className="text-indigo-300">Web Developer</p>
//                 <div className="flex justify-center mt-5 space-x-5"><a href="#" target="_blank" rel="noopener noreferrer"
//                         className="inline-block text-gray-400"><span className="sr-only">Twitter</span><svg
//                             stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512"
//                             className="w-6 h-6 text-gray-400 hover:text-gray-100" height="1em" width="1em"
//                             xmlns="http://www.w3.org/2000/svg">
//                             <path
//                                 d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
//                             </path>
//                         </svg></a><a href="#" target="_blank" rel="noopener noreferrer"
//                         className="inline-block text-gray-400"><span className="sr-only">GitHub</span><svg stroke="currentColor"
//                             fill="currentColor" stroke-width="0" viewBox="0 0 496 512"
//                             className="w-6 h-6 text-gray-400 hover:text-gray-100" height="1em" width="1em"
//                             xmlns="http://www.w3.org/2000/svg">
//                             <path
//                                 d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z">
//                             </path>
//                         </svg></a>
//                     <a href="#" target="_blank" rel="noopener noreferrer"
//                         className="inline-block text-gray-400"><span className="sr-only">Linkedin</span><svg
//                             stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"
//                             className="w-6 h-6 text-gray-400 hover:text-gray-100" height="1em" width="1em"
//                             xmlns="http://www.w3.org/2000/svg">
//                             <path
//                                 d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z">
//                             </path>
//                         </svg></a>
//                 </div>
//             </div>
//         </div>
//         <button className='mt-[5vh] border-[1px] border-[white] px-[9px] py-[5px]'
//         onClick={buttonclicked}
//         >UPDATE</button>

//     </div>
// </div>

// </> )
// }

// export default Profile




import React, { useEffect, useRef, useState } from 'react'
import { Firebase } from '../Context/ContextPage'
import { getAuth, updateProfile } from 'firebase/auth'
import NavbarComponent from '../Components/navbar/NavbarComponent';

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [Name, setName] = useState(user?.displayName || "")
  const [Email, setEmail] = useState(user?.email||"")
  const [profile, setProfile] = useState<File | null>(null)
  const [defaultProfilepic, setdefaultProfilepic] = useState("")
  const { uploadProfilePic, } = Firebase()

  const buttonclicked = async () => {
    if (profile) {
      try {
        const url = await uploadProfilePic(profile);

        setdefaultProfilepic(url); // Update the component's state with the new URL
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }

    if (user) {
      try {
        await updateProfile(user, {
          displayName: Name,
        });
        console.log('Username updated successfully');
        // You can also update the state or context here if needed
      } catch (error) {
        console.error('Error updating username:', error);
        // Handle errors here, such as displaying a message to the user
      }
    }
  };




  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.photoURL) {
      setdefaultProfilepic(user.photoURL);
    }

    if (user && user.displayName) {
      setName(user.displayName)
    }
  }, [user]);


  const inputred = useRef<HTMLInputElement | null>(null)
  const buttonUploadImage = () => {
    if (inputred.current) {
      inputred.current.click();
    }
  }


  return (<>
    <NavbarComponent />
    <div className='flex justify-center items-center flex-col'>
      <h1 className='text-[#004932] text-[40px] font-[700]'>Owner Profile</h1>
      <img src={user?.photoURL || defaultProfilepic} alt="" className='w-[30%] h-[22%] rounded-[100%] md:h-[21vh] md:w-[18vw]  xl:h-[25vh] xl:w-[12vw] mt-[3vh] ' />

      <input type="file" className='hidden' ref={inputred}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) { setProfile(e.target.files[0]) }
        }}
      />
      <button
        className='bg-[#437e6c] h-[40px] w-[150px] rounded-[5%] mt-[3vh] text-[white]'
        onClick={buttonUploadImage}
      >Upload Image</button>

      <div className='w-[50%]  flex justify-center mt-[5vh]'>
        <div className='w-[80%] flex justify-center'>
          <label htmlFor="NameLabel" className='text-[black] font-[400] text-[20px] md:text-[28px]   mr-[10%]'>Name</label>
          <input type="text" id='NameLabel' className='w-[50vw] md:w-[80%]  border-2  rounded-md p-2 shadow-xl focus:border-green-500'
            value={Name} onChange={(e) => { setName(e.target.value) }} placeholder='ENTER NAME'
          />
        </div>
      </div>
      <div className='w-[50%]  flex justify-center mt-[5vh]'>
        <div className='w-[80%] flex justify-center'>
          <label htmlFor="EmailLabel" className='text-[black] font-[400] text-[20px] md:text-[28px] mr-[10%]'>Email</label>
          <input type="text" id='EmailLabel' 
          value={Email}
          onChange={(e)=>{setEmail(e.target.value)}}
          className=' w-[50vw] md:w-[80%] focus:border-green-500 border-2 border-gray-300 rounded-md p-2 shadow-xl' />
        </div>
      </div>

      <button
        className='bg-[#437e6c] h-[40px] w-[150px] rounded-[5%] mt-[3vh] text-[white]'
        onClick={buttonclicked}
      >upadate changes</button>

    </div>
    {/* <input type="text" id="textInput" className="w-[50%] border-2 border-gray-300 rounded-md p-2 focus:border-green-500" /> */}


  </>)
}

export default Profile