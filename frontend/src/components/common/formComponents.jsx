


import { TextField } from "@material-ui/core"



export const TextInputField = ({name,state,errors,onChange, ...rest})=>{
  // const {data,errors} = state;
   let label = name.charAt(0).toUpperCase()+name.slice(1);
    return (
        <TextField id={label}
        label={label}
        name={name}
         variant='outlined' 
         size="small"
         fullWidth
          value={state[name]}
           error={errors[name]?true:false}
            helperText={errors[name]?errors[name]:null}
             onChange={onChange}
             {...rest}
             />
    );
};