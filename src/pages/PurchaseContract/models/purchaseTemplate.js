import { fetchTemplate, fetchTemplateById, createTemplate } from '@/services/purchaseTemplate';

export default {
  namespace: 'purchaseTemplate',
  state: {
    // 模版列表
    templates: [],
    // 单个模版
    template: {},
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      const response = yield call(fetchTemplate, payload);
      yield put({
        type: 'setTemplateList',
        payload: response.payload,
      });
    },

    // 根据模版编号获取模版
    *fetchById({ payload }, { put, call }) {
      const response = yield call(fetchTemplateById, payload);
      // console.log( "获取单个模版信息", response );
      yield put({
        type: 'setTemplate',
        payload: response.payload,
      });
    },

    // 保存采购模版信息
    *save({ payload }, { put, call }) {
      const response = yield call(createTemplate, payload);
      // yield put({
      //   type: 'setContractUpdatedResult',
      //   payload: response,
      // });
    },
  },

  reducers: {
    initTemplateState(state, action) {
      return {
        ...state,
        template: {},
      };
    },
    setTemplateList(state, action) {
      const { payload } = action;
      return {
        ...state,
        templates: payload,
      };
    },
    setTemplate(state, action) {
      const { payload } = action;
      return {
        ...state,
        template: payload,
      };
    },
  },
};
