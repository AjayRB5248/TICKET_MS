import { FormProvider as Form, UseFormReturn } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  className?: any;
};

export default function FormProvider({ children, onSubmit, methods, className }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </Form>
  );
}
