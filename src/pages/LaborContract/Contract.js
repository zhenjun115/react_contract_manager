import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Tag, Icon, Button, List, Input, Form } from 'antd';

import StandardFormRow from '@/components/StandardFormRow';
import TagSelect from '@/components/TagSelect';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import router from 'umi/router';
import styles from './Contract.less';

const FormItem = Form.Item;

@connect(({ loading, laborContract }) => ({
  fetching: loading.effects['laborContract/fetch'],
  laborContract,
}))
@Form.create({
  onValuesChange(
    {
      dispatch,
      laborContract: { keyword },
    },
    changedValues,
    allValues
  ) {
    const { status } = allValues;
    // 设置合同状态值
    dispatch({
      type: 'laborContract/setParamStatus',
      payload: { status: status },
    });
    // 清空合同列表
    dispatch({
      type: 'laborContract/clearContractList',
      payload: {},
    });

    dispatch({
      type: 'laborContract/fetch',
      payload: {
        // 分页
        keyword: keyword,
        status: status,
      },
    });
  },
})
class Contract extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    // 发起请求
    dispatch({
      type: 'laborContract/fetch',
      payload: {},
    });
  }

  handleSearch = value => {
    const {
      dispatch,
      laborContract: { status },
    } = this.props;

    // 清空数据
    dispatch({
      type: 'laborContract/clearContractList',
      payload: {},
    });
    // 发起搜索请求
    dispatch({
      type: 'laborContract/fetch',
      payload: {
        keyword: value,
        status: status,
      },
    });
  };

  // 加载更多
  fetchMore = () => {
    const {
      dispatch,
      fetching,
      laborContract: { page, keyword },
    } = this.props;
    if (fetching) return;

    dispatch({
      type: 'laborContract/fetch',
      payload: {
        keyword: keyword,
        page: { pageIndex: page.pageIndex + 1, pageSize: page.pageSize },
      },
    });
  };

  // 查看合同详情
  viewContract = contractId => {
    router.push(`/labor_contract/view/${contractId}`);
  };

  render() {
    const {
      form,
      laborContract: { contracts },
      fetching,
      // match
    } = this.props;
    const { getFieldDecorator } = form;

    // 模版列表
    const ListContent = ({ data: { description /* , updatedAt, avatar, owner, href */ } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{description}</div>
        {/* <div className={styles.extra}>
          <Avatar src={avatar} size="small" />
          <a href={href}>{owner}</a> 发布在
          <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
        </div> */}
      </div>
    );

    // 下拉加载
    const loadMore =
      contracts.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {fetching ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              '加载更多'
            )}
          </Button>
        </div>
      ) : null;

    // 内容搜索
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="合同名称"
          enterButton="搜索"
          size="large"
          onSearch={value => this.handleSearch(value)}
          style={{ width: 522 }}
        />
      </div>
    );

    return (
      <PageHeaderWrapper content={mainSearch}>
        <Fragment>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('status')(
                    <TagSelect>
                      <TagSelect.Option value="progress">订立中</TagSelect.Option>
                      <TagSelect.Option value="carryout">履行中</TagSelect.Option>
                      <TagSelect.Option value="modified">变更中</TagSelect.Option>
                      <TagSelect.Option value="end">已作废</TagSelect.Option>
                    </TagSelect>
                  )}
                  {/* <Input type="text" /> */}
                </FormItem>
              </StandardFormRow>
            </Form>
          </Card>

          <Card
            style={{ marginTop: 24 }}
            bordered={false}
            bodyStyle={{ padding: '8px 32px 32px 32px' }}
          >
            <List
              size="large"
              loading={fetching}
              rowKey="contractId"
              itemLayout="vertical"
              loadMore={loadMore}
              dataSource={contracts}
              renderItem={item => (
                <List.Item
                  key={item.contractId}
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => this.viewContract(item.contractId)}
                      size="small"
                    >
                      查看合同
                    </Button>,
                  ]}
                  extra={<div className={styles.listItemExtra} />}
                >
                  <List.Item.Meta
                    title={
                      <div>
                        <a className={styles.listItemMetaTitle} href={item.href}>
                          {item.conname}
                        </a>
                      </div>
                    }
                    // TODO: 添加标签功能
                    description={
                      <span>
                        <Tag>人事合同</Tag>
                        <Tag>劳务合作</Tag>
                        <Tag>2018</Tag>
                      </span>
                    }
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </Fragment>
      </PageHeaderWrapper>
    );
  }
}

export default Contract;
