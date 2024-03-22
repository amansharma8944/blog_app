import React, { useEffect, useState } from 'react'
import { Firebase, app } from '../Context/ContextPage.js'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
 import NavbarComponent from '../Components/navbar/NavbarComponent';
import CardComponent from '../Components/card/CardComponent';
import TemporaryDrawer from '../Components/Drawer';
import { getAuth, } from 'firebase/auth'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import BiotechIcon from '@mui/icons-material/Biotech';
import MovieIcon from '@mui/icons-material/Movie';
import MenuIcon from '@mui/icons-material/Menu';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export const categories = [{
  index: 0,
  title: "All Category",
  icon:<DoneAllIcon sx={{color:"black"}}/>
},
{
  index: 1,
  title: "LifeStyle"
  ,icon:<NightlifeIcon sx={{color:"black"}}/>
},
{
  index: 2,
  title: "Travel"
  ,icon:<ElectricCarIcon sx={{color:"black"}}/>
},
{
  index: 3,
  title: "Food and Cooking",
  icon:<RestaurantIcon sx={{color:"black"}}/>
}
  ,
{
  index: 4,
  title: "Health & Fitness",
  icon:<FavoriteIcon sx={{color:"black"}}/>
}
  ,
{
  index: 5,
  title: "Education",
  icon:<SchoolIcon sx={{color:"black"}}/>

},
{
  index: 6,
  title: "Entertainment",
  icon:<MovieIcon sx={{color:"black"}}/>
},
{
  index: 7,
  title: "Technology",
  icon:<BiotechIcon sx={{color:"black"}}/>
},


]


