import IconButton from '@mui/material/IconButton';

const IconButtonComponent = (props) => {
  return (
    <IconButton
      sx={{ borderRadius: 50, height: '31px', padding: '7px 9px 2px 9px', boxShadow: '0 0 14px 0 #e1e1e1' }}
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div style={props.iconColor}>{props.icon}</div>
    </IconButton>
  );
};

export default IconButtonComponent;
