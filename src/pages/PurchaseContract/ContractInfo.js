import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import {
  Card,
  // Form,
  // Input,
  Icon,
  // Button,
  // Tree,
  Tabs,
  Skeleton,
  // Upload,
  // Progress,
  message,
  // Radio,
  // Avatar,
  // Dropdown,
  // Menu,
  // List,
  Timeline,
  // Progress,
  // Spin,
  // Result,
  Steps,
  Col,
  Row,
  notification,
} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TemplateInfo.less';

const { TabPane } = Tabs;

message.config({
  top: 100,
});

notification.config({
  top: 100,
  duration: 3,
});

@connect(({ purchaseTemplate }) => ({
  purchaseTemplate,
  // loading: loading.models.purchaseTemplate,
}))
class ContractInfo extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: { params },
    } = this.props;
    // const { contractId } = match.params;
    // 1.初始化模版数据
    dispatch({
      type: 'purchaseTemplate/initTemplateState',
    });

    // 2.加载模版数据
    dispatch({
      type: 'purchaseTemplate/fetchTemplate',
      payload: params.templateId,
    });

    // 3.加载文件附件列表
    // dispatch({
    // type: 'contractForm/fetchFiles',
    // payload: params.contractId,
    // });

    // 4.加载流程数据
    // dispatch({
    // type: 'contractForm/fetchProcess',
    // payload: params.contractId
    // });
    // TODO: 页面加载时、禁用submit按钮
  }

  componentDidUpdate() {
    // const {
    //   contractForm: { status },
    // } = this.props;
    // // TODO: 修复多次弹出错误
    // if (status === 'error') {
    //   this.openNotification('保存失败', '请核对');
    // }
  }

  openNotification = (msg, details) => {
    notification.open({
      message: msg,
      description: details,
    });
  };

  render() {
    const {
      purchaseTemplate: { template },
      // dispatch,
      // loading,
      // form,
      // match: { params },
    } = this.props;

    const desc = (
      <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
        <div style={{ margin: '8px 0 4px' }}>
          <FormattedMessage
            id="app.result.success.purchase.template.upload-file"
            defaultMessage="File"
          />
          <Icon type="file-word-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
        </div>
        <div style={{ margin: '8px 0 4px' }}>
          <FormattedMessage
            id="app.result.success.purchase.template.upload-operator"
            defaultMessage="User"
          />
          <Icon type="user-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
        </div>
        <div>
          <a href="">
            <FormattedMessage
              id="app.result.success.purchase.template.view"
              defaultMessage="View"
            />
          </a>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper>
        {/* <Spin spinning={{true}}> */}
        <Tabs type="card" tabPosition="right">
          <TabPane tab="合同模版" key="1">
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

          <TabPane tab="其他" key="4">
            <Card>
              <Skeleton avatar paragraph={{ rows: 4 }} />
            </Card>
          </TabPane>
        </Tabs>
        {/* </Spin> */}
      </PageHeaderWrapper>
    );
  }
}

export default ContractInfo;
