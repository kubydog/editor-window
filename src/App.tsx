import React, { useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { Window } from '@progress/kendo-react-dialogs';
import { Editor, EditorMountEvent, EditorTools, ProseMirror } from '@progress/kendo-react-editor';
import { insertImageFiles } from './utils';
import { insertImagePlugin } from './insertImagePlugin';
import { InsertImage } from './insertImageTool';
import content from './content';
import HeadingTool from './HeadingTool';
import './App.css';

const { Bold, Italic, Underline,
  AlignLeft, AlignRight, AlignCenter,
  Indent, Outdent,
  OrderedList, UnorderedList,
  Undo, Redo, Link, Unlink, InsertFile, FormatBlock } = EditorTools;

const App = () => {
  const [visible, setVisible] = useState(false);

  const toggleDialog = (event: any) => {
    setVisible(!visible);
  };

  const onImageInsert = (args) => {
    const { files, view, event } = args;
    const nodeType = view.state.schema.nodes.paragraph;

    const position =
      event.type === 'drop'
        ? view.posAtCoords({ left: event.clientX, top: event.clientY })
        : null;

    insertImageFiles({ view, files, nodeType, position });

    return files.length > 0;
  };

  const onMount = (event: EditorMountEvent) => {
    const state = event.viewProps.state;
    const plugins = [...state.plugins, insertImagePlugin(onImageInsert)];

    return new ProseMirror.EditorView(
      { mount: event.dom },
      {
        ...event.viewProps,
        state: ProseMirror.EditorState.create({ doc: state.doc, plugins }),
      }
    );
  };
  const onChange = (event: any) => {
    console.log(event);
  };

  return (
    <div>
      <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onClick={toggleDialog}>Open Window</button>
      {visible &&
        <Window title={"Status"}
          closeButton={undefined}
          onClose={toggleDialog}
          width={500}
          height={500}
          initialLeft={window.innerWidth - 500}
          initialTop={window.innerHeight - 500}>
          <Editor
            tools={[[Bold, Italic, Underline, Link, AlignLeft, AlignRight, AlignCenter,
              Indent, Outdent,
              OrderedList, UnorderedList,], [Undo, Redo], [InsertImage], FormatBlock, HeadingTool]}
            contentStyle={{ height: 320 }}
            onMount={onMount}
            onBlur={onChange}
            />  
        </Window>
      }
    </div>
  );
};
export default App;
