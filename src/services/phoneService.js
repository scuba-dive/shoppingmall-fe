import axiosInstance from '@/services/axiosInstance';

// 인증번호 발송
export const sendPhoneAuthCode = async (phone) => {
  const res = await axiosInstance.post('/api/users/phone/send', { phoneNumber: phone });
  return res.data;
};

// 인증번호 확인
export const verifyPhoneAuthCode = async (phone, code) => {
  const res = await axiosInstance.post('/api/users/phone/verify', {
    phoneNumber: phone,
    code,
  });
  return res.data;
};
