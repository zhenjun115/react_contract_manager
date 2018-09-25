import request from '@/utils/request';

export async function queryCarryout() {
  return request('/api/contract/carryout');
}

export async function queryProgress() {
  return request('/api/contract/process');
}
