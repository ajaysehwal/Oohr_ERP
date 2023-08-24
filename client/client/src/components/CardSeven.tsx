const CardSeven = () => {
    return (
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* <div className="flex h-15.5 w-15.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"> */}
         
          {/* <svg
           className="fill-primary dark:fill-white"
           width="22"
           height="16"
           viewBox="0 0 22 16"
          
           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
   */}

   <p className="text-title-md font-bold text-black dark:text-white">2322</p>
        {/* </div> */}
  
        <div className="mt-4 flex items-end justify-between">
          <div>
            {/* <h4 className="text-title-md font-bold text-black dark:text-white">
              $3.456K
            </h4> */}
            <span className="text-sm font-medium">Total Parents</span>
            <p className="text-sm font-medium">Shows total number of parents by gender</p>

          </div>
          
  
          {/* <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
            0.43%
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          </span> */}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",textAlign:'center',marginTop:"10px",padding:'15px',border:'2px solid rgb(255,82,82)',borderRadius:"10px"}} >
                 <div>
                 <p className="text-xl font-medium text-black dark:text-white">0</p>
                 <p className="text-xl font-medium text-black dark:text-white">Male</p>

                 </div>
                 <div>
                 <p className="text-xl font-medium text-black dark:text-white">0</p>
                 <p className="text-xl font-medium text-black dark:text-white">Female</p>
                 </div>
                 <div>
                 <p className="text-xl font-medium text-black dark:text-white">0</p>
                 <p className="text-xl font-medium text-black dark:text-white">Other</p>
                 </div>
            </div>
      </div>
    );
  };
  
  export default CardSeven;
  