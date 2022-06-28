import { EditorUtils } from '@progress/kendo-react-editor';

export const insertImageFiles = ({ view, files, nodeType, position, attrs = {} }) => {
    files.forEach((file) => {
        const { nodes, marks } = view.state.schema;
        const linkMark = marks.link.create({href: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'});
        const fileNode = view.state.schema.text(file.name, [linkMark]);
        const paragraphNode = nodes.paragraph.create(null, fileNode);
        EditorUtils.insertNode(view, paragraphNode);
    })
};
