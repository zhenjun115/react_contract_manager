import request from '@/utils/request';

const host = 'http://192.168.199.206:8080';

export async function query() {
  return request(`${host}/user/fetch`);
}

// 获取当前登录用户信息
export async function queryCurrent() {
  return request(`${host}/user/fetch`, { method: 'POST' });
}
