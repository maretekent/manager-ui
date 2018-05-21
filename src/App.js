import React, {Component} from 'react';
import ReactDOM from 'react-dom';
require('./assets/css/styles.css');
import keenImage from './assets/images/keen.png';

class App extends Component {

    render() {

        return (
            <div>

                <h1> Hello World! </h1>
                <img src={ keenImage } alt='Commander Keen'/>
            </div>
        );

    }
}

ReactDOM.render(<App />, document.getElementById('root'));