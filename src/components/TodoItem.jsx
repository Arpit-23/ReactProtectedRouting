import { CheckBox } from "@mui/icons-material";
import { Box, Button, Checkbox, Hidden, Typography } from "@mui/material";
import React, { useState } from "react";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserAuth } from "../context/userAuthContext";

const TodoItem = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const { updateTodo, deleteTodo,loader } = useUserAuth();
  const handleCheckBox = async () => {
    await updateTodo(data.id, data.completed ? false : true);
  };
  const deleteHandler = async () =>{
    await deleteTodo(data.id);
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Checkbox
        checked={data.completed}
        sx={{ display: "inline", width: "2rem" }}
        size="large"
        onClick={handleCheckBox}
      />
      <Typography
        variant="span"
        alignContent={"center"}
        width={200}
        maxWidth={200}
      >
        <Typography width={150} sx={{wordWrap:"break-word",overflowWrap:"break-word"}}>
          {data.name.length <15 ? data.name :showMore ? data.name : data.name.substring(0, 15) + "..." }
        </Typography>
        {
       (data.name.length >15 && <Typography variant="p" color="green" sx={{cursor:"pointer"}} onClick={()=>setShowMore((prev) =>!prev)}>
          {showMore ? "Show less" : "Show more"}
        </Typography>) 
        }
      </Typography>
      <DeleteIcon fontSize="large" sx={{cursor:"pointer"}} onClick={deleteHandler}/>
    </Box>
  );
};

export default TodoItem;
