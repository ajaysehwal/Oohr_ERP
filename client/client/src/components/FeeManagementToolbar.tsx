
import React from "react";
import Dialo
interface EnhancedTableToolbarProps {
    numSelected: number;
    selecteddata:any
  }

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected,selecteddata } = props;
    const [open, setOpen] = React.useState(false);
 
    const PaymenthandleOpen = () => setOpen(!open);
   
const [personName, setPersonName] = React.useState<string[]>([]);


const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const [selectedmonths, setSelectedmonths] = React.useState(null);



 
    return (
        <>
        
         <Dialog size='lg' open={open} handler={PaymenthandleOpen}>
        <DialogHeader>Payment</DialogHeader>
        <DialogBody>
        {/* {selecteddata.map((el:any)=>(
             <div>
                 {el.student_name}={el.student_id}
             </div>
            
        ))} */}
        <form action="">
           <div>

            <Input  color='blue'  label={<CurrencyRupeeIcon/>} placeholder='Amount' />
            <div className="container mx-auto mt-10">
      <label className="text-gray-700">Select Multiple Options:</label>
      <div className="flex flex-wrap mt-2">
        <CheckboxGroup value={selectedOptions}>
          {options.map((option) => (
            <label
              key={option}
              className={`mr-2 mb-2 cursor-pointer ${
                selectedOptions.includes(option) ? 'text-light-blue-500' : ''
              }`}
            >
              <Checkbox
                value={option}
                onChange={() => handleOptionToggle(option)}
                color="lightBlue"
                ripple="dark"
                size="sm"
              />
              {option}
            </label>
          ))}
        </CheckboxGroup>
      </div>
    </div>
           </div>
       
  
        </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={PaymenthandleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={PaymenthandleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
         Student selected 
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
             Student Fees Management
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip  title="Next">
            <IconButton onClick={PaymenthandleOpen}>
            <EastIcon/>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      </>
  
    );
  }
  