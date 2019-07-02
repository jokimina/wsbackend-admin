import React, { Component } from 'react';
import {
  Search,
  Table,
  Pagination,
  Button,
  Message,
  Select,
} from '@alifd/next';
import { fetchWaste, reloadWaste, auditWaste } from '../../../api/home';
import { wasteArr } from '../../../utils/waste';


import styles from '../index.module.scss';

const selectDatasource = wasteArr.map((v, i) => {
  return { label: v, value: i + 1 };
});

const PAGESIZE = 20;

class AuditTable extends Component {
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
        // render: (dataIndex, value) => {
        //   const i = parseInt(value, 0);
        //   return i < 0 ? i : getWasteNameByIndex(i - 1);
        // },
        render: (dataIndex, value, index) => {
          return (
            <Select
              name={dataIndex}
              aria-label="tag mode"
              mode="single"
              onChange={this.onCatChange.bind(this, index)}
              defaultValue={value}
              dataSource={selectDatasource}
              style={{ width: '100%' }}
            />
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (dataIndex, value, index, record) => {
          return (
            <span>
              <Button type="primary" onClick={this.auditPass.bind(this, index, record)} style={{ marginRight: '3px' }}>
                通过
              </Button>
              <Button type="primary" onClick={this.auditDeny.bind(this, index, record)} warning>拒绝</Button>
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
    const result = await fetchWaste({ offset, limit, name, page, status: 'pending' });
    const { data } = result;
    await this.setState({
      dataSource: data.records,
      total: data.total_record,
      isTableLoading: false,
      name,
    });
  }

  auditPass = (index, record) => {
    const dataSource = this.state.dataSource;
    const cats = dataSource[index].cats;
    auditWaste({ ID: record.ID, cats, status: 'online' }).then(() => {
      Message.success('通过成功');
    });
    delete dataSource[index];
    this.setState({ dataSource });
  }

  auditDeny = (index, record) => {
    const dataSource = this.state.dataSource;
    const cats = dataSource[index].cats;
    auditWaste({ ID: record.ID, cats, status: 'deny' }).then(() => {
      Message.success('拒绝成功');
    });
    delete dataSource[index];
    this.setState({ dataSource });
  }

  onCatChange = (index, value) => {
    const dataSource = this.state.dataSource;
    dataSource[index].cats = value;
    this.setState({
      dataSource,
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
      <div style={{ marginTop: '20px' }}>
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
    );
  }
}

export default AuditTable;
