import { DropDownButton } from '@progress/kendo-react-buttons';
import { ComboBox, DropDownList } from '@progress/kendo-react-dropdowns';
import { EditorTools } from '@progress/kendo-react-editor';
import { EditorUtils } from '@progress/kendo-react-editor';

const headingToolSettings = {
    style: 'color',
    defaultItem: { text: 'Headings', value: '' },
    items: [
        { text: 'PC: Presenting complaint', value: 'PC' },
        { text: 'HX: History', value: 'HX' },
        { text: 'OE: Examination', value: 'OE' }
    ]
};

const HeadingTool = (props) => {
  const { view } = props;
  const onChange = (event) => {
    const { nodes, marks } = view.state.schema;
    const textNode = view.state.schema.text(event.value, [marks.strong.create()]);
    const paragraphNode = nodes.paragraph.create(null, textNode);
    EditorUtils.insertNode(view, paragraphNode)
  }

  return (
    <DropDownList
     onChange={onChange}
     data={headingToolSettings.items.map(item => item.text)}
     defaultValue="Headings"
    />
  );
};

export default HeadingTool;
