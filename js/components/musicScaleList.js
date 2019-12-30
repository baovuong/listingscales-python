import React from 'react';
import axios from 'axios';
import MusicScaleListEntry from './musicScaleListEntry';

export default class MusicScaleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scales: [],
            startingNote: '0',
            selectedScale: 0,
            query: '',
        };

        this.queryOnHold = '';
        this.timer = null;

        this.onViewScale = this.handleViewScale.bind(this);


    }

    componentDidMount() {
        axios.get('/api/scales?tones=12')
            .then(res => {
                const scales = res.data;
                scales.forEach(s => {
                    s.searchableNames = s.names
                        .map(n => n.toLowerCase())
                        .reduce((a, b) => a + b);
                });

                this.setState({scales});
            });
    }

    handleViewScale(id) {
        let scales = this.state.scales;
        let newScale = scales.filter(scale => scale.id == id)[0];

        this.setState({selectedScale: id});
        this.props.viewScale(newScale);
    }

    searchScales(query, scales) {
        
        if (query == '') {
            return scales;
        }
        query = query.toLowerCase();
        let results = scales
            .filter(s => s.searchableNames.indexOf(query) >= 0);
        return results;
    }

    render() {
        let scales = this.state.scales;
        let query = this.props.query;
        let selectedScale = this.props.selectedScale;
        return (
            <div>
                <ul id="results">
                    {this.searchScales(query, scales).map(scale => 
                        <MusicScaleListEntry 
                            key={scale.id} 
                            scale={scale} 
                            isSelected={selectedScale != null && selectedScale.id == scale.id} 
                            view={this.onViewScale} />)}
                </ul>
            </div>
        )
    }

}