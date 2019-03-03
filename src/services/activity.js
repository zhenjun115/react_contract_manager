import request from '@/utils/request';

// const host = 'http://10.80.10.151:9090';
const host = 'http://10.80.10.151:8080';

// 获取待办任务列表
export async function fetchTasks(param) {
  return request(`${host}/activity/task/fetch`, {
    method: 'POST',
    body: param,
  });
}
