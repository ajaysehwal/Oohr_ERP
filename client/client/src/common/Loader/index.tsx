import Lottie from 'lottie-react';
import fetching from "../../assets/animations/animation_lmh9u48z.json";
const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};
export const Fetchdata=()=>{
  return (
    <div className="flex h-screen items-center justify-center bg-white" style={{width:'200px',margin:'auto'}}>
       <Lottie
          
          animationData={fetching} 
          loop={true} 
          autoplay={true}
        />
    </div>
  )
}
export default Loader;
