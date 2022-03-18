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
import { Snackbar } from '@mui/material';

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

  const classes = useStyles();
  const [fieldValue, setFieldValue] = useState([{ name: '', price: '', barcode: '', stock: '', category: '', imageVirtualPath: '' }]);
  const [openSnackBar, setOpenSnackBar] = useState({status:false,message:""});

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.setState(!open);
  };
  
  const handleChanges = (e, index,key,id) => {
    setFieldValue((prevState) => {
      prevState[index][key] = e.target.value;
      //props.data[index][key] = e.target.value;
      return [...prevState];
    });

    props.set((prevState) =>{
      const filterData = prevState.filter(el => el.id === id );
      filterData[index][key] = e.target.value;
      return [...filterData];
    })
  };

  const handleSubmitElement = async(e) => {
    const updateProduct =  await props.update(props.data);
      setOpenSnackBar({status:true , message:updateProduct.message});
      return updateProduct ;
  }


  const handleSnackBarClose = () =>{
    props.setState(false);
    setOpenSnackBar({status:false});
  }

  // console.log("props--in SidebarAction--",props.headers);

  return (
    <> 
      <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            message={openSnackBar.message}
            open={openSnackBar.status}
            autoHideDuration={8000}
            onClose={handleSnackBarClose}
        ></Snackbar>
      <TableHead>
        <Drawer anchor="left" open={props.open} onClose={toggleDrawer('left', !props.open)}>

          {
            props.onCreate === "onCreate" ?
            props.headers.map((formElement, index) => (
              <div key={index} id={formElement.id} className={classes.mainContainer}>
                    <TextField
                      key={index}
                      id="standard-basic"
                      label="Standard"
                      variant="standard"
                      onChange={(e) => {handleChanges()}}
                      type="text"
                  />
              </div>
            )
            )
            
            :
            props.data.map((formElement, index) => (
            <div key={index} id={formElement.id} className={classes.mainContainer}>
              {Object.keys(formElement).map((key, idx) => {
                if (key !== 'id' && key !== "branchId") {
                    return (
                        <form>
                            <div key={idx} className={classes.fieldContainer}>
                                {key !== 'id' && <Typography>{key}</Typography>}
                                {key === 'imageVirtualPath' ? (
                                <TextField
                                    key={idx}
                                    id="standard-basic"
                                    label="Standard"
                                    variant="standard"
                                    onChange={(e) => {handleChanges(e, index, key , formElement.id)}}
                                    type="file"
                                />
                                ) : key === 'category' ? (
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="standard-basic"
                                        value={formElement[key]}
                                        label={formElement[key]}
                                        onChange={(e) => {handleChanges(e, index, key , formElement.id)}}
                                    >
                                        {props.categories.map((el,ind) => {
                                            return(
                                                <MenuItem key={ind} value={el.id}>{el.name}</MenuItem>
                                            )
                                        } )}
                                    </Select>
                                    ) 
                                : (
                                <TextField
                                    key={idx}
                                    value={formElement[key]}
                                    onChange={(e) => {handleChanges(e, index, key , formElement.id)}}
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
                  Ruaj 
                </Button>
            </div>
            ))
          }
        </Drawer>
      </TableHead>
    </>
  );
};

export {SidebarAction};