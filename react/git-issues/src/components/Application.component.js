import React, { Component } from 'react';

import Axios from 'axios';

import Header from './Header.component';
import MainContainer from './MainContainer.component';


export default class Application extends Component {
    constructor(props) {
        super(props)
        this.state = {
            issues: []
        };
    }

    componentDidMount() {
        Axios.get(`https://api.github.com/repos/${this.props.owner}/${this.props.repo}/issues`)
            .then(res => {
                console.log(res.data);
                this.setState({ issues: res.data });
            })
            .catch(res => {
                console.log(res);
            });
    }

    render() {
        return <div
            className="Application"
        >
            <Header />
            <MainContainer
                owner={this.props.owner}
                repo={this.props.repo}
                issues={this.state.issues}
            />
        </div>
    }
}