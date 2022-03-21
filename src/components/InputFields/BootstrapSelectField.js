import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { makeStyles, withStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '14px',
    fontStyle: 'none',
    fontWeight: '700',
    color: '#797979',
  },
}));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    color: '#797979',
    fontSize: '14px',
  },
}))(MenuItem);

const BootstrapSelecter = (props) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl>
        <Select
          sx={{
            width: props.width,
            height: 40,
            mt: 1,
          }}
          className={classes.root}
          defaultValue={''}
          label="Branch"
          value={props.category}
          onChange={props.handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          IconComponent={KeyboardArrowDownIcon}
        >
          {!props.default && (
            <StyledMenuItem value={props.default}>
              <em>{props.default}</em>
            </StyledMenuItem>
          )}
          {!props.categories
            ? ''
            : props.categories.map((category, index) => (
                <StyledMenuItem key={index} value={category.id}>
                  {category.name}
                </StyledMenuItem>
              ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default BootstrapSelecter;
