import request from '@/utils/request';

const host = 'http://10.80.10.151:9090';

// 获取待办任务列表
export default async function fetchTasks(param) {
  return request(`${host}/activity/tasks`, {
    method: 'POST',
    body: param,
  });
}
