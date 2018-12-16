import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

interface MyMessageProps {
  message: string;
}

interface ThingProps {
  message: string;
}

function MyMessage({ message }: MyMessageProps) {
  return <div>MESSAGE: {message}</div>;
}

class App extends Component {

  state: any = {
    thing: ''
  };

  constructor(props: any) {
    super(props)
    console.log("app (constructor)");
    // Important to bind this to handleClick so this.setState in Promise will work
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("app.handleClick()")
    /**
     * Create a thing-server container and start it on port 1234.
     * 
     *    docker run -p 1234:3000 --name thing-server mitchallen/thing-server
     * 
     * If the container already exists (docker run give you an error), just restart it.
     * 
     *    docker start thing-server
     * 
     */
    const query = `http://localhost:1234/v1/things/1`;
    axios.get(query)
      .then(result => {
        let strJson = JSON.stringify(result.data)
        /**
         * It is important to bind this to handleClick in the constructor
         * 
         * this.handleClick = this.handleClick.bind(this);
         * 
         * Otherwise this.setState won't work.
         */
        this.setState({ thing: strJson })
        console.log(`RESULT:\n${strJson}`)
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <MyMessage message="Yo yo world!" />
          <button className='button' onClick={this.handleClick}>Click Me</button>
          <MyMessage message={this.state.thing} />
        </header>
      </div>
    );
  }
}

export default App;
