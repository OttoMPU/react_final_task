import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Addtraining(props) {
 
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({date: '', duration: '', activity: '', customer: '' });

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        props.addTraining(training);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }



    return(
<div>
    <Button style={{marginLeft:"50%", marginTop:"3%", marginBottom:"1%"}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a training
    </Button>
      <Dialog open={open} disableBackdropClick={true}  onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="date"
            name="date"
            value= {training.date}
            onChange={inputChanged}
            label="Date"
            fullWidth
          />
        <TextField
            margin="dense"
            id="duration"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
          />
        <TextField
            margin="dense"
            id="activity"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
          />
        <TextField
            margin="dense"
            id="customer"
            name="customer"
            value={training.customer}
            onChange={inputChanged}
            label="Customer"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
</div>
    )
}