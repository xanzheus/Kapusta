import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useFormik } from 'formik';
import { useUpdateAvatarMutation } from 'redux/service/userAPI';
import style from './ProfilePage.module.scss';

const FormaUpdatePhoto = () => {
  const [updateAvatar] = useUpdateAvatarMutation({
    fixedCacheKey: 'shared-update-avatar',
  });

  const formikAvatar = useFormik({
    initialValues: {
      file: {},
    },

    onSubmit: values => {
      updateAvatar(values.avatar);
    },
  });

  return (
    <>
      <form
        autoComplete="off"
        className={style.addFile__form}
        aria-label="Profile picture"
        onSubmit={formikAvatar.handleSubmit}
      >
        <input
          encType="multipart/form-data"
          className={style.addFile__input}
          type="file"
          name="avatarUpload"
          id="avatarUpload"
          hidden
          value=""
          onChange={event => {
            const avatar = new FormData();
            avatar.append('avatar', event.currentTarget.files[0]);
            formikAvatar.setFieldValue('avatar', avatar);
            formikAvatar.submitForm();
          }}
        ></input>

        <label htmlFor="avatarUpload">
          <AddPhotoAlternateIcon
            type="button"
            variant="contained"
            fontSize="string"
            className={style.profile__buttonEdit}
            titleAccess="add Photo"
          ></AddPhotoAlternateIcon>
        </label>
      </form>
    </>
  );
};

export default FormaUpdatePhoto;
