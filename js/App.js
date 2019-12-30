import React from 'react';
//import logo from './logo.svg';
import './App.css';
import StandardNotationDisplay from './StandardNotationDisplay';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useFlats: false,
      startingNote: 0
    }

    this.scales = [
      {
        intervals: [2, 2, 1, 3, 1, 2, 1],
        root: 0,
        tones: 12,
        names: ['Ionian sharp 5', 'Ionian Augmented']
      },
      {
        "intervals": [
            2, 
            1, 
            2, 
            2, 
            2, 
            1, 
            2
        ], 
        "root": 0, 
        "names": [
            "G.Phrygian", 
            "M.Dorian", 
            "M.Hypomixolydian", 
            "Kafi That", 
            "Mela Kharaharapriya", 
            "Raga Bageshri", 
            "Bhimpalasi", 
            "Nayaki Kanada", 
            "Sriraga", 
            "Ritigaula", 
            "Huseni", 
            "Kanara", 
            "Mischung 5", 
            "Gregorian nr.8", 
            "Eskimo Heptatonic", 
            "Yu: China", 
            "Hyojo", 
            "Oshikicho", 
            "Banshikicho: Japan", 
            "Nam: Vietnam"
        ], 
        "tones": 12
      }
    ];

    this.onAccidentalClick = this.handleAccidentalClick.bind(this);
    this.onChangeStartingNote = this.handleChangeStartingNote.bind(this);
  }

  handleAccidentalClick(e) {
    this.setState({useFlats: e.target.checked});
  }
  handleChangeStartingNote(e) {
    this.setState({startingNote: parseInt(e.target.value)});
  }

  render() {
    let useFlats = this.state.useFlats;
    let startingNote = this.state.startingNote;
  
    return (
      <div className="App">
        <div id="musicScales">
  
          {/* controls */}
          <input type="checkbox" id="useFlats" name="useFlats" onClick={this.onAccidentalClick} />
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
  
          {this.scales.map((scale) =>
            <div>
              <StandardNotationDisplay
                scale={scale}
                startingNote={startingNote}
                useFlats={useFlats}
              />
              {scale.names.map((name) => <div>{name}</div>)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
