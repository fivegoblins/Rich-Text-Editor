import React, {Component} from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'My first paragraph!',
                            },
                        ],
                    },
                ],
            },
        ],
    },
})

export default class TextEditor extends Component {
    state = {
        value: initialValue,
    }

    onChange = ({value})=> {
        this.setState({value});
    }

    onKeyDown = (event, change)=> {
        console.log(event.key);
        if (!event.ctrlKey) {
            return
        }
        event.preventDefault();

        switch (event.key) {
            case 'b': {
                change.addMark('bold')
                return true
            }
        }
    }

    render() {
        return (
            <Editor 
                value={this.state.value} 
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
            />
        );
    }
}