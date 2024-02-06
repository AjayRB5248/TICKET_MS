import dynamic from "next/dynamic";

const NiceSelect = dynamic(() => import("./nice-select"), {
  ssr: false,
});

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
