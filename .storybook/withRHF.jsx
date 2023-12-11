import { action } from '@storybook/addon-actions';
import { FormProvider, useForm } from 'react-hook-form';

const StorybookFormProvider = ({ children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(action('[React Hooks Form] Submit'))}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default showSubmitButton => Story => (
  <StorybookFormProvider>
    <Story />
    {showSubmitButton && <button type="submit">Submit</button>}
  </StorybookFormProvider>
);
