import request from '@/utils/request';

// const host = 'http://172.17.2.57:8080';
const host = 'http://127.0.0.1:9090';

// 获取合同列表
export async function fetchTemplate(param) {
  return request(`${host}/purchase/template/fetch`, {
    method: 'POST',
    body: param,
  });
}

export async function fetchTemplateById(param) {
  return request(`${host}/purchase/template/fetchById`, {
    method: 'POST',
    body: param,
  });
}

// 保存采购模版
export async function createTemplate(param) {
  return request(`${host}/purchase/template/add`, {
    method: 'POST',
    body: param,
  });
}
