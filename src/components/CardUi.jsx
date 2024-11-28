import React from "react";
import { Grid2 } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from "react-router-dom";

const CardUi = ({name,url,id,go}) => {
  const navigate = useNavigate();

  function handleClick(){
    if(id==6){
      navigate("../todo-app");
    }
    else{
      window.location.replace(go);
    }
  }
  return (
    <>
      <Grid2 item size={4} justifyContent={"center"} onClick={handleClick}>
        <Card sx={{ maxWidth: 345,padding:3,minWidth: 100 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={url}
              alt="green iguana"
              sx={{width:"15rem ",margin:"auto"}}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
                {name}
              </Typography>
              
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid2>
    </>
  );
};

export default CardUi;
