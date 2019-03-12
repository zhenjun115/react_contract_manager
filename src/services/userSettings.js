import request from '@/utils/request';

const host = 'http://192.168.199.206:8080';

// 根据合同模版编号,创建合同模版
export default async function updateUserSettings(params) {
  return request(`${host}/user/update`, {
    method: 'POST',
    body: params,
  });
}
