import IconButton from '@mui/material/IconButton';

const IconButtonComponent = (props) => {
  return (
    <IconButton
      sx={{ borderRadius: '50%', height: 35, width: 35, boxShadow: '0 0 14px 0 #e1e1e1', ...props.iconColor }}
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon}
    </IconButton>
  );
};

export default IconButtonComponent;
