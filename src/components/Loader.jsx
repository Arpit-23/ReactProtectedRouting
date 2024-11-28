import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"30rem"}}><RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="0.75"
    width="96"
    visible={true}
  /></div>
  )
}

export default Loader