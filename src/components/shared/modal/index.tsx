import { Modal } from 'antd';
import { ModalProps } from './types';

export default function AntdModal({
  children,
  isModalVisible,
  onCancel,
  ...rest
}: ModalProps): JSX.Element {
  return (
    <Modal
      title=''
      open={isModalVisible}
      onCancel={onCancel}
      bodyStyle={{ borderRadius: '15px' }}
      width={510}
      footer={null}
      {...rest}
    >
      {children}
    </Modal>
  );
}
