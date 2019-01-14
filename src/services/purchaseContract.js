import request from '@/utils/request';

// const host = 'http://172.17.2.57:8080';
const host = 'http://10.80.10.151:9090';

// 获取合同列表
export async function fetchContract(param) {
  return request(`${host}/purchase/contract/fetch`, {
    method: 'POST',
    body: param,
  });
}

export async function fetchContractById(param) {
  return request(`${host}/purchase/contract/fetchById`, {
    method: 'POST',
    body: param,
  });
}
