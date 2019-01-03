import React, { Component, Fragment } from 'react';
// import moment from 'moment';
import { connect } from 'dva';
import {
  Form,
  Card,
  /* Select, */ List,
  Tag,
  Icon,
  /* Avatar, */ Row,
  /* Col, */ Button,
} from 'antd';
import router from 'umi/router';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import styles from './Template.less';

// const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

@connect(({ list, contractTemplate, contractForm, loading }) => ({
  list,
  contractTemplate,
  contractForm,
  loading: loading.models.list,
}))
@Form.create({
  // onValuesChange({ dispatch }, changedValues, allValues) {
  onValuesChange({ dispatch }, changedValues, allValues) {
    const { category } = allValues;
    // 表单项变化时请求数据
    // eslint-disable-next-line
    // 模拟查询表单生效
    dispatch({
      // type: 'list/fetch',
      type: 'contractTemplate/fetch',
      payload: {
        // 分页
        count: 5,
        catCodes: category,
      },
    });
  },
})
class Template extends Component {
  componentDidMount() {
    // console.info( this.props.match );
    const { dispatch, form, match } = this.props;
    const payload = {};
    if (match.params.type) {
      payload.catCodes = [match.params.type];
      form.setFieldsValue({ category: [match.params.type] });
    }

    dispatch({
      // type: 'list/fetch',
      type: 'contractTemplate/fetch',
      payload: Object.assign({ count: 5 }, payload),
    });
  }

  setOwner = () => {
    // const { form } = this.props;
    /* form.setFieldsValue({
      owner: ['hzj'],
    }); */
  };

  // 加载更多
  fetchMore = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  };

  createContract = templateId => {
    const { dispatch } = this.props;

    // 1. 向服务器发起请求、创建流程
    dispatch({
      type: 'contractForm/createDraft',
      payload: { templateId: templateId },
    });

    // console.log( "合同", contractForm );
    const {
      contractForm: { currenDraftId },
    } = this.props;

    // 2. 合同草稿创建成功后跳转到合同编辑页面
    router.push(`/contract/edit/${currenDraftId}`);
  };

  render() {
    const {
      form,
      // list: { list },
      contractTemplate: { list },
      loading,
      // match
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
      list.length > 0 ? (
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
                {getFieldDecorator('category')(
                  <TagSelect expandable>
                    <TagSelect.Option value="cat1">人事合同</TagSelect.Option>
                    <TagSelect.Option value="cat2">劳务合同</TagSelect.Option>
                    <TagSelect.Option value="cat3">租赁合同</TagSelect.Option>
                    <TagSelect.Option value="cat4">销售合同</TagSelect.Option>
                    <TagSelect.Option value="cat5">采购合同</TagSelect.Option>
                    <TagSelect.Option value="cat6">借款合同</TagSelect.Option>
                    <TagSelect.Option value="cat7">邀约合同</TagSelect.Option>
                    <TagSelect.Option value="cat8">对赌协议</TagSelect.Option>
                    <TagSelect.Option value="cat9">施工合同</TagSelect.Option>
                    <TagSelect.Option value="cat10">合作协议</TagSelect.Option>
                    <TagSelect.Option value="cat11">其他一</TagSelect.Option>
                    <TagSelect.Option value="cat12">其他二</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="其它选项" grid last>
              <Row gutter={16}>
                {/* <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="活跃用户">
                    {getFieldDecorator('user', {})(
                      <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="lisa">李三</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="好评度">
                    {getFieldDecorator('rate', {})(
                      <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="good">优秀</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col> */}
              </Row>
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
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.templateId}
                actions={[
                  // <IconText type="star-o" text={item.star} />,
                  // <IconText type="like-o" text={item.like} />,
                  // <IconText type="message" text={item.message} />,
                  // <Button>使用模版</Button>
                  <Button type="primary" onClick={() => this.createContract(item.templateId)}>
                    使用模版
                  </Button>,
                ]}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={
                    <div>
                      <a className={styles.listItemMetaTitle} href={item.href}>
                        {item.title}
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

export default Template;
