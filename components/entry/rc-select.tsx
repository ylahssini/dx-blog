import Select, { Option, SelectProps } from 'rc-select';

type RCSelectProps = SelectProps & { options: { key: string; label: string | React.ReactNode }[] };

export default function RCSelect(props: RCSelectProps) {
    return (
        <Select {...props}>
            {props.options.map((option) => (
                <Option key={option.key}>{option.label}</Option>
            ))}
        </Select>
    );
}

RCSelect.defaultProps = {
    options: [],
    placeholder: 'Select',
};
