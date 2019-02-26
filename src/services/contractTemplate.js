import request from '@/utils/request';

// const host = 'http://172.17.2.57:8080';
const host = 'http://127.0.0.1:8080';

// 获取合同列表
export default async function fetchList(param) {
  return request(`${host}/contract/template/fetch`, {
    method: 'POST',
    body: param,
  });
}
