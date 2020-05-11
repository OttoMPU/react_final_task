import React, { useState, useEffect } from 'react'; 
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';
import Addtraining from './Addtraining';


export default function Trainingslist(){

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

  
    useEffect(() => {
        getTrainings();
    }, [])

    const columnstyle = {
        marginLeft: "11%",
        textAlign: "center"
    }

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then(_ => getTrainings())              
        .then(_ => {
            setMsg('Training deleted');
            setOpen(true)
        })
        .catch(err => console.error(err))
        }
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST', 
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(training)
            }
        )
        .then(_ => getTrainings())
        .then(_ => {
            setMsg('New training added');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    } 


    const trainingcolumns = [
        {
         Header: 'Date',
         accessor: 'date',
         Cell: row => (moment(row.value).format('DD-MM-YYYY hh:mm:ss a'))
        },
        {
         Header: 'Duration (minutes)',
         accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer',
            accessor: 'customer.lastname'
        },
        {
            Cell: row => (<Button onClick={() => deleteTraining('https://customerrest.herokuapp.com/api/trainings/' + row.original.id )} > Delete </Button> )
        }
    ]

   return(
<div>

        <Addtraining addTraining={addTraining} />
        <ReactTable defaultPageSize={10} filterable={true} data={trainings} columns={trainingcolumns} style={columnstyle} />
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={msg}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
        />
</div>
   );
}