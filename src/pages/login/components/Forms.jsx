import {
  FormControl,
  TextField,
  Button,
  Link as MuiLink,
  Box,
} from '@mui/material';
import Cookies from 'js-cookie';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { EMAIL_PATTERN, TOAST_ID } from '@/constants';
import { useLogin } from '@/pages/login/hooks/useLogin';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

const Forms = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate } = useLogin();
  const { setIsLogin } = useUserStore(state => pick(state, 'setIsLogin'));

  const handleClickRegister = () => {
    navigate(pageRoutes.register);
  };

  const methods = useForm({ defaultValues: { email: '', password: '' } });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const handleClickLoginButton = handleSubmit(forms => {
    mutate(forms, {
      onSuccess: ({ data }) => {
        Cookies.set('access_token', data['access_token']);
        setIsLogin(true);
        navigate(location.state?.prevPath ?? pageRoutes.main);
      },
      onError: err => {
        if (err?.response?.status === 401) {
          toast.error('이메일 또는 비밀번호가 잘못되었습니다.', {
            id: TOAST_ID,
          });
        } else {
          console.error(err);
        }
      },
    });
  });

  return (
    <>
      <Box sx={{ width: '40ch', marginTop: '30px' }}>
        <FormControl fullWidth margin="normal">
          <TextField
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: EMAIL_PATTERN,
                message: '이메일 양식이 올바르지 않습니다',
              },
            })}
            type="email"
            label="이메일"
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            {...register('password', { required: '비밀번호를 입력하세요' })}
            type="password"
            label="비밀번호"
            error={!!errors?.password}
            helperText={errors?.password?.message}
          />
        </FormControl>
      </Box>
      <Box
        sx={{
          marginTop: '50px',
          width: '40ch',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={handleClickLoginButton}
          aria-label="로그인"
        >
          로그인
        </Button>
        <MuiLink
          underline="hover"
          onClick={handleClickRegister}
          style={{ cursor: 'pointer' }}
          role="link"
        >
          회원가입
        </MuiLink>
      </Box>
    </>
  );
};

export default Forms;
