import React from 'react';
import { Editor, EditorState } from 'draft-js';

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
    render() {
        return (
            <Editor editorState={this.state.editorState} onChange={e => this.handleChange(e)}/>
        )
    }
}
export default RichTextEditor;