import React, { Component } from 'react';
import {
  Search,
  Table,
  Pagination,
  Button,
  Breadcrumb,
  Message,
} from '@alifd/next';
import DeleteBalloon from './components/DeleteBalloon';
import EditDialog from './components/EditDialog';
import { fetchWaste, reloadWaste } from '../../api/home';
import { getWasteNameByIndex } from '../../utils/waste';


import styles from './index.module.scss';

const PAGESIZE = 10;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTableLoading: true,
      dataSource: [],
      current: 1,
      pageSize: 20,
      total: 0,
      name: '',
      value: '',
    };
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'ID',
      },
      {
        title: '创建时间',
        dataIndex: 'CreatedAt',
      },
      {
        title: '更新时间',
        dataIndex: 'UpdatedAt',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '首字母',
        dataIndex: 'fl',
      },
      {
        title: '全拼',
        dataIndex: 'qp',
      },
      {
        title: '类型',
        dataIndex: 'cats',
        render: (dataIndex, value) => {
          const i = parseInt(value, 0);
          return i < 0 ? i : getWasteNameByIndex(i - 1);
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (dataIndex, value, index, record) => {
          return (
            <span>
              <EditDialog
                index={index}
                record={record}
                projectSelect={this.state.projectSelect}
                getFormValues={this.getFormValues}
                columns={this.columns}
              />
              <DeleteBalloon
                handleRemove={() => this.handleRemove(value, index, record)}
              />
            </span>
          );
        },
      },
    ];
  }

  componentDidMount() {
    this.init();
  }

  async init({
    offset = this.getOffset(this.state.current),
    limit = this.state.pageSize,
    page = this.state.current,
    name = this.state.name } = {}) {
    const result = await fetchWaste({ offset, limit, name, page });
    const { data } = result;
    await this.setState({
      dataSource: data.records,
      total: data.total_record,
      isTableLoading: false,
      name,
    });
  }

  getOffset = (current) => {
    return (current - 1) * this.state.pageSize;
  }

  onPaginationChange = (page) => {
    this.setState(
      {
        current: page,
        isTableLoading: true,
      }
    );
    this.init({ offset: this.getOffset(page), page });
  };

  onSearch = () => {
    const name = this.state.value;
    this.init({ name });
  };

  onInputChange = (value) => {
    this.setState({ value });
  };

  getFormValues = (dataIndex, values) => {
    const { dataSource } = this.state;
    dataSource[dataIndex] = values;
    this.setState({
      dataSource,
    });
  };

  defaultCellRender = (dataIndex, value) => value

  reloadData = () => {
    reloadWaste().then(() => {
      Message.success('数据已刷新');
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumb className={styles.Breadcrumb}>
          <Breadcrumb.Item>垃圾分类管理</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.content}>
          <div className={styles.head}>
            <Search
              type="primary"
              placeholder="中文名／ID"
              value={this.state.value}
              onChange={this.onInputChange}
              onSearch={this.onSearch}
              searchText="搜索"
            />
            <Button type="primary" onClick={this.reloadData}>
              更新数据
            </Button>
            <EditDialog
              columns={this.columns}
              text="新增"
            />
          </div>
          <Table
            dataSource={this.state.dataSource}
            hasBorder={false}
            loading={this.state.isTableLoading}
          >
            {
              this.columns.map((column) => {
                if (('show' in column) && !column.show) return null;
                let cellRender = this.defaultCellRender;
                if (typeof column.render === 'function') {
                  cellRender = column.render;
                }
                return (
                  <Table.Column
                    title={column.title}
                    key={column.dataIndex}
                    dataIndex={column.dataIndex}
                    cell={cellRender.bind(this, column.dataIndex)}
                  />
                );
              })
            }
          </Table>
          <Pagination
            className={styles.pagination}
            current={this.state.current}
            onChange={this.onPaginationChange}
            total={this.state.total}
            pageSize={PAGESIZE}
          />
        </div>
      </div>
    );
  }
}

export default Home;
