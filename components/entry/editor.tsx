import { useRef, useState } from 'react';
import CodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';
import { Stack, Button, Box } from '@chakra-ui/react';
import { MdFormatBold, MdFormatItalic, MdImage, MdOutlineAddLink } from 'react-icons/md';
import { sleep } from '@/utils/functions';

const editorStyle = {
    fontFamily: '"Fira code", "Fira Mono", monospace',
    fontSize: 12,
    minHeight: '200px',
    outline: 'none !important',
};

export default function Editor(props) {
    const editor = useRef<{ _input: HTMLInputElement }>();
    const [cursor, setCursor] = useState();

    function handleHTML(key) {
        return async (e) => {
            const mappingTags = {
                strong: '<strong></strong>',
                em: '<em></em>',
                heading: `<${e?.key || 'h1'}></${e?.key || 'h1'}>`,
                a: '<a href="/"></a>',
                img: '<img src="" alt="" width="" height="" />',
            };

            const mappingLength = {
                strong: 8,
                em: 4,
                heading: 4,
                a: 12,
                img: 10,
            };

            const value = props.value || '';

            props.onChange([value.slice(0, cursor), mappingTags[key], value.slice(cursor)].join(''));
            await sleep(100);

            if (editor.current) {
                editor.current._input.focus();
                editor.current._input.selectionStart = cursor + mappingLength[key];
                editor.current._input.selectionEnd = cursor + mappingLength[key];
            }
        };
    }

    function handleEditorChange(event) {
        if (event?.persist) {
            event.persist();
        }

        props.onChange(event.value);
    }

    function handleBlur(event) {
        if (event?.persist) {
            event.persist();
        }

        setCursor(event.target.selectionStart);
    }

    return (
        <Box borderWidth={1} borderColor="gray.200" borderRadius={4}>
            <Stack borderBottomWidth={1} borderColor="gray.200" spacing={1} direction="row" align="center" position="sticky" top={0} p="0.25rem">
                <Button variant="outline" onClick={handleHTML('strong')}><MdFormatBold size={24} /></Button>
                <Button variant="outline" onClick={handleHTML('em')}><MdFormatItalic size={24} /></Button>
                <Button variant="outline" onClick={handleHTML('img')}><MdImage size={24} /></Button>
                <Button variant="outline" onClick={handleHTML('a')}><MdOutlineAddLink size={24} /></Button>
            </Stack>
            <CodeEditor
                {...props}
                ref={editor}
                highlight={code => highlight(code, languages.jsx)}
                padding={10}
                tabSize={4}
                value={props.value || ''}
                onValueChange={handleEditorChange}
                onBlur={handleBlur}
                style={editorStyle}
            />
        </Box>
    );
}
