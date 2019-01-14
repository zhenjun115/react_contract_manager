import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Card, Tree, Steps, Icon, Button } from 'antd';
import { FormattedMessage } from 'umi/locale';
import Result from '@/components/Result';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

class TemplateFile extends PureComponent {
  render() {
    const desc1 = (
      <div
        style={{
          fontSize: 12,
          color: 'rgba(0, 0, 0, 0.45)',
          position: 'relative',
          left: 42,
          textAlign: 'left',
        }}
      >
        <div style={{ margin: '8px 0 4px' }}>
          创建模版
          <Icon style={{ marginLeft: 8 }} type="dingding-o" />
        </div>
        <div>2016-12-12 12:32</div>
      </div>
    );

    const desc2 = (
      <div style={{ fontSize: 12, position: 'relative', left: 42, textAlign: 'left' }}>
        <div style={{ margin: '8px 0 4px' }}>
          法务审核通过
          <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
        </div>
        <div>2016-12-12 12:32</div>
      </div>
    );

    const extra = (
      <Fragment>
        <div
          style={{
            fontSize: 16,
            color: 'rgba(0, 0, 0, 0.85)',
            fontWeight: '500',
            marginBottom: 20,
          }}
        >
          模版名称
        </div>

        <Row style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>模版编号:&nbsp;&nbsp;</span>
            23421
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
              <FormattedMessage id="app.result.success.principal" defaultMessage="Principal：" />
            </span>
            <FormattedMessage id="app.result.success.step1-operator" defaultMessage="Qu Lili" />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
              <FormattedMessage
                id="app.result.success.operate-time"
                defaultMessage="Effective time："
              />
            </span>
            2016-12-12 ~ 2017-12-12
          </Col>
        </Row>
        <Steps style={{ marginLeft: -42, width: 'calc(100% + 84px)' }} progressDot current={1}>
          <Steps.Step title={<span style={{ fontSize: 14 }}>创建模版</span>} description={desc1} />
          <Steps.Step title={<span style={{ fontSize: 14 }}>法务审核</span>} description={desc2} />
          <Steps.Step
            title={
              <span style={{ fontSize: 14 }}>
                <FormattedMessage
                  id="app.result.success.step3-title"
                  defaultMessage="Financial review"
                />
              </span>
            }
          />
          <Steps.Step
            title={
              <span style={{ fontSize: 14 }}>
                <FormattedMessage id="app.result.success.step4-title" defaultMessage="Finish" />
              </span>
            }
          />
        </Steps>
      </Fragment>
    );

    const actions = (
      <Fragment>
        <Button>查看模版</Button>
      </Fragment>
    );

    return (
      <PageHeaderWrapper>
        <Row gutter={24}>
          <Col span={6}>
            <Card>
              <Tree.DirectoryTree
                multiple
                defaultExpandAll
                onSelect={this.onSelect}
                onExpand={this.onExpand}
              >
                <Tree.TreeNode title="劳务模版" key="0-0">
                  <Tree.TreeNode title="模版一" key="0-0-0" isLeaf />
                  <Tree.TreeNode title="模版二" key="0-0-1" isLeaf />
                </Tree.TreeNode>

                <Tree.TreeNode title="采购模版" key="0-1">
                  <Tree.TreeNode title="模版一" key="0-1-0" isLeaf />
                  <Tree.TreeNode title="模版二" key="0-1-1" isLeaf />
                </Tree.TreeNode>
              </Tree.DirectoryTree>
            </Card>
          </Col>
          <Col span={18}>
            <Card bordered={false}>
              <Result
                // type="success"
                // title={formatMessage({ id: 'app.result.success.title' })}
                // description={formatMessage({ id: 'app.result.success.description' })}
                extra={extra}
                actions={actions}
                style={{ marginTop: 48, marginBottom: 16 }}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default TemplateFile;
