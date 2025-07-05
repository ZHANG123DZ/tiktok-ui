import PropTypes from 'prop-types';
import { FormProvider } from 'react-hook-form';

function Form({ methods, children, onSubmit = () => {} }) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

Form.propTypes = {
  methods: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
