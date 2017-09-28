import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import DoneAll from 'material-ui/svg-icons/action/done-all';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class Activity extends Component {

  /**To update the status of the Activity */
  update = (checked) => {
    this.props.updateStatusActivity(this.props.activityId);
  }

  /**To delete one Activity */
  delete = (activity) => {
    this.props.deleteActivity(this.props.activityId);
  }

  render() {
    return(
      <ListItem leftCheckbox = { <Checkbox checked = {this.props.status} onCheck = { this.update.bind(this) } /> } primaryText = {this.props.name} rightIconButton = { <FlatButton icon = { <ActionDelete /> } onClick = { this.delete.bind(this) } />} />
    );
  }
}

/**Enum with the statuses of the activities */
const filterEnum = {
  all : 0,
  active : 1,
  completed : 2
};

class ActivityList extends Component {
  state = {
    activities : [],
    selectAll : false,
    activitiesFiltered : [],            //saves the items by the filter enum
    currentFilter : filterEnum.all,     //returns all the activities
  }

  addNewActivity = (activityInfo) => {
    console.log("Entra");
    this.setState({
      activities : [...this.state.activities, { name : activityInfo, status : false, id : this.state.activities.length }],
      activitiesFiltered : [...this.state.activities, { name : activityInfo, status : false, id : this.state.activities.length }]     //copy of the original array
    }, () => this.filterActivites(this.state.currentFilter) )     //Shows all the items, because currentFilter is filterEnum.all
  };

  updateStatusActivity = (id) => {
    console.log(id);
    this.setState(prevState => ({
      activities : prevState.activities.map((activity, key) => {
        if(activity.id === id) {
          activity.status = activity.status ? false : true;
        }

        return activity
      })
    }), () => console.log(this.state.activities) )
  };

  deleteActivity = (id) => {
    console.log(id);
    this.setState(prevState => ({
      activities : prevState.activities.filter((activity, key) => {     //Deletes an activity of the original array
        return activity.id !== id;
      }), 
      activitiesFiltered : prevState.activitiesFiltered.filter((activity, key) => {     //Also deletes an activity of the copy array
        return activity.id !== id;
      })
    })) ;
  };

  updateAllActivities = () => {
    console.log("Actualiza todo");
    this.setState(prevState => ({
      activities : prevState.activities.map((activity, key) => {
        this.state.selectAll ? activity.status = false : activity.status = true;

        return activity
      }), selectAll : !prevState.selectAll,      //Deselects the activities, changing their status
      activitiesFiltered : prevState.activities.map((activity, key) => {        //Also I need to update the status of the activities in the copy
        this.state.selectAll ? activity.status = false : activity.status = true;

        return activity
      }), selectAll : !prevState.selectAll      //Deselects the activities, changing their status
    }))
  }

  filterActivites = (f) => {
    this.setState(prevState => ({
      activitiesFiltered : prevState.activities.filter((activity, key) => {
       
        switch(f) {
          case filterEnum.active:
            return !activity.status ? true : false;
          break;
          case filterEnum.completed:
            return activity.status ? true : false;
          break;
          case filterEnum.all:
            return true;
        }

      }), currentFilter : f     //If I add a new item, independiently of the view (if I'm watching the completed, active or all), I don't change the current view. 
    }))  
  }

  deleteDoneActivities = () => {
    console.log("bORRA todo");
    this.setState(prevState => ({
      activities : prevState.activities.filter((activity, key) => {     //Deletes an activity of the original array
        return !activity.status ;
      }), 
      activitiesFiltered : prevState.activitiesFiltered.filter((activity, key) => {     //Also deletes an activity of the copy array
        return !activity.status ;
      })
    })) ;
  };

  render() {
    return(
      <div>
        <Form onSubmit = { this.addNewActivity } updateAllActivities = { this.updateAllActivities} />
        <br />
        <MuiThemeProvider>
          <List>
            { this.state.activitiesFiltered.map((activity, id) => <Activity key = {id} activityId = { activity.id } status = { activity.status } updateStatusActivity = {this.updateStatusActivity} name = { activity.name } deleteActivity = { this.deleteActivity } />) }
          </List>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Toolbar>
            <ToolbarGroup firstChild = { true } >
              <FlatButton label = {this.state.activities.length} />
            </ToolbarGroup>
            <ToolbarGroup>
              <FlatButton label = "All" onClick = { () => this.filterActivites(filterEnum.all) } />
              <FlatButton label = "Active" onClick = { () => this.filterActivites(filterEnum.active) } />
              <FlatButton label = "Completed" onClick = { () => this.filterActivites(filterEnum.completed) } />
              <FlatButton label = "Remove Done" onClick = { () => this.deleteDoneActivities() } />
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
      </div>
    );
  }
}

class Form extends Component {
  state = {
    activity : ''
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.activity);
    this.setState( {activity : ''} )
  };

  render() {
    return(
      <MuiThemeProvider>
        <form onSubmit = { this.handleSubmit }>
          <FlatButton icon = { <DoneAll /> } onClick = { this.props.updateAllActivities } />
          <TextField type = "text" value = { this.state.activity } onChange = { (event) => this.setState({ activity : event.target.value }) } hintText="ToDo Activity"/>
          <FlatButton label="Add ToDo" type = "submit" />            
        </form>

      </MuiThemeProvider >
    );
  }
}

class App extends React.Component {
  render() {
    return(
      <ActivityList />
    );
  }
}

export default App;