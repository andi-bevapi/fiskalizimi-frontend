import {
  Drawer,
  Fab,
  TextField,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState , useEffect } from 'react';

const useStyles = makeStyles(() => ({
  mainContainer: {
    width: '350px',
  },
  fieldContainer: {
    width: '50%',
    display: 'block',
    margin: '0 auto',
    padding: '10px',
  },
  submitButton: {
    width: '60%',
    marginLeft: '85px !important',
    marginTop: '50px !important',
  },
}));

const SidebarAction = (props) => {

//   useEffect(()=>{
//       const tmp = [];
//       props.data.map((formElement, index) => {
//         console.log("formElement------",formElement);
//           tmp.push(formElement);
//       });

//   },[])

  const classes = useStyles();
  const [fieldValue, setFieldValue] = useState([{ name: '', price: '', barcode: '', stock: '', category: '', imageVirtualPath: '' }]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.setState(!open);
  };
  
  const handleChanges = (e, index, key) => {
    //console.log('key----', e.target.value);
    setFieldValue((prevState) => {
        console.log('prevState----', prevState);
      prevState[index][key] = e.target.value;
      return [...prevState];
    });
    props.set((prevState)=>{
        console.log('fieldValue----', fieldValue);
        return [...prevState]
    });
  };

  const handleSubmitElement = (e) => {
    console.log('fieldValue-----', fieldValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('data-----', event);
  };

  console.log("props------",props);

  return (
    <>
      <TableHead>
        <Drawer anchor="left" open={props.open} onClose={toggleDrawer('left', !props.open)}>
        {props.data.map((formElement, index) => (
            <div key={index} id={formElement.id} className={classes.mainContainer}>
              {Object.keys(formElement).map((key, idx) => {
                  
                  console.log("formElement-------",formElement)
                if (key !== 'id') {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div key={idx} className={classes.fieldContainer}>
                                {key !== 'id' && <Typography>{key}</Typography>}
                                {key === 'imageVirtualPath' ? (
                                <TextField
                                    key={idx}
                                    id="standard-basic"
                                    label="Standard"
                                    variant="standard"
                                    onChange={(e) => {handleChanges(e, index, key)}}
                                    type="file"
                                />
                                ) : key === 'category' ? (
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="standard-basic"
                                        value={formElement[key]}
                                        label={formElement[key]}
                                        onChange={(e) => {handleChanges(e, index, key)}}
                                    >
                                        {props.categories.map((el,ind) => {
                                            return(
                                                <MenuItem key={ind} value={el.name}>{el.name}</MenuItem>
                                            )
                                        } )}
                                    </Select>
                                    ) 
                                : (
                                <TextField
                                    key={idx}
                                    value={formElement[key]}
                                    onChange={(e) => {handleChanges(e, index, key)}}
                                    inputProps={{ style: { padding: 12, width: 160, height: 10 } }}
                                />
                                )}
                            </div>
                        </form>
                    );
                }
              })}
                <Button
                    variant="contained"
                    className={classes.submitButton}
                    onClick={(e) => handleSubmitElement(e)}
                >
                    <FileUploadIcon />
                </Button>
            </div>
        ))}
        </Drawer>
      </TableHead>
    </>
  );
};

export {SidebarAction};