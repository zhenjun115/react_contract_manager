import request from '@/utils/request';

// const host = 'http://172.17.2.57:8080';
const host = 'http://10.80.10.151:8080';

// 获取合同列表
export async function fetch(param) {
  return request(`${host}/template/fetch`, {
    method: 'POST',
    body: param,
  });
}