const db = getFirestore(app);
type fetchedposts = {
  content: string,
  createdAt: number,
  createdBy: string,
  id: string,
  imageUrl: string,
  title: string,

}
const Home = () => {
  const auth = getAuth();
  const userLogined = auth.currentUser;
  const { signInWithGoogle, signout, User } = Firebase();
  const [selectedCateogy, setselectedCateogy] = useState<string>("All Category")
  const navi = useNavigate();

  const [postsAll, setpostsAll] = useState<fetchedposts[] | any>([]);
  const [seletedPosts, setSelectedPost] = useState<fetchedposts[] | any>([]);
  const [isExpanded, setIsExpanded] = useState(true);
   
  //   const sidebarVariants = {
  //    expanded: { width: '250px' },
  //       collapsed: { width: '70px' }
  //  }
  const sidebarVariants = {
    expanded: {
      width: '250px',
      transition: { staggerChildren: 0.5, when: "afterChildren" }
    },
    collapsed: {
      width: '70px',
      transition: { staggerDirection: -1, when: "afterChildren" }
    }
  };
  const sidebarVariants2 = {
    expanded: {
      width: '250px',
      // transition: { staggerChildren: 0.5, when: "afterChildren" }
    },
    collapsed: {
      width: '70px',
      // transition: { staggerDirection: -1, when: "afterChildren" }
    }
  };

  // List item variants
  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  const textVariants = {
    expanded: { opacity: 1, display: 'inline' },
    collapsed: { opacity: 0, display: 'none', transitionEnd: { display: 'none' } }
  };
  // Transition for all animations
  const transition = {
    type: 'spring',
    damping: 10,
    stiffness: 100
  };

  // Toggle function
  const toggleSidebar = () => setIsExpanded(!isExpanded);




  const maintain = () => {
    console.log(User)


  }



  const libuttoncalled = (e: any) => {
    console.log("button called")
    console.log(selectedCateogy);
    setselectedCateogy(e.title)

  }


  const fetchBlogPosts = async () => {
    // Use the modular syntax for fetching documents
    const blogPostsQuery = query(collection(db, "blogPosts"));
    const snapshot = await getDocs(blogPostsQuery);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(posts)
    setpostsAll(posts)


  };

  useEffect(() => {

    fetchBlogPosts();

  }, [])

  useEffect(() => {
    console.log(postsAll)
  }, [postsAll])


  useEffect(() => {
    const listt = postsAll.filter((e: any) => {
      if (selectedCateogy === "All Category") {
        return (e)
      }
      else {
        return (e.category === selectedCateogy)
      }
    })
    setSelectedPost(listt)
  }, [selectedCateogy, postsAll])


  return (
    <>
      <NavbarComponent />
      <div className='flex w-[100%] h-[calc(100vh - 8vh)]  flex-col md:flex-row ' style={{ height: 'calc(100vh - 8vh)' }}>
        <div className='md:hidden'>

          {<TemporaryDrawer categories1={selectedCateogy} changeCategory={libuttoncalled} />}
        </div>

        {/* mobile
         */}
        {/* <div className='w-[20%] bg-[#edeaea] border-r-[1px] border-[black]  md:hidden  '>
          <ul className='flex overflow-x-scroll  w-[100vw] h-full'>
            {
              categories.map((e) => {
                return (<li 
                onClick={()=>libuttoncalled(e)}
                key={e.index} className={`w-full font-[600]  px-[10px] py-[8px] border-b-[1px] border-[#c5c2c2] ${e.title===selectedCateogy?"bg-[rgba(255,125,0,0.8)] text-[white]":"bg-white"} border-[black] hover:bg-[rgba(255,125,0,0.5)] hover:text-[white] hover:cursor-pointer  transition-all duration-500 `}>
                  {e.title}

                </li>)
              })
            }
          </ul>

        </div> */}

        {/* pc */}

        <motion.div 
        
        className="
        
       
        
        flex-col items-center  h-full   w-[250px] 
        bg-[white]  border-[black] hidden md:flex   !shadow-custom"
        animate={isExpanded ? 'expanded' : 'collapsed'}
        variants={sidebarVariants}
        initial={false}
        transition={{ type: 'spring', stiffness: 30, damping: 12 }}
        // className='w-[250px]  bg-[white]  border-[black] hidden md:flex  flex-col !shadow-custom  '
        >
           <div className={`w-full flex   ${!isExpanded?"justify-center":"justify-end"}`}>
         
      <button
        className="ml-2 p-2 text-black rounded"
        onClick={toggleSidebar}
      >
        {isExpanded ? <CloseFullscreenIcon/> : <MenuIcon/>}
      </button>

           </div>
          <motion.ul className='flex flex-col   w-full h-full
                                        p-2
          '
          
          // className=""
          animate={isExpanded ? 'expanded' : 'collapsed'}
          variants={sidebarVariants}
          initial={false}
          transition={{ type: 'spring', stiffness: 30, damping: 12 }}
          >
            {
              categories.map((e) => {
                return (<motion.li
                  onClick={() => libuttoncalled(e)}
                  key={e.index} className={`w-full font-[600]  px-[10px] py-[8px] my-[5px] border-[#c5c2c2] ${e.title === selectedCateogy ? "bg-[rgba(255,125,0,0.8)] text-[white]" : "bg-white"} border-[black] hover:bg-[rgba(255,125,0,0.5)] hover:text-[white] hover:cursor-pointer  transition-all duration-500 rounded-[5px]  `}>
                  {e.icon&&e.icon}
                  <motion.span
                className="ml-2"
                variants={textVariants}
                initial="collapsed"
                animate={isExpanded ? 'expanded' : 'collapsed'}
                transition={{ duration: 0.2 }}
              >
                {e.title}
              </motion.span>

                </motion.li>)
              })
            }
          </motion.ul>
          {userLogined &&

            <motion.div 
            
            variants={sidebarVariants}
            className='w-full h-[8vh]  mb-[15px] flex px-[5px] bg-[#f7f7f7;] '>
             {isExpanded&& <motion.img src={userLogined?.photoURL || undefined}
                className='w-[70px] rounded-[5px]  hover:cursor-pointer '
                alt=""
                onClick={() => { navi("/profile") }}
              />}
              <motion.div 
              
              animate={{}}
              className=' w-full flex flex-col pl-[10px]  justify-between'>
              { isExpanded&&  <motion.p className='mt-[3px] text-[16px] text-black font-[400] '>
                  {userLogined?.displayName}
                </motion.p>}
                <div
                  style={{ transform: " rotateY(529deg)" }}
                  className='w-full flex '

                >
                  <div
                    onClick={() => { signout() }}
                  >
                    <LogoutIcon
                      sx={{
                        marginLeft: "15px", height: "30px", width: "30px"
                        , ":hover": {
                          cursor: "pointer"
                        }
                      }}

                    />
                  </div>
                </div>

              </motion.div>
            </motion.div>
          }

        </motion.div>

        <div className={`w-full ${isExpanded?"md:w-[calc(100% - 250px)]": "md:w-[100% - 150px]"} md:flex-wrap flex pt-[20px] ml-[5%] overflow-y-auto md:flex-row flex-col`}>
          {seletedPosts?.map((e: any) => {
            return (<CardComponent id={e.id} title={e.title} content={e.content} imageUrl={e.imageUrl} createdAt={e.createdAt} createdBy={e.createdBy} />)
          })}

        </div>

      </div>


    

    </>
  )
}

export default Home




