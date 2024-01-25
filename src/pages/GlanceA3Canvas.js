import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';





const A3Canvas=(props) => {
  
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '55ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <div>
        
        <TextField 
          id="filled-multiline-static"
          label="1 PROBLEM STATEMENT"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
          
        />
        <TextField
          id="filled-multiline-static"
          label="5 DECISION"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="2 CURRENT STATE"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="6 IMPLEMENTATION PLAN"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="3 FUTIRE STATE"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="7 VALUE DELIVERY"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="4 SOLUTION EVALUATION"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="8 LESSONS LEARNED"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
        />
      </div>
      
    </Box>
  );
}

export default A3Canvas;
