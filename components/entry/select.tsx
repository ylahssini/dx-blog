import ReactSelect from 'react-select';

export default function Select(props) {
    return (
        <ReactSelect {...props} />
    );
}

Select.defaultProps = {
    options: [],
    placeholder: 'Select',
};
