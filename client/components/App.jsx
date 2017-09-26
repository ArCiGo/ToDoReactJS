import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';

class Activity extends Component {

  state = {
    checked : false
  }

  updateCheck = (checked) => {
    this.setState((prevState) => {
      return {
        checked : !prevState.checked
      }
    })
  }

  render() {
    return(
      <ListItem leftCheckbox = { <Checkbox  onCheck = { this.updateCheck.bind(this) } /> } primaryText = {this.props.name} rightIconButton = { <FlatButton icon = { <ActionDelete /> } onClick = { () => {} } />} />
    );
  }
}

class ActivityList extends Component {
  render() {
    return(
      <MuiThemeProvider>
        <List>
          { this.props.activities.map((activity, id) => <Activity key = {id} name = {activity} activityId = {id} />) }
        </List>
      </MuiThemeProvider>
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
        <form onSubmit = {this.handleSubmit}>
          <TextField type = "text" value = { this.state.activity } onChange = {(event) => this.setState({ activity : event.target.value})} hintText="ToDo Activity"/>
          <FlatButton label="Add ToDo" type = "submit" />            
        </form>
      </MuiThemeProvider >
    );
  }
}

class App extends React.Component {
  state = {
    activities : []
  }

  addNewActivity = (activityInfo) => {
    this.setState(prevState => ({
      activities : prevState.activities.concat(activityInfo)
    }))
  }

  render() {
    return(
        <div>
          <Form onSubmit = {this.addNewActivity} />
          <br />
          <ActivityList activities = {this.state.activities} />
        </div>
    );
  }
}

export default App;