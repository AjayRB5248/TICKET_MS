import NiceSelect from "./nice-select";

const withNiceSelect = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithNiceSelect: React.FC<
    React.ComponentProps<typeof WrappedComponent> & { onSelectChange: (label: string, value: string) => void }
  > = (props) => {
    return (
      <>
        <NiceSelect onSelectChange={props.onSelectChange} />
        <WrappedComponent {...props} />
      </>
    );
  };

  return WithNiceSelect;
};

export default withNiceSelect;
