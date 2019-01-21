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
  onValuesChange({ dispatch }, changedValues, allValues) {
    const { category } = allValues;
    // console.log( "请求数据--所属类目:", category );
    // 表单项变化时请求数据
    // TODO: 修改查询条件
    dispatch({
      type: 'contractContract/fetch',
      payload: {
        // 分页
        count: 5,
        catCodes: category,
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
    const { dispatch } = this.props;
    dispatch({
      type: 'laborContract/fetch',
      payload: { keyword: value },
    });
  };

  // 加载更多
  fetchMore = () => {
    const { dispatch, fetching } = this.props;
    if (fetching) return;
    dispatch({
      type: 'laborContract/fetch',
      payload: {
        // count: pageSize,
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
                  {getFieldDecorator('category')(
                    <TagSelect>
                      <TagSelect.Option value="cat1">订立中</TagSelect.Option>
                      <TagSelect.Option value="cat2">履行中</TagSelect.Option>
                      <TagSelect.Option value="cat3">变更中</TagSelect.Option>
                      <TagSelect.Option value="cat4">已作废</TagSelect.Option>
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
                    <Button type="primary" onClick={() => this.viewContract(item.contractId)}>
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
