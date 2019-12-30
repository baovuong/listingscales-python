import React from 'react';
import Vex from 'vexflow';

export default class StandardNotationDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.renderer = null;
        this.stave = null;
        this.noteRenderingGroup = null;
        this.ref = React.createRef();
    }

    render() {
        return (
            <div ref={this.ref}>
            </div>
        )
    }

    componentDidMount() {
        this.renderer = new Vex.Flow.Renderer(this.ref.current, Vex.Flow.Renderer.Backends.SVG);
        if (this.props.scale != null) {
            this.drawStaff(this.props.scale, this.props.startingNote, this.props.useFlats, 50, 15);
        }
    }

    componentDidUpdate() {
        if (this.props.scale != null) {
            if (this.noteRenderingGroup != null)
                this.renderer.getContext().svg.removeChild(this.noteRenderingGroup);
            this.drawStaff(this.props.scale, this.props.startingNote, this.props.useFlats, 50, 15);
        }
    }

    drawStaff(scale, startingNote, useFlats, renderSize, accidentalPadding) {

        let notes = this.toVexNotes(this.noteValues(scale.root + startingNote, scale.intervals), useFlats, 4);

        let numNotes = notes.length;
        let numNotesWithAccidentals = notes.filter(n => 
            n.modifiers.filter(m => 
                m instanceof Vex.Flow.Accidental).length > 0).length;
        
        let renderWidth = renderSize * numNotes + numNotesWithAccidentals * accidentalPadding;

        
        this.renderer.resize(renderWidth + 16, 120);

        let context = this.renderer.getContext();

        this.noteRenderingGroup = context.openGroup();

        // drawing the stave
        let stave = new Vex.Flow.Stave(5, 0, renderWidth + 10);
        stave.addClef("treble");
        stave.setContext(context).draw();

        // preparing the notes
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
        let voice = new Vex.Flow.Voice({num_beats: notes.length,  beat_value: 4});
        voice.addTickables(notes);

        // preparing note names under the notes
        let noteLetters = this.toVexLetterNotes(this.noteValues(scale.root + startingNote, scale.intervals), stave, useFlats);
        let voice2 = new Vex.Flow.Voice({num_beats: notes.length, beat_value: 4});
        voice2.addTickables(noteLetters);

        let formatter = new Vex.Flow.Formatter().joinVoices([voice, voice2]).format([voice, voice2], renderWidth - 10);
        voice.draw(context, stave);
        noteLetters.forEach(letter => letter.setContext(context).draw());

        context.closeGroup();
    }

    noteValues(root, intervals) {
        let intervalLength = intervals.length;
        let result = new Array(intervalLength);
        for (let i=0; i<intervalLength; i++) {
            result[i] = root;
            root += intervals[i];
        }

        return result;
    }

    toVexNotes(noteValues, useFlats, octave) {
        const keys = ['c','c#db','d','d#eb','e','f','f#gb','g','g#ab','a','a#bb','b'];

        return noteValues.map(value => {
            let note = keys[value % 12];
            let hasAccidental = note.includes('#');
            
            if (hasAccidental)
                note = useFlats ? note.substring(2) : note.substring(0, 2);

            note += '/' + (value / 12 + octave);
            
            let rendering = new Vex.Flow.StaveNote({keys: [note], duration: "q", auto_stem: true });
            if (hasAccidental) {
                return rendering.addAccidental(0, new Vex.Flow.Accidental(useFlats ? 'b' : '#'));
            }
            return rendering;
        });
    }

    toVexLetterNotes(noteValues, stave, useFlats) {
        return noteValues.map(value => {
            let note = this.mapNote(value);

            if (note.includes('/')) 
                note = useFlats ? note.substring(3) : note.substring(0, 2);
            
            let rendering = new Vex.Flow.TextNote({
                text: note,
                font: {
                    family: 'Arial',
                    size: 12,
                    weight: ''
                },
                duration: 'q'
            })
            .setLine(11)
            .setStave(stave)
            .setJustification(Vex.Flow.TextNote.Justification.LEFT);

            return rendering;
        });
    }

    mapNote(value) {
        const thing = [
            'C',
            'C' + String.fromCharCode(9839) + '/D' + String.fromCharCode(9837),
            'D',
            'D' + String.fromCharCode(9839) + '/E' + String.fromCharCode(9837),
            'E',
            'F',
            'F' + String.fromCharCode(9839) + '/G' + String.fromCharCode(9837),
            'G',
            'G' + String.fromCharCode(9839) + '/A' + String.fromCharCode(9837),
            'A',
            'A' + String.fromCharCode(9839) + '/B' + String.fromCharCode(9837),
            'B'
        ];
        return thing[value % 12];
    }
}