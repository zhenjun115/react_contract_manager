import request from '@/utils/request';

const host = 'http://10.80.10.151:8080';
// const host = 'http://10.80.10.151:9090';

// 获取合同列表
export async function fetchContract(param) {
  return request(`${host}/labor/contract/fetch`, {
    method: 'POST',
    body: param,
  });
}

export async function fetchContractById(param) {
  return request(`${host}/labor/contract/fetch/${param}`);
}

export async function fetchPartyByContractId(param) {
  console.log('获取合同签约主体信息', param);
  return request(`${host}/labor/contract/party/fetch`, {
    method: 'POST',
    body: param,
  });
}

export async function fetchFilesByContractId(param) {
  console.log('获取合同附件信息', param);
  return request(`${host}/labor/contract/files/fetch`, {
    method: 'POST',
    body: param,
  });
}

export async function createContract(param) {
  return request(`${host}/labor/contract/create`, {
    method: 'POST',
    body: param,
  });
}

export async function saveParty(param) {
  return request(`${host}/labor/contract/party/update`, {
    method: 'POST',
    body: param,
  });
}

export async function saveInfo(param) {
  return request(`${host}/labor/contract/info/update`, {
    method: 'POST',
    body: param,
  });
}
