import { Typography, FormControlLabel, Checkbox, Grid, Container } from "@mui/material";
import { fontFamily, grid, margin, width } from "@mui/system";
import { FormControl } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { MenuItem } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import ButtonComponent from "../../components/Button/InvoiceButton";



const handleChange = (event) => {
    //handle printer name selection
};

const Configurations = () => {

    return (
        <span> <h1 align="left">  Konfigurime </h1>
            <Grid container >
                
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography
                            style={{
                                fontSize: "18px",
                                fontFamily: "Poppins",
                                margin: '40px auto 20px 10px',
                                textAlign: "left"
                            }}
                        > Zgjidh konfigurime per shitjet</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} paddingLeft={1} style={{ textAlign: 'left' }}>
                        <FormControlLabel control={<Checkbox defaultChecked sx={{
                            color: '#666666',
                            '&.Mui-checked': {
                                color: '#17625D',
                            },

                            paddingLeft: '10px'
                        }}
                        />} label={
                            <Typography sx={{
                                fontSize: '15px',
                                fontFamily: 'poppins',
                                paddingLeft: '12px'
                            }}>
                                Lejo shitje me çmim 0
                            </Typography>
                        } />
                    </Grid>
                    {/* <Grid item xs={12} md={6} style={{ textAlign: 'left' }}>
                    <FormControlLabel control={<Checkbox defaultChecked sx={{
                        color: '#666666',
                        '&.Mui-checked': {
                            color: '#17625D',
                        },
                    }} />} label={
                        <Typography sx={{
                            fontSize: '15px',
                            fontFamily: 'poppins'
                        }}>
                            Çmimet përmbajnë TVSH
                        </Typography>
                    } />
                </Grid> */}
                
            </Grid>


            <Grid container >

                <Grid container xs={12} sm={6} md={6} display={'block'}>
                    <Grid item >
                        <Typography
                            style={{
                                fontSize: "18px",
                                fontFamily: "Poppins",
                                margin: '40px auto 20px 10px',
                                textAlign: "left"
                            }}
                        > Zgjidh printerin </Typography>
                    </Grid>
                    <Grid item>
                        <Box sx={{ minWidth: 120, paddingLeft: 1, paddingRight: 10 }}>
                            <FormControl fullWidth>
                                <InputLabel id="printerName" minWidth="200px" style={{
                                    fontSize: "14px",
                                    fontFamily: "poppins",
                                    background: 'white',
                                }}
                                >Emri i printerit &nbsp; </InputLabel>
                                <Select
                                    labelId="chosenNamePrinter"
                                    id="chosenPrinter"
                                    //value={name}
                                    style={{ fontFamily: 'Poppins' }}
                                    label="Name"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10} style={{
                                        fontSize: "14px",
                                        fontFamily: "Poppins"
                                    }}>Emri 1</MenuItem>
                                    <MenuItem value={20} style={{
                                        fontSize: "14px",
                                        fontFamily: "Poppins"
                                    }}>Emri 2</MenuItem>
                                    <MenuItem value={30} style={{
                                        fontSize: "14px",
                                        fontFamily: "Poppins"
                                    }}>Emri 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container xs={12} sm={6} md={6} display={'block'}>
                    <Grid item>
                        <Typography
                            style={{
                                fontSize: "18px",
                                fontFamily: "Poppins",
                                margin: '40px auto 20px 10px',
                                textAlign: "left"
                            }}
                        > Zgjidh gjuhën e përdorimit </Typography>
                    </Grid>
                    <Grid item>
                        <Box sx={{ minWidth: 120, paddingLeft: 1, paddingRight: 12 }} >
                            <FormControl fullWidth>
                                <InputLabel id="language" minWidth="200px" style={{
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                    background: 'white',
                                }}
                                >Gjuha e perdorimit &nbsp; </InputLabel>
                                <Select
                                    labelId="chosenNamePrinter"
                                    id="chosenPrinter"
                                    //value={name}
                                    label="Name"
                                    onChange={handleChange}
                                    style={{ fontFamily: 'Poppins' }}
                                >
                                    <MenuItem value={10} style={{
                                        fontSize: "14px",
                                        fontFamily: "Poppins"
                                    }}>Shqip</MenuItem>
                                    <MenuItem value={20} style={{
                                        fontSize: "14px",
                                        fontFamily: "Poppins"
                                    }}>Anglisht</MenuItem>

                                </Select>
                            </FormControl>
                        </Box>

                    </Grid>
                </Grid>
            </Grid>

            <Grid container justifyContent="flex-end" marginTop={8} marginRight={10}>
                <Grid item xs={12} sm={12} md={3} style={{ display: 'block' }}>
                    <ButtonComponent
                        title="RUAJ"
                        lightColor="#FF7A00"
                        //addIcon={false}
                        //onClick={}
                        width={120}
                        height={40}
                    />
                </Grid>
            </Grid>


        </span>
    );
};

export default Configurations;