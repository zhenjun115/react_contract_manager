import { fetchTasks } from '@/services/activity';

export default {
  namespace: 'activity',

  state: {
    tasks: [],
  },

  effects: {
    // 查询待办任务
    *fetchTasks(_, { call, put }) {
      const response = yield call(fetchTasks);
      console.log( "任务列表", response );
      yield put({
        type: 'saveTasks',
        payload: Array.isArray(response.payload) ? response.payload : [],
      });
    },
  },

  reducers: {
    // 更新待办任务
    saveTasks(state, action) {
      return {
        ...state,
        tasks: action.payload,
      };
    },
  },
};
