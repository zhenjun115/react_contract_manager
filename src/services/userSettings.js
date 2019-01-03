import request from '@/utils/request';

const host = 'http://127.0.0.1:9090';

// 根据合同模版编号,创建合同模版
export async function updateUserSettings(params) {
  return request(`${host}/user/update`, {
    method: 'POST',
    body: params,
  });
}
