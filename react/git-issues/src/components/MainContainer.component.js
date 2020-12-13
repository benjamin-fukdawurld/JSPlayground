import React, { Component } from 'react';

import Menu from './Menu.component';

export default class MainContainer extends Component {
    render() {
        return <main className="mainContainer">
            <Menu owner={this.props.owner} repo={this.props.repo} />
            {JSON.stringify(this.props.issues, null, ' ')}
        </main>;
    }
}