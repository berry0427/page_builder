import './App.css';

import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import TextBuilder from './pages/TextBuilder';

function App() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open TextBuilder Dialog
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
      >
        <TextBuilder />
      </Dialog>
    </React.Fragment>
  );
}

export default App;
