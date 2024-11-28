import React from 'react'
import Dashboard from '../components/Dashboard'
import { Grid2 } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { data } from '../constants/data';
import CardUi from '../components/CardUi';

const Home = () => {
  return (
    <>
      <Grid2 container spacing={3} rowSpacing={3} columnSpacing={3} gridColumn={3} direction="row" padding={3} justifyContent={'center'} alignItems={'center'}>
        {data.map((val,i) => <CardUi key={i} name={val.name} url={val.url} id={val.id} go={val.go}/>)}
      </Grid2>
    </>
  )
}

export default Home