import React from 'react';
import { Register } from './Register';
import '../styles/Main.css';

export class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Register/>
            </div>
        );
    }
}