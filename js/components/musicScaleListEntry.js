import React from 'react';
import axios from 'axios';
import MusicScaleView from './musicScaleView';


export default class MusicscaleListEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: props.scale,
        };

        this.onClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.view(this.state.scale.id);
    };

    render() {
        let scale = this.state.scale;
        let isSelected = this.props.isSelected;
        return (
            <li 
                onClick={this.onClick} 
                className={'truncate ' + (isSelected ? 'selected' : '')}>
                {scale.names.join(', ')}
            </li>
        )
    }
}