import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, '이름은 2자 이상 입력해 주세요.')
    .regex(/^[가-힣]{2,}$/, '이름은 한글 2자 이상만 입력 가능합니다.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      '비밀번호는 영어 소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
    ),
  passwordCheck: z
    .string()
    .min(8, '비밀번호 확인은 8자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      '비밀번호는 영어 소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
    ),
  phone: z.string().regex(/^010\d{8}$/, '휴대폰 번호는 010으로 시작하는 11자리 숫자여야 합니다.'),
  address: z.string().min(1, '주소를 입력해 주세요.'),
  agreeTerms: z.literal(true, { errorMap: () => ({ message: '이용약관에 동의해 주세요.' }) }),
});

export default signUpSchema;
