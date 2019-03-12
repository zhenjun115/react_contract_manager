import { queryDict, addDict, removeDict, updateDict } from '@/services/dict';

export default {
  namespace: 'dict',

  state: {
    // 分页数据格式
    dicts: {
      list: [],
      pagination: {},
    },

    keyword: '',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDict, payload);
      console.log('获取字典列表', response);
      yield put({
        type: 'save',
        payload: response.payload,
      });
    },
    *add({ payload, callback }, { call }) {
      yield call(addDict, payload);
      // yield put({
      //   type: 'reload',
      //   payload: response,
      // });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeDict, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call }) {
      yield call(updateDict, payload);

      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      console.log('页面初始化，加载字典列表数据', action.payload);
      return {
        ...state,
        // data: action.payload,
        dicts: { list: action.payload, pagination: {} },
      };
    },
  },
};
