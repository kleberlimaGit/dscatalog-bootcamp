import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Control, Controller} from 'react-hook-form';
import toolbar from './toolbar';
import   {FormState} from './'
type Props = {
    control: Control<FormState>
}

const DescriptionField = ({control}:Props) => (

    <Controller
        name="description"
        control={control}
        render={({value,onChange}) => (
            <Editor
                toolbarClassName="toolbar-container"
                editorClassName="editor-container"
                editorState={value}
                onEditorStateChange={onChange}
                toolbar={toolbar}
            />
        )}

    />
);

export default DescriptionField;