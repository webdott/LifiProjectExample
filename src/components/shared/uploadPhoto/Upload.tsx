import React, { useState } from 'react';
import userLogo from '../../../assets/images/userImage.png';
import styles from '../uploadPhoto/upload.module.scss';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface uploadProps {
  file: string;
  name: string;
  size: string;
}

export default function Upload() {
  const [imagePreview, setImagePreview] = useState<any>('');
  const [base64, setBase64] = useState<string>();
  const [uploaderStates, setUploaderStates] = useState<uploadProps>({
    file: '',
    name: '',
    size: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFileSubmit = (e: React.FormEvent<HTMLElement>) => {
    setIsLoading(true);
    e.preventDefault();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const photoUpload = (event: any) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.currentTarget.files[0];

    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setUploaderStates({
          file: file,
          size: file.size,
          name: file.name,
        });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={onFileSubmit}>
      {imagePreview === '' ? (
        <img className={styles.userProfile} src={userLogo} width={70} height={70} alt='userLogo' />
      ) : (
        <img
          className={styles.userProfilePreview}
          src={imagePreview}
          width={70}
          height={70}
          alt='Icone adicionar'
        />
      )}
      <input
        className={styles.uploadButton}
        type='file'
        name='avatar'
        id='file'
        accept='.png, .jpg, .jpeg'
        onChange={photoUpload}
        src={imagePreview}
      />

      <label htmlFor='file' className={styles.customButton}>
        <CameraAltIcon className={styles.cameraIcon} />
      </label>
    </form>
  );
}
