import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';

const Activity = (props) => {
  return(
    <ListItem primaryText = {props.name} rightIconButton = { <FlatButton icon = { <ActionDelete /> } onClick = { ()=>{} } />} />
  );
};

const ActivityList = (props) => {
  return(
    <MuiThemeProvider>
      <List>
        { props.activities.map((activity, id) => <Activity key = {id} name = {activity} />) }
      </List>
    </MuiThemeProvider>
  );
};

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
          {/* <input type = "text" 
                value = { this.state.activity } 
                onChange = {(event) => this.setState({ activity : event.target.value})} 
                placeholder = "ToDo Activity" /> */}
                <TextField type = "text" value = { this.state.activity } onChange = {(event) => this.setState({ activity : event.target.value})} hintText="ToDo Activity"/>
          {/* <button type = "submit">Add ToDo</button> */}
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