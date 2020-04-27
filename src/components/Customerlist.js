import React, { useState, useEffect } from 'react'; //ei tarvitse kirjoittaa myöhemmin react.
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import * as moment from 'moment';

export default function Customerlist(){

    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);

    var moment = require('moment');
    moment().format();

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
        <ReactTable defaultPageSize={5} filterable={true} data={customers} columns={customercolumns} />
        <ReactTable defaultPageSize={5} filterable={true} data={trainings} columns={trainingcolumns} /> 
    </div>
   );
}