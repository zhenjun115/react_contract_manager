import React, { Component, Fragment } from 'react';
// import moment from 'moment';
import { connect } from 'dva';
import { Form, Card, List, Tag, Icon, Button } from 'antd';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import styles from './Contract.less';

const FormItem = Form.Item;

@connect(({ contract }) => ({
  contract,
}))
@Form.create({
  // onValuesChange({ dispatch }, changedValues, allValues) {
  onValuesChange({ dispatch }, changedValues, allValues) {
    const { catCode, status } = allValues;

    dispatch({
      type: 'contract/clearContracts',
      payload: {},
    });

    // 设置查询参数
    dispatch({
      type: 'contract/setParams',
      payload: {
        status: status,
        catCode: catCode,
      },
    });

    dispatch({
      type: 'contract/fetch',
      payload: {
        status: status,
        catCode: catCode,
      },
    });
  },
})
class Contract extends Component {
  componentDidMount() {
    const {
      dispatch,
      form,
      match: {
        params: { status },
      },
    } = this.props;

    // 初始化
    dispatch({
      type: 'contract/init',
    });

    if (status) {
      form.setFieldsValue({ status: [status] });
    }

    // 设置 status
    dispatch({
      type: 'contract/setParams',
      payload: {
        status: [status],
      },
    });

    dispatch({
      type: 'contract/fetch',
      payload: {
        status: [status],
      },
    });
  }

  fetchMore = () => {
    const {
      dispatch,
      contract: { page, status, catCode },
    } = this.props;

    dispatch({
      type: 'contract/clearContracts',
      payload: {},
    });

    dispatch({
      type: 'contract/fetch',
      payload: {
        status: status,
        catCode: catCode,
        page: { pageIndex: page.pageIndex + 1 },
      },
    });
  };

  viewContract = templateId => {
    console.log('view contract', templateId);
    // const { dispatch } = this.props;

    // 1. 向服务器发起请求、创建流程
    // dispatch({
    //   type: 'contractForm/createDraft',
    //   payload: { "templateId": templateId },
    // });

    // const {
    //   contractForm: { currenDraftId },
    // } = this.props;

    // 2. 合同草稿创建成功后跳转到合同编辑页面
    // router.push(`/contract/edit/${currenDraftId}`);
  };

  render() {
    const {
      form,
      contract: { contracts },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;

    const ListContent = ({ data: { content /* , updatedAt, avatar, owner, href */ } }) => (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        {/* <div className={styles.extra}>
          <Avatar src={avatar} size="small" />
          <a href={href}>{owner}</a> 发布在
          <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
        </div> */}
      </div>
    );

    const loadMore =
      contracts.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
            {loading ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              '加载更多'
            )}
          </Button>
        </div>
      ) : null;

    return (
      <Fragment>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('catCode')(
                  <TagSelect expandable>
                    <TagSelect.Option value="cat_1">采购合同</TagSelect.Option>
                    <TagSelect.Option value="cat_2">劳务合同</TagSelect.Option>
                    <TagSelect.Option value="cat_3">租赁合同</TagSelect.Option>
                    <TagSelect.Option value="cat_4">销售合同</TagSelect.Option>
                    <TagSelect.Option value="cat_5">人事合同</TagSelect.Option>
                    <TagSelect.Option value="cat_6">借款合同</TagSelect.Option>
                    <TagSelect.Option value="cat_7">邀约合同</TagSelect.Option>
                    <TagSelect.Option value="cat_8">对赌协议</TagSelect.Option>
                    <TagSelect.Option value="cat_9">施工合同</TagSelect.Option>
                    <TagSelect.Option value="cat_10">合作协议</TagSelect.Option>
                    <TagSelect.Option value="cat_11">其他一</TagSelect.Option>
                    <TagSelect.Option value="cat_12">其他二</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="合同状态" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('status')(
                  <TagSelect expandable={false}>
                    <TagSelect.Option value="progress">订立中</TagSelect.Option>
                    <TagSelect.Option value="carryout">履行中</TagSelect.Option>
                    <TagSelect.Option value="working">已生效</TagSelect.Option>
                    <TagSelect.Option value="ended">已作废</TagSelect.Option>
                  </TagSelect>
                )}
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
            loading={loading}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={contracts}
            renderItem={item => (
              <List.Item
                key={item.contractId}
                actions={[
                  // <IconText type="star-o" text={item.star} />,
                  // <IconText type="like-o" text={item.like} />,
                  // <IconText type="message" text={item.message} />,
                  // <Button>使用模版</Button>
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
    );
  }
}

export default Contract;
