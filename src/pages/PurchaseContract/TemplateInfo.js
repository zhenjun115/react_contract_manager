import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi/locale';
import { Card, Icon, Tabs, Skeleton, message, Timeline, Steps, Col, Row, notification } from 'antd';
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

@connect(({ purchaseTemplate, loading }) => ({
  purchaseTemplate,
  loading: loading.models.purchaseTemplate,
}))
class TemplateInfo extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { templateId },
      },
    } = this.props;

    // console.log( "templateId", templateId );

    // 1.初始化模版数据
    dispatch({
      type: 'purchaseTemplate/initTemplateState',
    });

    // 2.加载模版数据
    dispatch({
      type: 'purchaseTemplate/fetchById',
      payload: { templateId: templateId },
    });

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

  // 查看pageoffice
  viewPageOffice = e => {
    e.preventDefault();
    const {
      purchaseTemplate: {
        template: { templateId },
      },
    } = this.props;
    this.openNotification('查看pageooffice', templateId);
    // TODO: 跳转到pageoofice
    // console.log( "查看pageoffice", templateId );
  };

  render() {
    const {
      purchaseTemplate: { template },
    } = this.props;

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
              defaultMessage={template.title}
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

export default TemplateInfo;
