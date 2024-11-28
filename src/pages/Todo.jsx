import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import ListIcon from "@mui/icons-material/List";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/userAuthContext";
import TodoItem from "../components/TodoItem";
import Loader from "../components/Loader";

const Todo = () => {
  const [value, setValue] = useState(0);
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const { addTodo, getTodo, triger ,loading} = useUserAuth();
  console.log(value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todo);
    if(todo.trim().length!=0){
      addTodo(todo.trim());
    }
    setTodo("");
  };

  useEffect( () => {
    async function todoG(params) {
        const items = await getTodo();
        setData(items);
        console.log(items);
        console.log(data);
    }
    console.log("first")
    
      todoG();
    
  }, [triger]);

  return (
    <>
      <Box>
        <Typography variant="h3" textAlign={"center"}>
          TODO APP
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
            gap: "2rem",
          }}
        >
          <TextField
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            placeholder="Enter todo here"
            variant="standard"
            textAlign={"center"}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            width: 500,
            margin: "auto",
            marginTop: "3rem",
          }}
        >
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab icon={<ListIcon />} label="All Tasks" />
              <Tab icon={<PlaylistAddCheckIcon />} label="Completed" />
              <Tab icon={<PendingActionsIcon />} label="Incompleted" />
            </Tabs>
          </AppBar>
          
          {loading ? <Loader /> :<Box>
          <Typography
            variant="p"
            sx={
              value !== 0
                ? { display: "none" }
                : { display: "flex", flexDirection: "column" }
            }
          >
            {data.length==0 ? <Typography variant="p" textAlign={"center"} sx={{height:"30rem"}}>Todo not available</Typography> :data.map((val) => (
              <TodoItem key={val.id} data={val} />
            ))}
          </Typography>
          <Typography
            variant="p"
            sx={value !== 1  ? { display: "none" } : { display: "block" }}
          >
            {data.length==0 ? <Typography variant="p" textAlign={"center"} sx={{height:"30rem"}}>No Completed todo available</Typography>:data.map((val) => {
              if (val.completed) return <TodoItem key={val.id} data={val} />;
            })}
          </Typography>
          <Typography
            variant="p"
            sx={value !== 2 ? { display: "none" } : { display: "block" }}
          >
            {data.length==0 ? <Typography variant="p" textAlign={"center"}  sx={{height:"30rem"}}>No Uncompleted todo available</Typography> :data.map((val) => {
              if (!val.completed) return <TodoItem key={val.id} data={val} />;
            })}
          </Typography>
          </Box>
          }
        </Box>
      </Box>
    </>
  );
};

export default Todo;
