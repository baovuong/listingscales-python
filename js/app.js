import React from 'react';
import ReactDOM from 'react-dom';
import MusicScaleList from './components/musicScaleList';
import MusicScaleView from './components/musicScaleView';

import '../sass/main.scss';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedScale: null,
            query: '',
            useFlats: false,
            startingNote: 0
        };

        this.queryOnHold = '';
        this.timer = null;

        this.onViewScale = this.viewScale.bind(this);
        this.onQueryInput = this.handleQueryInput.bind(this);
        this.onTimeout = this.handleTimeout.bind(this);
        this.onPreferredAccdientalClick = this.handlePreferredAccidentalClick.bind(this);
        this.onChangeStartingNote = this.handleChangeStartingNote.bind(this);

    }

    viewScale(scale) {
        this.setState({selectedScale: scale});
    }

    handleQueryInput(e) {
        this.queryOnHold = e.target.value;
        this.timer = setTimeout(this.onTimeout, this.isMobile() ? 800 : 300);
    }

    handleTimeout() {
        clearTimeout(this.timer);
        this.setState({query: this.queryOnHold});
    }

    handlePreferredAccidentalClick(e) {
        this.setState({useFlats: e.target.checked});
    }

    handleChangeStartingNote(e) {
        this.setState({startingNote: parseInt(e.target.value)});
    }

    render() {
        let selectedScale = this.state.selectedScale;
        let query = this.state.query;
        let useFlats = this.state.useFlats;
        let startingNote = this.state.startingNote;

        return (
        <div id="app">
            <div id="controls">
                <div id="query">
                    <input type="text" placeholder="search..." onInput={this.onQueryInput} />
                </div>
                <div className="dropDown">
                    <select 
                        value={startingNote}
                        onChange={this.onChangeStartingNote}>

                        <option value="0">C</option>
                        <option value="1">C&#9839;/D&#9837;</option>
                        <option value="2">D</option>
                        <option value="3">D&#9839;/E&#9837;</option>
                        <option value="4">E</option>
                        <option value="5">F</option>
                        <option value="6">F&#9839;/G&#9837;</option>
                        <option value="7">G</option>
                        <option value="8">G&#9839;/A&#9837;</option>
                        <option value="9">A</option>
                        <option value="10">A&#9839;/B&#9837;</option>
                        <option value="11">B</option>
                    </select>
                </div>
                <div>
                    <div className="switch large">
                        <input 
                            className="switch-input" 
                            id="preferred-accidental" 
                            type="checkbox" 
                            name="preferredAccidental" 
                            onClick={this.onPreferredAccdientalClick} />
                        <label className="switch-paddle" htmlFor="preferred-accidental">
                            <span className="show-for-sr">Preferred Accidental</span>
                            <span className="switch-active" aria-hidden="true">&#9837;</span>
                            <span className="switch-inactive" aria-hidden="true">&#9839;</span>
                        </label>
                    </div>
                </div>
            </div>
            <div id="container">
                <div id="musicScaleList">
                    <MusicScaleList 
                        viewScale={this.onViewScale} 
                        query={query}
                        selectedScale={selectedScale} />
                </div>
                <div id="musicScaleView">
                    <MusicScaleView 
                        scale={selectedScale} 
                        useFlats={useFlats}
                        startingNote={startingNote} />
                </div>
            </div>
        </div>
        )
    }

    isMobile() { 
        if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){
           return true;
         }
        else {
           return false;
         }
       }
}



ReactDOM.render(
    <App />,
    document.getElementById('reactEntry')
);