import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Firebase, app } from '../Context/ContextPage';
import NavbarComponent from '../Components/navbar/NavbarComponent';
import { categories } from './Home';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const EditBlog = () => {


  const { fetchBlogPost, updateBlogPost } = Firebase();
  const { id } = useParams();
  const storage = getStorage(app);

  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [selectCategory, setselectCategory] = useState<string>("")
  const [imageurlnew, setImageurlnew] = useState("")

  const submitBlog = async () => {

    let imageUrl = "";
    if (file) {
      const imageRef = ref(storage, `images/${file.name}`);
      const uploadTaskSnapshot = await uploadBytes(imageRef, file);

      // Step 2: Get the download URL of the uploaded image
      imageUrl = await getDownloadURL(imageRef);
    }

    if ((imageUrl || imageurlnew) && title && desc) {
      await updateBlogPost(id, {
        title: title,
        content: desc,
        imageUrl: imageUrl || imageurlnew,
        category: selectCategory


      })

    }

  }


  useEffect(() => {
    const da = async () => {
      const idd = await fetchBlogPost(id)
      settitle(idd?.title);
      setdesc(idd?.desc);
      setselectCategory(idd?.category);
      setImageurlnew(idd?.imageUrl);



    }
    da();
  }, [id])

  return (

    <>
      <NavbarComponent />
      <div className='flex flex-col items-center mt-[10px]'>
        <img src={imageurlnew}
        className='h-[120px]' alt="not available"
        />
        <input type="file"
            className='my-[20px]'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            } else {

              setFile(null);
            }
          }}
        />
      <div className='w-[30%] flex justify-center items-center '>
        <label
        className='font-bold text-[17px] mr-[30px]'
        htmlFor='name'>
NAME
        </label>
        <input type="text"
        id='name'
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

            settitle(e.target.value)
          }}
          className='min-w-[279px] h-[31px] my-[20px] border-b-[1px] border-black'
          placeholder='title' />

</div> 
      
<div className='w-[30%] flex justify-center items-center '>
  <label htmlFor="desc"
  className='font-bold text-[17px] mr-[30px]'
  >
    BODY
  </label>

        <textarea placeholder='enter body'
        
          value={desc}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setdesc(e.target.value)
          }}
          className='min-w-[279px] h-[31px] my-[20px] border-b-[1px] border-black'
          />

          </div>
          <div className='flex  w-[30%] justify-center items-center '>
            <label htmlFor="select"
             className='font-bold text-[17px] mr-[51px]'
            >
              CATEGORY
            </label>

        <select name="category" id="select"
        className='mx-[25px] text-black font-bold bg-[#bbbaba] h-[30px]'
        
        onChange={(e) => {
          setselectCategory(e.target.value)
        }}
        >

          {categories.map((e) => {
            return (e.index !== 0 && <option
              onChange={() => { setselectCategory(e.title) }}
              value={e.title}>{e.title}</option>)
            })}

        </select>

            </div>
        <button
          className='border-[1px] border-[orange] p-[9px] bg-[#f7f4f4] mt-[73px]'
          onClick={submitBlog}
        >Edit blog</button>

      </div>


    </>
  )
}

export default EditBlog