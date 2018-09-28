import React, { PureComponent, Fragment } from 'react';
import { Card, Steps, Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './StepForm.less';

// import { Route, Redirect, Switch } from 'dva/router';
// import { getRoutes } from '@/utils/utils';

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const { location, children } = this.props;
    return (
      <PageHeaderWrapper tabActiveKey={location.pathname}>
        <Row gutter={24}>
          <Col xl={4} lg={12} md={20} sm={24} xs={24}>
            <Card bordered={false}>
              <Fragment>
                <Steps
                  current={this.getCurrentStep()}
                  className={styles.steps}
                  direction="vertical"
                >
                  <Step title="填写转账信息" />
                  <Step title="确认转账信息" />
                  <Step title="完成" />
                </Steps>
                {children}
              </Fragment>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
