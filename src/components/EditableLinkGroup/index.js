import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import styles from './index.less';

// TODO: 添加逻辑

class EditableLinkGroup extends PureComponent {
  static propTypes = {
    links: PropTypes.array,
    onAdd: PropTypes.func,
    linkElement: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  };

  static defaultProps = {
    links: [],
    onAdd: () => {},
    linkElement: 'a',
  };

  render() {
    const { links, linkElement, onAdd } = this.props;
    return (
      <div className={styles.linkGroup}>
        {links.map(link =>
          createElement(
            linkElement,
            {
              key: `linkGroup-item-${link.id || link.title}`,
              to: link.href,
              href: link.href,
            },
            <Icon type="plus" />,
            link.title
          )
        )}
        {
          <Button size="small" type="primary" ghost onClick={onAdd}>
            其他
          </Button>
        }
      </div>
    );
  }
}

export default EditableLinkGroup;
