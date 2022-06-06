import React from 'react';
import { CardMedia, Divider, Card, CardContent, Typography, CardActions } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import IconButtonComponent from '../../components/Button/IconButton';
import { makeStyles } from '@mui/styles';
import { useModel } from 'umi';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '10px 5px 0 3px',
    width: '90%',
    boxShadow: 'none',
    border: '1px solid #ebeff2',
    borderRadius: '10px',
    backgroundSize: 'cover',
    backgroundColor: 'rgb(116, 161, 158, 0.35)',
    marginLeft: '0%',
    '&:hover': {
      transition: 'transform 0.2s ease-in-out',
      transform: 'scale(1.05)',
      cursor: 'pointer',
    },
    marginBottom: '5px',
  },
  cardContent: {
    padding: '5px',
    textAlign: 'end',
    marginTop: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  cardActions: {
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: '60px',
  },
  divider: {
    border: '1px solid #74a19e',
    margin: '2px 2px 2px auto',
    width: '60%',
  },
  bottomDivider: {
    border: '1px solid #74a19e',
    margin: '4px 2px 2px auto',
    width: '100%',
  },
  nameTxt: {
    float: 'right',
    fontWeight: '700',
    fontFamily: 'POPPINS',
  },
}));

const ClientCard = (props) => {
  const classes = useStyles();
  const { refresh } = useModel('@@initialState');

  const handleCardClick = () => {
    localStorage.setItem('clientId', props.client.id);
    refresh();
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        alt={props.client.name}
        image={
          props.client.logoVirtualPath
            ? props.client.logoVirtualPath
            : 'https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg'
        }
        style={{
          width: 90,
          height: 90,
          margin: 'auto',
          marginLeft: 5,
          marginTop: -2,
          borderRadius: '50%',
        }}
      />
      <CardContent className={classes.cardContent}>
        <div
          style={{
            width: '100%',
            marginTop: '-10%',
            marginBottom: '5%',
          }}
        >
          <Typography variant="body2" color="text.secondary" className={classes.nameTxt}>
            {props.client.name}
          </Typography>
        </div>

        <Typography variant="body">{props.client.address}</Typography>
        <Typography variant="body">{props.client.email}</Typography>
        <Typography variant="body">{props.client.phoneNumber}</Typography>
        <Divider className={classes.bottomDivider} />
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButtonComponent
          style={{
            backgroundColor: '#74a19e',
            marginRight: '10px',
          }}
          icon={<ManageAccountsIcon />}
          iconColor={{ color: 'white' }}
          onClick={handleCardClick}
          text="Menaxho klientin"
        />
        <IconButtonComponent
          style={{
            backgroundColor: '#ffa500',
            marginRight: '10px',
          }}
          icon={<EditIcon />}
          iconColor={{ color: 'white' }}
          onClick={() => props.onEdit(props.client.id)}
          text="Perditeso"
        />

        <IconButtonComponent
          style={{
            backgroundColor: '#f05050',
            marginRight: '10px',
          }}
          icon={<DeleteForeverIcon />}
          iconColor={{ color: 'white' }}
          onClick={() => props.onDelete(props.client.id)}
          text="Fshi"
        />
      </CardActions>
    </Card>
  );
};

export default ClientCard;
