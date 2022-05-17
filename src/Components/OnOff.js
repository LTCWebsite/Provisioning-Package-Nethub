import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function OnOff({isCheck : check}) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Switch
        checked={state.checkedA}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </>
  )
}
