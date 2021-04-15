import React from 'react';
import { DraftHandleValue, Editor, EditorState, RichUtils } from 'draft-js';

interface RichTextEditorProps {

}
class RichTextEditor extends React.Component<RichTextEditorProps, any> {
    constructor(props: RichTextEditorProps) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()}
    }
    handleChange(e: EditorState) {
        this.setState({editorState: e})
    }
    handleKeyCommand(cmd: string): DraftHandleValue {
        const textState = RichUtils.handleKeyCommand(this.state.editorState, cmd);
        if (textState) {
            this.handleChange(textState);
            return 'handled';
        } 
        return 'not-handled';
    }
    render() {
        return (
            <Editor editorState={this.state.editorState} onChange={e => this.handleChange(e)} handleKeyCommand={this.handleKeyCommand}/>
        )
    }
}
export default RichTextEditor;