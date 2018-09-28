const carryout = [
  {
    id: 'xxx1',
    title: '(小王)人事聘用合同',
    // logo: avatars[0],
    description:
      '根据《中华人民共和国劳动法》，甲乙双方经平等协商同意、自愿签订本合同，共向遵守本合同所列条款。',
    updatedAt: new Date(),
    typeName: '人事合同',
    type: '1',
    href: '/result/success',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: '2018全年服务器采购合同',
    // logo: avatars[0],
    description: '2018年集团办公电脑采购合同',
    updatedAt: new Date(),
    typeName: '采购合同',
    type: '2',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: '2018年第一季度矿泉水销售合同',
    // logo: avatars[0],
    description: '2018年第一季度对浙江中小企业矿泉水销售合同',
    updatedAt: new Date(),
    typeName: '销售合同',
    type: '3',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: '2017年场地租赁合同',
    // logo: avatars[0],
    description: '2018年关于上海市盛大广场办公场地租用合同',
    updatedAt: new Date(),
    typeName: '租赁合同',
    type: '4',
    href: '',
    memberLink: '',
  },
];

const progress = [
  {
    id: 'xxx5',
    title: '(小王)人事聘用合同',
    // logo: avatars[0],
    description:
      '根据《中华人民共和国劳动法》，甲乙双方经平等协商同意、自愿签订本合同，共向遵守本合同所列条款。',
    updatedAt: new Date(),
    typeName: '人事合同',
    type: '1',
    href: 'contract/status',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: '2018全年服务器采购合同',
    // logo: avatars[0],
    description: '2018年集团办公电脑采购合同',
    updatedAt: new Date(),
    typeName: '采购合同',
    type: '2',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx7',
    title: '2018年第一季度矿泉水销售合同',
    // logo: avatars[0],
    description: '2018年第一季度对浙江中小企业矿泉水销售合同',
    updatedAt: new Date(),
    typeName: '销售合同',
    type: '1',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx8',
    title: '2017年场地租赁合同',
    // logo: avatars[0],
    description: '2018年关于上海市盛大广场办公场地租用合同',
    updatedAt: new Date(),
    typeName: '租赁合同',
    type: '1',
    href: '',
    memberLink: '',
  },
];

export default {
  // 获取订立阶段的合同
  'GET /api/contract/process': progress,

  // 根据id获取订立阶段的合同
  'GET /api/contract/process/1': {},

  // 获取履行阶段的合同
  'GET /api/contract/carryout': carryout,

  // 根据id获取履行阶段的合同
  'GET /api/contract/carryout/1': {},
};
