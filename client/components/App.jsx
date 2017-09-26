import React, { Component } from 'react';

const Activity = (props) => {
  return(
    <div>
      {props.name}
    </div>
  );
};

const ActivityList = (props) => {
  return(
    <div>
      {props.activities.map((activity, id) => <Activity key = {id} name = {activity} />)}
    </div>
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
      <form onSubmit = {this.handleSubmit}>
        <input type = "text" 
              value = { this.state.activity } 
              onChange = {(event) => this.setState({ activity : event.target.value})} 
              placeholder = "ToDo Activity" />
        <button type = "submit">Add ToDo</button>
      </form>
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
        <ActivityList activities = {this.state.activities} />
      </div>
    );
  }
}

export default App;