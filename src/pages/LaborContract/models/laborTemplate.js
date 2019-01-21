import { fetchTemplate, fetchTemplateById, createTemplate } from '@/services/laborTemplate';

import { createContractDraft } from '@/services/contract';

export default {
  namespace: 'laborTemplate',
  state: {
    // 模版列表
    templates: [],
    // 单个模版
    template: {},
    currenDraftId: '',
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

    // 创建劳务合同
    *createContract({ payload }, { put, call }) {
      const response = yield call(createContractDraft, payload);
      yield put({
        type: 'setCurrenDraft',
        payload: response.payload,
      });
    },

    // 保存采购模版信息
    *save({ payload, callback }, { call }) {
      const response = yield call(createTemplate, payload);
      if (callback) {
        callback(response.code);
      }
    },
  },

  reducers: {
    initTemplateState(state, action) {
      console.log(action);
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
    // 设置当前操作的合同草稿编号
    setCurrenDraft(state, action) {
      // console.log( "合同编号", action );
      const {
        payload: { contractId },
      } = action;
      return {
        ...state,
        currenDraftId: contractId,
      };
    },
  },
};
