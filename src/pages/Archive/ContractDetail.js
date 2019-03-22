import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
  Comment,
  Avatar
} from 'antd';
import moment from 'moment';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ContractDetail.less';
// import { NONAME } from 'dns';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <ButtonGroup>
      <Button onClick={ this.sendMsg }>归档退回</Button>
      {/* <Button>操作</Button> */}
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">完成归档</Button>
  </Fragment>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>待归档</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>归档人</div>
      <div className={styles.heading}>xxxx</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="创建人">hzj13693</Description>
    <Description term="合同名称">和hzj13693签订的劳务合同</Description>
    <Description term="创建时间">2017-07-07</Description>
    <Description term="关联合同">
      <a href="">xxxxxxxxxxxxxxx</a>
    </Description>
    {/* <Description term="生效日期">2017-07-07 ~ 2017-08-08</Description> */}
    <Description term="备注">请尽快确认</Description>
  </DescriptionList>
);

const tabList = [
  {
    key: 'detail',
    tab: '详情',
  },
  // {
  //   key: 'rule',
  //   tab: '附件',
  // },
];

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (dot, { status }) =>
  status === 'process' ? (
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
  ) : (
    dot
  );

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志',
  },
  // {
  //   key: 'tab2',
  //   tab: '操作日志二',
  // },
  // {
  //   key: 'tab3',
  //   tab: '操作日志三',
  // },
];

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'agree' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="error" text="驳回" />
      ),
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
class ContractDetail extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAdvanced',
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const { stepDirection, operationkey } = this.state;
    const { profile, loading } = this.props;
    // const { advancedOperation1, advancedOperation2, advancedOperation3 } = profile;
    const advancedOperation1 = [
      { type: '归档完成', name: 'hzj13693', status: 'agree', updatedAt: '2019-09-01 00:21:03', memo: '操作完成' },
      { type: '提醒', name: 'hzj13693', status: 'success', updatedAt: '2019-09-01 00:21:03', memo: '合同文件缺失、模版文件缺失' },
    ]
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      // tab2: (
      //   <Table
      //     pagination={false}
      //     loading={loading}
      //     dataSource={advancedOperation2}
      //     columns={columns}
      //   />
      // ),
      // tab3: (
      //   <Table
      //     pagination={false}
      //     loading={loading}
      //     dataSource={advancedOperation3}
      //     columns={columns}
      //   />
      // ),
    };

    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1101431_tu350fqxtw.js'
    });

    return (
      <PageHeaderWrapper
        title="合同编号：xxxxxxxxxxxxxxxxxx"
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={action}
        content={description}
        extraContent={extra}
        tabList={tabList}
      >
        {/* <Card title="流程进度" style={{ marginBottom: 24 }} bordered={false}>
          <Steps direction={stepDirection} progressDot={customDot} current={1}>
            <Step title="创建项目" description={desc1} />
            <Step title="部门初审" description={desc2} />
            <Step title="财务复核" />
            <Step title="完成" />
          </Steps>
        </Card> */}
        <Card title="合同信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="甲方信息">hzj13693</Description>
            {/* <Description term="会员卡号">32943898021309809423</Description> */}
            <Description term="身份证">3321944288191034921</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="联系地址">
              hzj13693 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
            </Description>
          </DescriptionList>
          <Divider style={{ margin: '16px 0' }} />
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="已方信息">第三方公司</Description>
            {/* <Description term="会员卡号">32943898021309809423</Description> */}
            <Description term="身份证">3321944288191034921</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="联系地址">
              hzj13693 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
            </Description>
          </DescriptionList>
          <Divider style={{ margin: '16px 0' }} />
          {/* <DescriptionList style={{ marginBottom: 24 }}>
            <Description>
              <IconFont type="icon-shapes-copy" style={{ marginRight: 5 }} />
              <a href=''>hzj13693</a> 上传了合同
              <a href=''> xxxxx </a>
              <em>{moment('2019-09-01 12:02:21').format('YYYY-MM-DD HH:mm')}</em>
            </Description>
          </DescriptionList> */}
          <ul className="fileList" style={{marginTop: 24, listStyle: 'none', padding: 0}}>
            <li style={{ marginTop: 16}}>
              <IconFont type="icon-shapes-copy" style={{ marginRight: 5 }} />
              <a href=''>hzj13693</a> 上传了附件
              <a href=''> xxxxx </a>
              <em>{moment('2019-09-01 12:02:21').format('YYYY-MM-DD HH:mm')}</em>
            </li>
            <li style={{ marginTop: 16}}>
              <IconFont type="icon-shapes-copy" style={{ marginRight: 5 }} />
              <a href=''>hzj13693</a> 上传了附件
              <a href=''> xxxxx </a>
              <em>{moment('2019-09-01 12:02:21').format('YYYY-MM-DD HH:mm')}</em>
            </li>
            <li style={{ marginTop: 16}}>
              <IconFont type="icon-shapes-copy" style={{ marginRight: 5 }} />
              <a href=''>hzj13693</a> 上传了附件
              <a href=''> xxxxx </a>
              <em>{moment('2019-09-01 12:02:21').format('YYYY-MM-DD HH:mm')}</em>
            </li>
          </ul>
          {/* <DescriptionList style={{ marginBottom: 24 }} title="信息组">
            <Description term="某某数据">725</Description>
            <Description term="该数据更新时间">2017-08-08</Description>
            <Description>&nbsp;</Description>
            <Description
              term={
                <span>
                  某某数据
                  <Tooltip title="数据说明">
                    <Icon
                      style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                      type="info-circle-o"
                    />
                  </Tooltip>
                </span>
              }
            >
              725
            </Description>
            <Description term="该数据更新时间">2017-08-08</Description>
          </DescriptionList> */}
          {/* <h4 style={{ marginBottom: 16 }}>变更记录</h4> */}
          {/* <Card type="inner" title="子合同" style={{marginTop: 24}}> */}
            {/* <DescriptionList size="small" style={{ marginBottom: 16 }} title="组名称">
              <Description term="负责人">林东东</Description>
              <Description term="角色码">1234567</Description>
              <Description term="所属部门">XX公司 - YY部</Description>
              <Description term="过期时间">2017-08-08</Description>
              <Description term="描述">
                这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
              </Description>
            </DescriptionList> */}
            {/* <Divider style={{ margin: '16px 0' }} /> */}
            {/* <DescriptionList size="small" style={{ marginBottom: 16 }} title="合同名称" col="1">
              <Description term="文件">
                <a href="">签约主体变更</a>
              </Description>
            </DescriptionList> */}
            {/* <Divider style={{ margin: '16px 0' }} />
            <DescriptionList size="small" title="组名称">
              <Description term="负责人">付小小</Description>
              <Description term="角色码">1234568</Description>
            </DescriptionList> */}
          {/* </Card> */}
        </Card>
        {/* <Card title="用户近半年来电记录" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />
            暂无数据
          </div>
        </Card> */}
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[operationkey]}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ContractDetail;