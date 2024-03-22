import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  Button, CardActionArea, CardActions } from '@mui/material';
import { Firebase } from '../../Context/ContextPage';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useNavigation } from 'react-router-dom';

type propsdata={
    title:string,
    content:string,
    imageUrl:string,
    createdBy:string,
    createdAt:number,
    id:string
}

export default function MultiActionAreaCard({title,content,imageUrl,createdBy,createdAt,id}:propsdata) {
    const { UserLogined,deleteDocument} = Firebase();
    // console.log(UserLogined.uid)
    const isEditable=UserLogined?.uid===createdBy;
    const nav=useNavigate()
   
  return (
    <Card 
    className='md:!mr-[72px] md:!w-[20vw] md:h-[45vh]  !w-[80%] ml-[50%] md:overflow-hidden '
    sx={{ margin:"10px",boxShadow: "5px 7px 8px 0px rgba(209,209,209,1)",overflow:"visible"
  }}>
      <CardActionArea> 
        <CardMedia
          component="img"
         
          image={imageUrl}
          alt="green iguana"
          sx={{
            height:"26vh",
            width:"100%",
            objectFit: "inherit"
          }}
        />
        <CardContent>
          <Typography 
          sx={{fontSize:"17px",
        fontWeight:"600"
        }}
          gutterBottom variant="h5" component="div">
           {title}
          </Typography>
         
        </CardContent>

      </CardActionArea>
      <p
      className='text-[15px] text-[gray]  break-words'
        
          >
{content?.slice(0,80)}{ content?.length>80?"....":" "  }
          </p>
      <CardActions>
       
        <div onClick={()=>{
            nav(`/edit/${id}`)
        }}>

      {isEditable&& <EditIcon sx={{
          height:"20px",
          width:"25px"
        }}
        
        />}
        </div>
        <div onClick={()=>{
           deleteDocument(id).then(()=>{
            console.log("deleted");
           })
           .catch(()=>console.log("error while deleting"))

        }}>

      {isEditable&& <DeleteIcon sx={{
          height:"20px",
          width:"25px",
          '&:hover':{
            cursor:"pointer"
          }
        }}
        
        />}
        </div>

        <div>

        </div>
      </CardActions>
    </Card>
  );
}