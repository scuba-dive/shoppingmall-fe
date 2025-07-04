import { toast } from 'react-toastify';

const useConfirm = () => {
  const confirm = (message, onConfirm, onCancel) => {
    const toastId = toast(
      ({ closeToast }) => (
        <div>
          <p
            style={{
              marginBottom: '16px',
              fontSize: '14px',
              lineHeight: '1.4',
              color: 'black',
            }}
          >
            {message}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => {
                closeToast();
                onConfirm?.();
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ffa948',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              확인
            </button>
            <button
              type="button"
              onClick={() => {
                closeToast();
                onCancel?.();
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#9f9f9f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500',
              }}
            >
              취소
            </button>
          </div>
        </div>
      ),
      {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        closeButton: false,
        toastId: 'confirm-toast',
      },
    );
    return toastId;
  };

  return confirm;
};

export default useConfirm;
