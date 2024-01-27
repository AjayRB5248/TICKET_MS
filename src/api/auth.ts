import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import AuthService from 'src/services/auths';

export const useLogin = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ['login/verify'],
    async (data:any) => {
      const req = await AuthService.login(data);
      return req.data;
    },
    {
      onSuccess: (data:any) => {
        enqueueSnackbar('Login successful', { variant: 'success' });
        console.log({data})
        return data;
      },
      onError: (error:any) => {
        enqueueSnackbar(error?.response?.data?.message || 'Something went wrong', {
          variant: 'error',
        });
        return error;
      },
    }
  );
};

export const useRegister = ()=>{
  const notify = useSnackbar();
 
    return useMutation(
      ['register'],
      async(data:any)=>{
        const res = await AuthService.register(data) ;
        console.log(res)
        return res?.data
      } ,
      {
        onSuccess: (data:any) => {
          notify.enqueueSnackbar('Successfully Register', { variant: 'success' });
          console.log({data}) ;
        },
        onError: (error:any) => {
          console.log(error)
          notify.enqueueSnackbar( error?.message ||'Something went wrong', {
            variant: 'error',
          });
          return error;
        },
      }
    )

}
