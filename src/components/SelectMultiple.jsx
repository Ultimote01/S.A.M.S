import clsx from 'clsx';
import Select from 'react-select';



const baseOptions = [
  { value: 'English', label: 'English' },
  { value: 'Math II', label: 'Math II' },
  {value:'Artificial Intelligence', label: 'Artificial Intelligence'},
  {value: 'System Administration', label: 'System Administration'},
  {value: 'Computer Networking', label: 'Computer Networking'},
  {value: 'Logic Design', label: 'Logic Design'},
  {value: 'Operating System', label: 'Operating System'},
  {value: 'Cyber Security', label: 'Cyber Security'}
];


const customStyles = {
 
  control: (provided) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    '&:hover': { border: 'none' }
  }),


  valueContainer: (provided) => ({
    ...provided,
    maxHeight: '40px',      
    overflowY: 'auto',         
    
   
    '&::-webkit-scrollbar': {
      width: '4px',           
      display: 'none'         
    }
  })
};




export default function  SelectMultiple({id,selectedOptions,handleChange,className, courseOptions=[]}) {
 

     
  
  return (
          <Select
              className={clsx(className)}
              options={courseOptions.length > 0? courseOptions:baseOptions}
              value={selectedOptions}
              onChange={handleChange}
              isMulti={true} 
              styles={customStyles} 
              id={id}
          />
          
  )
}