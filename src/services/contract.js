import request from '@/utils/request';

const host = 'http://127.0.0.1:9090';

// 获取合同列表
export async function fetchContractList(params) {
  return request(`${host}/contract/fetch/all`, {
    method: 'POST',
    body: params,
  });
}
// 获取合同列表--履行中
export async function queryCarryout() {
  return request(`${host}/contract/fetch/carryout`);
}

// 获取合同列表--订立中
export async function queryProgress() {
  return request(`${host}/contract/fetch/process`);
}

// 根据合同模版编号,创建合同模版
export function createContractDraft(params) {
  return request(`${host}/contract/draft/create`, {
    method: 'POST',
    body: params,
  });
}

// 保存合同基本信息
export async function saveContract(params) {
  // console.log( "保存信息", params );
  return request(`${host}/contract/save`, {
    method: 'POST',
    body: params,
  });
}

export async function saveContractParty(params) {
  // console.log('准备发起保存签约主体请求', params);
  return request(`${host}/contract/party/update`, {
    method: 'POST',
    body: params,
  });
}

// 获取合同信息
export async function fetchContract(params) {
  // console.log('params', params);
  return request(`${host}/contract/party/fetch`, {
    method: 'POST',
    body: { contractId: params },
  });
}

// 获取合同附件列表
export async function fetchContractFiles(params) {
  // console.log('发起请求：合同附件列表', params);
  return request(`${host}/contract/files`, {
    method: 'POST',
    body: { contractId: params },
  });
}

// 获取合同处理流程
export async function fetchContractProcess(params) {
  // console.log( "发起请求：合同处理流程获取", params );
  return request(`${host}/activity/process`, {
    method: 'POST',
    body: { contractId: params },
  });
}
