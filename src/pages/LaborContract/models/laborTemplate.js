import { fetchTemplate, fetchTemplateById, fetchParamsByTemplateId, createTemplate } from '@/services/laborTemplate';

import { createContractDraft } from '@/services/contract';

export default {
  namespace: 'laborTemplate',
  state: {
    // 模版列表
    templates: [],
    // 单个模版
    template: {},
    currenDraftId: '',
    
    // 模版参数
    templateParams: []
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      const response = yield call(fetchTemplate, payload);
      yield put({
        type: 'setTemplateList',
        payload: response.payload,
      });
    },

    *changeTemplateParams( {payload}, {put} ) {
      console.log( "更新后的模版参数", payload );
      yield put({
        type: 'setTemplateParams',
        payload: Array.isArray( payload ) ? payload : []
      });
    },

    // 根据模版编号获取模版
    *fetchById({ payload }, { put, call }) {
      const response = yield call(fetchTemplateById, payload);

      yield put({
        type: 'setTemplate',
        payload: response.payload,
      });
    },

    // 获取模版参数
    *fetchParamsByTemplateId( {payload}, {put,call} ) {
      const response = yield call( fetchParamsByTemplateId, payload );

      yield put({
        type: 'setTemplateParams',
        payload: Array.isArray( response.payload ) ? response.payload : []
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

    // 设置当前模版参数
    setTemplateParams( state, action ) {
      const { payload } = action;
      return {
        ...state,
        templateParams: payload
      }
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
