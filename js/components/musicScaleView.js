import React from 'react';
import Vex from 'vexflow';
import StandardNotationDisplay from './standardNotationDisplay';

export default class MusicScaleView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let scale = this.props.scale;
        let startingNote = this.props.startingNote;
        let useFlats = this.props.useFlats;
        return (
            <div style={{height: scale == null ? '149px' : 'auto'}}>
                {/* <div id={'scaleNotation'}>
                </div> */}

                <StandardNotationDisplay 
                    scale={scale} 
                    startingNote={startingNote}
                    useFlats={useFlats} />

                {scale != null ? (
                    <div id="scaleNames">
                        <ul className="desktop">
                            {scale.names.map((name, index) => 
                                <li key={index}>{name}</li>)}
                        </ul>
                        <div className="mobile">
                            {scale.names.join(', ')}
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }
}