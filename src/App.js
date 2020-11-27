import React from 'react';
import './App.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist'
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';



function App() {

  const theme = useTheme();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  

  const handleDrawerOpen = () => {

    setOpen(true);

  };

 

  const handleDrawerClose = () => {

    setOpen(false);

  };

 

  return (

    <div className={classes.root}>

      <CssBaseline />

      <AppBar position="fixed"

              className={clsx(classes.appBar, {

                [classes.appBarShift]: open,

              })} >

        <Toolbar>

          <IconButton

            color="inherit"

            aria-label="open drawer"

            onClick={handleDrawerOpen}

            edge="start" >

            <MenuIcon />

          </IconButton>

          <Typography variant="h6" noWrap>

            PersonalTrainer

          </Typography>

        </Toolbar>

      </AppBar>

      <Drawer

        variant="persistent"

        anchor="left"

        open={open}

      >

        <div>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => setValue(0)} >
            <ListItemIcon><AccountBoxIcon /></ListItemIcon>
            <ListItemText primary='Customers' />
          </ListItem>

          <ListItem button onClick={() => setValue(1)}>

            <ListItemIcon><DirectionsRunIcon /></ListItemIcon>

            <ListItemText primary='Trainings' />

          </ListItem>

        </List>

      </Drawer>

      <div 

          className={clsx(classes.content, {

          [classes.contentShift]: open,

        })}>

      {

        value === 0 ? (
          <Customerlist/>
        ) : 
        (
          <Trainingslist/>
        )

      }
      </div>
    </div>
  );

}

 

const drawerWidth = 240;

 

const useStyles = makeStyles(theme => ({

  root: {

    display: 'flex',

  },

  appBar: {

    transition: theme.transitions.create(['margin', 'width'], {

      easing: theme.transitions.easing.sharp,

      duration: theme.transitions.duration.leavingScreen,

    }),

  },

  appBarShift: {

    width: `calc(100% - ${drawerWidth}px)`,

    marginLeft: drawerWidth,

    transition: theme.transitions.create(['margin', 'width'], {

      easing: theme.transitions.easing.easeOut,

      duration: theme.transitions.duration.enteringScreen,

    }),

  },

  menuButton: {

    marginRight: theme.spacing(2),

  },

  hide: {

    display: 'none',

  },

  drawer: {

    width: drawerWidth,

    flexShrink: 0,

  },

  drawerPaper: {

    width: drawerWidth,

  },

  drawerHeader: {

    display: 'flex',

    alignItems: 'center',

    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,

    justifyContent: 'flex-end',

  },

  content: {

    flexGrow: 1,

    padding: theme.spacing(3),

    transition: theme.transitions.create('margin', {

      easing: theme.transitions.easing.sharp,

      duration: theme.transitions.duration.leavingScreen,

    }),

    marginLeft: -drawerWidth,

  },

  contentShift: {

    transition: theme.transitions.create('margin', {

      easing: theme.transitions.easing.easeOut,

      duration: theme.transitions.duration.enteringScreen,

    }),

    marginLeft: 0,

  },

}));

 

export default App;