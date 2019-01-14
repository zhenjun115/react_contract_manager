import request from '@/utils/request';

const host = 'http://10.80.10.151:9090';

// 查询字典列表
export async function queryDict(params) {
  return request(`${host}/dict/fetch`, {
    method: 'POST',
    body: params,
  });
}

// 新增数据字典
export async function addDict(params) {
  return request(`${host}/dict/add`, {
    method: 'POST',
    body: params,
  });
}

// 删除数据字典
export async function removeDict(params) {
  return request(`${host}/dict/remove`, {
    method: 'POST',
    body: params,
  });
}

// 更新数据字典信息
export async function updateDict(params) {
  return request(`${host}/dict/edit`, {
    method: 'POST',
    body: params,
  });
}
