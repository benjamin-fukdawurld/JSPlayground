import React, { Component } from 'react';

import Axios from 'axios';

import Header from './Header.component';
import MainContainer from './MainContainer.component';

Axios.defaults.headers.common["Accept"] = "application/vnd.github.v3+json";

export default class Application extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repo: null,
            issues: []
        };
    }

    componentDidMount() {
        Axios.get(`https://api.github.com/repos/${this.props.owner}/${this.props.repo}`)
            .then(res => {
                this.setState({ repo: res.data });
            })
            .catch(res => {
                console.log(res);
            });

        Axios.get(`https://api.github.com/repos/${this.props.owner}/${this.props.repo}/issues`)
            .then(res => {
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
                repo={this.state.repo}
                issues={this.state.issues}
            />
        </div>
    }
}