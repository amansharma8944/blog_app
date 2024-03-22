import React, { useState } from 'react'
import NavbarComponent from '../Components/navbar/NavbarComponent'
import { Firebase } from '../Context/ContextPage'
import { categories } from './Home'

const CreateBlog = () => {
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [selectCategory, setselectCategory] = useState<string>("")
  const { createBlogPost } = Firebase();

  const submitBlog = () => {
    console.log(file, title, desc)
    if (file && title && desc) {

      createBlogPost(title, desc, selectCategory, file)
    }

  }
  return (
    <>
      <NavbarComponent />

<div className='flex flex-col items-center mt-[10px]'>

          <div className='flex flex-col items-center'>
         
       <div className='w-full flex justify-center items-center'>

             <label htmlFor="fileimg"
             className='font-bold text-[17px] mr-[15px]'
             > Upload Image</label>
            <input type="file"
            id='fileimg'
            className='my-[20px]'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                } else {
                  
                  setFile(null);
                }
              }}
              />

              </div>

          </div>
          <div className='flex flex-col items-center'>
            <div className='w-full flex justify-center items-center'>
              <label htmlFor="textfortitle"
              className='font-bold text-[17px] mr-[15px]'
              >TITLE</label>

            <input type="text"
            className='min-w-[279px] h-[31px] my-[20px] border-b-[1px] border-black'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              
              settitle(e.target.value)
            }}
            placeholder='title' />

            </div>

            <div className='w-full flex justify-center items-center'>
            <label htmlFor="textfortitle"
              className='font-bold text-[17px] mr-[15px]'
              >BODY</label>



            <textarea placeholder='enter body'
                        className='min-w-[279px] h-[31px] my-[20px]  border-b-[1px] border-black'
                        
                        value={desc}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                          setdesc(e.target.value)
                        }}
                        />
                        </div>
<div>
  
<label htmlFor="cars" 
 className='font-bold text-[17px] mr-[15px]'>Choose category</label>

<select name="category" id="category"
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

          </div>

          <button
          className='border-[1px] border-[orange] p-[9px] bg-[#f7f4f4] mt-[73px]'
            onClick={submitBlog}
            >Upload blog</button>

            </div>



    </>
  )
}

export default CreateBlog