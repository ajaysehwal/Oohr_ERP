import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default function Headcomponent({heading}:{heading:any}) {
  return (
    <>  
 <div className='bg-blue-500 w-full p-3 text-white flex align-middle gap-2'>
 <AddCircleOutlineIcon/> <p>{heading}</p>
</div>
</>
  )
}
