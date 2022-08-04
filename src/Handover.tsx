import React, { useEffect, useState } from 'react';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Window } from '@progress/kendo-react-dialogs';
import { Editor, EditorMountEvent, EditorTools, ProseMirror } from '@progress/kendo-react-editor';
import { insertImageFiles } from './utils';
import { insertImagePlugin } from './insertImagePlugin';
import { InsertImage } from './insertImageTool';
import content from './content';
import HeadingTool from './HeadingTool';
import './Handover.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { maximise, minimise } from './windowSlice';
import Split from './Split';
import { Splitter, SplitterOnChangeEvent } from '@progress/kendo-react-layout';
import { getTTFB } from 'web-vitals';

const { Bold, Italic, Underline,
  AlignLeft, AlignRight, AlignCenter,
  Indent, Outdent,
  OrderedList, UnorderedList,
  Undo, Redo, Link, Unlink, InsertFile, FormatBlock } = EditorTools;

const Handover = () => {
  const open = useSelector((state: RootState) => state.window.visible);
  const editableState = useSelector((state: RootState) => state.window.editable)
  const [width, setWidth] = useState(800);
  const [editable, setEditable] = useState(editableState);
  
  const dispatch = useDispatch();

  const editableRef = React.useRef<boolean>(editable);

  const [panes, setPanes] = React.useState<Array<any>>([
    { size: '30%', min: '20px', collapsible: false },
    {}
  ]);

  useEffect(() =>{
    setEditable(editableState);
    editableRef.current = editableState;
  },[
    editableState
  ]);

  const toggleDialog = (event: any) => {
    dispatch(maximise());
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
    const readonlyPlugin = new ProseMirror.Plugin({
      key: new ProseMirror.PluginKey('readonly'),
      props: { editable: () => editableRef.current },
      filterTransaction: ((tr, st) => editableRef.current || !tr.docChanged)
    });
    const plugins = [
      ...state.plugins,
      readonlyPlugin,
      insertImagePlugin(onImageInsert),
    ];

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

  const onStageChange = (event: any) => {
    console.log(event);
    if (event.state === 'MINIMIZED') {
      setWidth(200);
      dispatch(minimise());
    } else {
      setWidth(800);
      dispatch(maximise());
    }
  }

  // const toggleEditable = () => {
  //   setEditable(!editable);
  //   editableRef.current = !editable;
  // }

  const onSplitterChange = (event: SplitterOnChangeEvent) => {
    setPanes(event.newState);
  }

  const onCallapse = () => {
    if (panes.length > 1) {
      setPanes([
        {},
      ]);
    } else {
      setPanes([
        { size: '30%', min: '20px', collapsible: false },
        {}
      ]);
    }
  }

  return (
    <>
      {open &&
        <Window title='Handover'
          onClose={toggleDialog}
          width={width}
          height={600}
          maximizeButton={() => null}
          closeButton={() => null}
          onStageChange={onStageChange}
          initialLeft={window.innerWidth - 800}
          initialTop={window.innerHeight - 600}>
            <Splitter
              panes={panes}
              onChange={onSplitterChange}
            >
              {panes.length > 1 && (<div className='left-pane'>Previous Handover
              <p>Content Content Content Content Content Content Content Content Content Content Content Content Content </p>
              </div>)}
              <div className='right-pane'>
                <div>
                  <button className='k-button k-rounded-md k-button-solid k-button-solid-base' onClick={onCallapse}>
                  {panes.length === 1 ? '>' : '<'}
                  </button>
                </div>
                <Editor
                  tools={[[Bold, Italic, Underline, Link, AlignLeft, AlignRight, AlignCenter,
                    Indent, Outdent,
                    OrderedList, UnorderedList,], [Undo, Redo], [InsertImage], FormatBlock, HeadingTool]}
                  contentStyle={{ height: 320 }}
                  onMount={onMount}
                  onBlur={onChange}
                />
                <div className='action-group'>
                  <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Button</button>
                  <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Button</button>
                  <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Button</button>
                </div>
              </div>
            </Splitter>
        </Window>
      }
    </>
  );
};
export default Handover;
