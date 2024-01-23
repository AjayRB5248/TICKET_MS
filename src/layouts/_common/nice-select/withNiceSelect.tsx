import NiceSelect from "./nice-select";

const withNiceSelect = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const withNiceSelect: React.FC<P> = (props) => {
    return (
      <>
        <NiceSelect />
        <WrappedComponent {...props} />
      </>
    );
  };

  return withNiceSelect;
};

export default withNiceSelect;
