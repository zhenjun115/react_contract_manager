import {
  fetchTemplate,
  searchTemplate,
  fetchTemplateById,
  fetchParamsByTemplateId,
  createTemplate,
} from '@/services/laborTemplate';

import { createContractDraft } from '@/services/contract';

export default {
  namespace: 'laborTemplate',
  state: {
    // 搜索关键字
    keyword: '',
    // 模版列表
    templates: [],
    // 分页信息
    page: {
      pageIndex: 1,
      pageSize: 5,
    },

    // 单个模版
    template: {},
    currenDraftId: '',

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

    *search({ payload }, { put, call }) {
      const response = yield call(searchTemplate, payload);
      // console.log( "搜索结果", response );
      // 1.清空模版数据
      yield put({
        type: 'clearTemplateList',
        payload: [],
      });
      // 2.设置搜索关键字
      yield put({
        type: 'setSearchKeyword',
        payload: payload.keyword,
      });

      // 3.搜索数据
      yield put({
        type: 'setTemplateList',
        payload: response.payload,
      });
    },

    *changeTemplateParams({ payload }, { put }) {
      yield put({
        type: 'setTemplateParams',
        payload: Array.isArray(payload) ? payload : [],
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
    *fetchParamsByTemplateId({ payload }, { put, call }) {
      const response = yield call(fetchParamsByTemplateId, payload);

      yield put({
        type: 'setTemplateParams',
        payload: Array.isArray(response.payload) ? response.payload : [],
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
    init(state, action) {
      return {
        ...state,
        template: {},
        templates: [],
        page: { pageIndex: 1, pageSize: 5 },
      };
    },

    // 更新劳务合同模版数据
    setTemplateList(state, action) {
      const {
        payload: { templates, page },
      } = action;
      return {
        ...state,
        templates: state.templates.concat(templates),
        page: page,
      };
    },

    // 情况templates数据
    clearTemplateList(state, action) {
      const {
        payload: { templates },
      } = action;

      return {
        ...state,
        templates: Array.isArray(templates) ? templates : [],
      };
    },

    setSearchKeyword(state, action) {
      const { payload } = action;
      console.log('设置搜索关键字', payload);
      return {
        ...state,
        keyword: payload,
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
