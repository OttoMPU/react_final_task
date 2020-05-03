import React, { useState, useEffect } from 'react'; //ei tarvitse kirjoittaa myöhemmin react.
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';

export default function Customerlist(){

    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    var moment = require('moment');

    useEffect(() => {
        getCustomers();
        getTrainings();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then(_ => getCustomers())              
        .then(_ => {
            setMsg('Customer deleted');
            setOpen(true)
        })
        .catch(err => console.error(err))
        }
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST', 
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(customer)
            }
        )
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('New customer added');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => {
            setMsg('Customer updated');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }


    const customercolumns = [
        {
         Header: 'First Name',
         accessor: 'firstname'   
        },
        {
         Header: 'Last Name',
         accessor: 'lastname'
        },
        {
            Header: 'Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Post code',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone number',
            accessor: 'phone'
        },
        {
            Cell: row => (<Editcustomer customer={row.original} updateCustomer={updateCustomer} />)
        },
        {
            Cell: row => (<Button onClick={() => deleteCustomer(row.original.links[0].href)} > Delete </Button> )
        }
    ]

    const trainingcolumns = [
        {
         id: 'updated_at',
         Header: 'Date',
         accessor: d => {
             return moment(d.updated_at)
             .local()
             .format('DD-MM-YYYY hh:mm:ss a')
         } 
        },  
        {
         Header: 'Duration (minutes)',
         accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        }
    ]

   return(
    <div>
        <Addcustomer addCustomer={addCustomer}/>
        <ReactTable defaultPageSize={5} filterable={true} data={customers} columns={customercolumns} />
        <ReactTable defaultPageSize={5} filterable={true} data={trainings} columns={trainingcolumns} />
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