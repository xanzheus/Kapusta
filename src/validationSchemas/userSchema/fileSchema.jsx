import * as Yup from 'yup';

const fileSchema = Yup.object().shape({
  file: Yup.mixed().required(),
});
export default fileSchema;
