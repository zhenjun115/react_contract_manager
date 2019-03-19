import request from '@/utils/request';

// const host = 'http://127.0.0.1:9090';
const host = 'http://127.0.0.1:8080';

// 获取待办任务列表
export async function fetchTasks(param) {
  return request(`${host}/activity/task/fetch`, {
    method: 'POST',
    body: param,
  });
}
