import request from '@/utils/request';

const host = 'http://127.0.0.1:9090';

// 获取待办任务列表
export async function fetchTasks(param) {
  return request(`${host}/activity/tasks`, {
    method: 'POST',
    body: param,
  });
}
