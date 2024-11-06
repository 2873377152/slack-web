import { post } from '@/request';

// type: 登录：1 重置密码：2
export const postVCode = (params: {mobile: string, type: number}) => {
  return post('/slack/user/getVerifCode', params)
}