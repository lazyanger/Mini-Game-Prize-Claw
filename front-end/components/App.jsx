import 'babel-polyfill';
import React from 'react';
import ClawCranes from './ClawCranes';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cranes: []
        };
    }
    componentWillMount() {
        let that = this;
        fetch('/api/claw-cranes').then((res) => {
            console.log(res);
            res.json().then((data) => {
                console.log(data);
                that.setState({ cranes: data.cranes });
            });
        });
    }
    render(){
        return(
            <div>
                <h1> Hello, welcome to our game! </h1>
                <ClawCranes cranes={this.state.cranes} />
            </div >
        );
    }
}

export default App;