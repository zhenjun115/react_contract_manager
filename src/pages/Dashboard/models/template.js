import { fetch } from '@/services/template';

export default {
  namespace: 'template',

  state: {
    templates: [],
    page: { pageIndex: 1, pageSize: 5 },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetch, payload);
      console.log(response);
      yield put({
        type: 'setTemplateList',
        payload: response.payload,
      });
    },
  },

  reducers: {
    init(state, action) {
      return {
        ...state,
        templates: [],
        page: { pageIndex: 1, pageSize: 5 },
      };
    },
    clearTemplateList(state, action) {
      return {
        ...state,
        templates: [],
      };
    },
    setTemplateList(state, action) {
      const {
        payload: { page, templates },
      } = action;
      return {
        ...state,
        templates: state.templates.concat(templates),
        page: page,
      };
    },
  },
};
