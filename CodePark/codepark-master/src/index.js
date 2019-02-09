import React from 'react';
import ReactDOM from 'react-dom';
import './styles/lato.css';
import './styles/aditya.css';
import './styles/shivank.css';
import Router from './components/route';
// import Login from './components/login';
import * as serviceWorker from './serviceWorker';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { loadReCaptcha } from 'react-recaptcha-google';
import $ from 'jquery';
// import FooterBar from './components/common/footerBar';



window.$ = $;
class App extends React.Component {
    componentDidMount() {
        loadReCaptcha();
    }

    render() {
        return (
            <div>
                <Router />
                {/* <FooterBar /> */}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
