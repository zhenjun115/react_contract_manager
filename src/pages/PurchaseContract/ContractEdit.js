import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import {
  Card,
  Icon,
  Tabs,
  Skeleton,
  message,
  Timeline,
  Steps,
  Col,
  Row,
  notification,
  Form,
  Input,
} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import './ContractEdit.less';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const { TextArea } = Input;

message.config({
  top: 100,
});

notification.config({
  top: 100,
  duration: 3,
});

@connect(({ purchaseContract, loading }) => ({
  purchaseContract,
  loading: loading.models.purchaseContract,
}))
@Form.create()
class ContractEdit extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;

    // 1.加载合同数据
    dispatch({
      type: 'purchaseContract/fetchById',
      payload: { contractId: params.contractId },
    });

    // 2.加载模版参数
    // dispatch({
    //   type: 'purchaseTemplate/fetchParamsByTemplateId',
    //   payload: { templateId: params.templateId },
    // });
  }

  openNotification = (msg, details) => {
    notification.open({
      message: msg,
      description: details,
    });
  };

  // 查看pageoffice
  viewPageOffice = e => {
    e.preventDefault();
    const {
      purchaseContract: {
        contract: { contractId },
      },
    } = this.props;

    window.open(`http://127.0.0.1:8080/pageoffice/demoContract?contractId=${contractId}`);
  };

  render() {
    const {
      purchaseContract: { contract },
    } = this.props;

    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 2 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 },
    //     md: { span: 16 },
    //   },
    // };

    const desc = (
      <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
        <div style={{ margin: '8px 0 4px' }}>
          <FormattedMessage
            id="app.result.success.purchase.template.upload-operator"
            defaultMessage="User"
          />
          <Icon type="user-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
        </div>
        <div>
          <a href="" onClick={this.viewPageOffice}>
            <FormattedMessage
              id="app.result.success.purchase.template.view"
              defaultMessage={contract.title}
            />
            <Icon type="file-word-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
          </a>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper>
        {/* <Spin spinning={{true}}> */}
        <Tabs type="card" tabPosition="right">
          {/* <TabPane tab="基础信息" key="1"> */}
            {/* <Card bordered={false}>
              <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                <FormItem {...formItemLayout} label="文件名称">
                  <Input placeholder="请输入模版名称" value={contract.title} />
                </FormItem>

                <FormItem {...formItemLayout} label="文档简介">
                  <TextArea
                    style={{ minHeight: 32 }}
                    placeholder="请输入劳务合同模版简介"
                    rows={4}
                    value={contract.content}
                  />
                </FormItem>

                <FormItem {...submitFormLayout} style={{ marginTop: 16 }}>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </FormItem>
              </Form>
            </Card> */}

            {/* <Card bordered={false}>
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  {
                    templateParams.map( item => (
                      <Col span={12} key={item.paramId} offset={2}>
                        <Form.Item label={item.description}>
                          <Input placeholder={item.name} />
                        </Form.Item>
                      </Col>
                    ) )
                  }
                </Row>
              </Form>
            </Card> */}
          {/* </TabPane> */}
          <TabPane tab="模版变更" key="1">
            <Card>
              <Timeline pending="  " reverse={false}>
                <Timeline.Item>
                  {/* <Row>
                    <Col span={12}>文件上传</Col>
                  </Row> */}
                  <Row>
                    <Col span={12}>
                      <Steps
                        style={{ marginLeft: -42, marginTop: 8, width: 'calc(100% + 84px)' }}
                        progressDot
                        current={1}
                      >
                        <Steps.Step
                          title={
                            <span style={{ fontSize: 14 }}>
                              <FormattedMessage
                                id="app.result.success.purchase.template.upload-title"
                                // defaultMessage="Departmental preliminary review"
                              />
                              {/* { contract.conname } */}
                            </span>
                          }
                          description={desc}
                        />
                      </Steps>
                    </Col>
                  </Row>
                </Timeline.Item>
                {/* <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item> */}
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} />
                {/* <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item> */}
              </Timeline>
            </Card>
          </TabPane>

          <TabPane tab="其他" key="2">
            <Card>
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
          </TabPane>
        </Tabs>
      </PageHeaderWrapper>
    );
  }
}

export default ContractEdit;