import { Drawer, Fab ,TextField ,TableHead, TableCell ,TableRow ,Typography} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";


const useStyles = makeStyles(() => ({
    mainContainer :{
        width : "350px"
    },
    fieldContainer:{
        width:"50%",
        display:"block",
        margin:"0 auto",
        padding:"10px"
    },
    submitButton:{
        width:"60%",
        marginLeft:"85px !important",
        marginTop: "50px !important"

    }
  }));

const SidebarACtion = (props) => {
    const classes = useStyles();
   
    //console.log("props-----",...props.data);
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        props.setState(!open);
        props.element({id:0})
    };

    const handleSubmitElement = (e) => {

    }

    return(
        <>
           <TableHead>
               <Drawer anchor="left" open={props.open} onClose={toggleDrawer('left', !props.open)}>
                 {props.data.map((formElement, index) => (
                        <div
                            key={index}
                            id={formElement.id}
                            className={classes.mainContainer}
                        >
                            {Object.keys(formElement).map((key, idx) => {
                                if(key !== 'id'){
                                return(
                                    <div key={idx} className={classes.fieldContainer}>
                                        {key !== 'id' && <Typography>{key}</Typography>}
                                        {key === 'imageVirtualPath' ? (
                                        <img src={formElement[key]}/>
                                        ) : (
                                        <TextField
                                            key={idx}
                                            value={formElement[key]}
                                            onChange={(e) => {
                                            handleChanges(e, index, key);
                                            }}
                                            inputProps={{ style: { padding: 12, width: 160, height: 10 } }}
                                        />
                                        )}
                                   </div>
                                )}
                            })}
                        </div>
                    ))}
                    <Button variant="contained" className={classes.submitButton} onClick={(e) => handleSubmitElement(e)} >
                        <CheckIcon/> 
                    </Button>
                </Drawer>
           </TableHead>
        </>
    )
}

export {SidebarACtion};