import {
  fetchTemplate,
  fetchTemplateById,
  createTemplate,
  fetchParamsByTemplateId,
} from '@/services/purchaseTemplate';

export default {
  namespace: 'purchaseTemplate',
  state: {
    // 模版列表
    templates: [],
    // 单个模版
    template: {},

    // 模版参数
    templateParams: [],
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      const response = yield call(fetchTemplate, payload);
      yield put({
        type: 'setTemplateList',
        payload: response.payload,
      });
    },

    *changeTemplateParams({ payload }, { put }) {
      console.log('更新后的模版参数', payload);
      yield put({
        type: 'setTemplateParams',
        payload: Array.isArray(payload) ? payload : [],
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

    // 获取模版参数
    *fetchParamsByTemplateId({ payload }, { put, call }) {
      const response = yield call(fetchParamsByTemplateId, payload);

      yield put({
        type: 'setTemplateParams',
        payload: Array.isArray(response.payload) ? response.payload : [],
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
      return {
        ...state,
        template: {},
      };
    },
    setTemplateList(state, action) {
      const {
        payload: { templates, page },
      } = action;
      // console.log( "获取采购模版", payload );
      return {
        ...state,
        templates: state.templates.concat(templates),
        page: page,
      };
    },

    clearTemplateList(state, action) {
      const {
        payload: { templates },
      } = action;
      return {
        ...state,
        templates: Array.isArray(templates) ? templates : [],
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
    setTemplateParams(state, action) {
      const { payload } = action;
      return {
        ...state,
        templateParams: payload,
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
