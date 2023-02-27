import { components, ControlProps } from 'react-select';

const ControlSelect = ({ children, ...props }: ControlProps<{ label: string; value: string; }, false>) => {
    const { icon } = props.selectProps as unknown as { icon: React.ReactElement };
  
    return (
        <components.Control {...props}>
            {icon && <aside className="entry-select-icon">{icon}</aside>}
            {children}
        </components.Control>
    );
};

export default ControlSelect;
