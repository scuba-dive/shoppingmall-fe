import { z } from 'zod';

export const signUpSchema = z.object({
  nickname: z.string().min(2, '이름은 2자 이상 입력해 주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(4, '비밀번호는 4자 이상이어야 합니다.'),
  passwordCheck: z.string().min(4, '비밀번호 확인은 4자 이상이어야 합니다.'),
  phone: z.string().min(10, '휴대폰 번호를 올바르게 입력해 주세요.'),
  agreeTerms: z.literal(true, { errorMap: () => ({ message: '이용약관에 동의해 주세요.' }) }),
});

export default signUpSchema;
