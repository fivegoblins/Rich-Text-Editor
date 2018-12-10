import React, {Component, Fragment} from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate';

import BoldMark from './BoldMark';
import ItalicMark from './ItalicMark';
import FormatToolbar from './FormatToolbar';

import Icon from 'react-icons-kit';
import {bold} from 'react-icons-kit/feather/bold';
import {italic} from 'react-icons-kit/feather/italic';

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
                change.toggleMark('bold')
                return true
            }
            case 'i': {
                change.toggleMark('italic')
                return true
            }
            default: {
                return;
            }
        }
    }


    renderMark = props=> {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
        }
    }

    onMarkClick = (event, type)=> {
        event.preventDefault();
        const value = this.state.value;
        const change = value.change().toggleMark(type);
        this.onChange(change);
    }

    render() {
        return (
            <Fragment>
                <FormatToolbar>
                    <button 
                        className='tooltip-icon-button'
                        onPointerDown={(event)=> this.onMarkClick(event, bold)}
                    >
                        <Icon icon={bold}/>
                    </button>
                    <button 
                        className='tooltip-icon-button'
                        onPointerDown={(event)=> this.onMarkClick(event, italic)}
                    >
                        <Icon icon={italic}/>
                    </button>
                </FormatToolbar>
                <Editor 
                    value={this.state.value} 
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                />
            </Fragment>
        );
    }
}