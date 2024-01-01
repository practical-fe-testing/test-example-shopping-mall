import { Box, FormControl, TextField, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import { EMAIL_PATTERN, TOAST_ID } from '@/constants';
import { useRegister } from '@/pages/register/hooks/useRegister';

const avatar = 'https://api.lorem.space/image/face?w=640&h=480&r=867';

const Forms = () => {
  const navigate = useNavigate();
  const { mutate } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: { email: '', name: '', password: '' },
  });

  const handleClickRegister = handleSubmit(forms => {
    const users = { ...forms, avatar };

    mutate(users, {
      onSuccess: () => {
        toast.success('가입 성공!', { id: TOAST_ID });
        navigate(pageRoutes.login);
      },
      onError: err => {
        if (err?.response?.data?.field) {
          const { field, errorCode, message } = err.response.data;
          setError(field, { type: errorCode, message });
          return;
        }

        toast.error('잠시 문제가 발생했습니다! 다시 시도해 주세요.', {
          id: TOAST_ID,
        });
        console.error(err);
      },
    });
  });

  return (
    <>
      <Box sx={{ width: '40ch', marginTop: '30px' }}>
        <FormControl fullWidth margin="normal">
          <TextField
            id="name"
            type="text"
            label="이름"
            {...register('name', { required: '이름을 입력하세요' })}
            error={!!errors?.name}
            helperText={errors?.name?.message}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="email"
            type="email"
            label="이메일"
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: {
                value: EMAIL_PATTERN,
                message: '이메일 양식이 올바르지 않습니다',
              },
            })}
            error={!!errors?.email}
            helperText={errors?.email?.message}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="password"
            type="password"
            label="비밀번호"
            {...register('password', { required: '비밀번호를 입력하세요' })}
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
        <Button variant="contained" fullWidth onClick={handleClickRegister}>
          가입
        </Button>
      </Box>
    </>
  );
};

export default Forms;
