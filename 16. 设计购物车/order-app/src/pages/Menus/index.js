import React, { Component } from "react";
import { Table, Icon, Button, Row, Col } from "antd";
import style from "./index.scss";

export class index extends Component {
  state = {
    cart: []
  };

  // 渲染菜单列表
  renderMenusTable() {
    // 如果没有price数据，则不渲染该列td
    const renderContent = (text, record) => {
      const obj = {
        children: text,
        props: {}
      };
      if (!record.price) {
        obj.props.colSpan = 0;
      }
      return obj;
    };

    let data = {
      1: {
        name: "榴莲pizza",
        description: "这是喜欢吃榴莲朋友的最佳选择",
        options: [
          {
            size: 9,
            price: 38
          },
          {
            size: 12,
            price: 48
          }
        ]
      },
      2: {
        name: "芝士pizza",
        description: "芝士杀手,浓浓的芝士丝, 食欲瞬间爆棚",
        options: [
          {
            size: 9,
            price: 38
          },
          {
            size: 12,
            price: 48
          }
        ]
      },
      3: {
        name: "夏威夷pizza",
        description: "众多人的默认选择",
        options: [
          {
            size: 9,
            price: 36
          },
          {
            size: 12,
            price: 46
          }
        ]
      }
    };

    // 表格数据
    const dataSource = [];
    // 处理表格数据格式
    for (let item in data) {
      const items = data[item];
      // 把name放在size的位置便于antd的Table组件渲染
      dataSource.push({
        key: items.name,
        size: items.name
      });

      items.options.forEach((ele, index) => {
        dataSource.push({
          key: item + "-" + index,
          name: items.name,
          ...ele
        });
      });
    }

    // 表头列数据
    const columns = [
      {
        key: "size",
        title: "尺寸",
        dataIndex: "size",
        render: (text, record) => {
          // 如果没有价格price的数据，则size占三列
          if (record.price) {
            return <span>{text}</span>;
          }
          return {
            children: <strong>{text}</strong>,
            props: {
              colSpan: 3
            }
          };
        }
      },
      {
        key: "price",
        title: "价格",
        dataIndex: "price",
        render: renderContent
      },
      {
        key: "action",
        title: "加入",
        render: (text, record) => {
          // 如果没有price数据，则“加入”该列td不渲染
          const obj = {
            children: (
              <Button
                className={style["add-btn"]}
                onClick={() => handleAddMenus(record)}
              >
                <Icon type="plus" />
              </Button>
            ),
            props: {}
          };
          if (!record.price) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      }
    ];

    // "加入"点击事件
    const handleAddMenus = record => {
      // console.log(record);
      const { name, price, size } = record;
      this.setState({
        cart: [
          ...this.state.cart,
          {
            name,
            price,
            size,
            count: 1
          }
        ]
      });
    };

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        className="menus-table"
      />
    );
  }

  // 渲染购物车列表
  renderCartTable() {
    const columns = [
      {
        key: "count",
        title: "数量",
        dataIndex: "count",
        render: (text, record) => (
          <span>
            <Button className={style["cart-btn"]}>-</Button>
            <span>1</span>
            <Button className={style["cart-btn"]}>+</Button>
          </span>
        )
      },
      {
        key: "name",
        title: "菜单",
        dataIndex: "name"
      },
      {
        key: "price",
        title: "价格",
        dataIndex: "price"
      }
    ];

    return (
      <Table
        columns={columns}
        dataSource={this.state.cart}
        pagination={false}
        className="menus-table cart"
      />
    );
  }

  render() {
    return (
      <Row>
        <Col sm={24} md={16}>
          {this.renderMenusTable()}
        </Col>
        <Col sm={24} md={8}>
          {this.renderCartTable()}
          <p className={style["total-price"]}>总价：</p>
          <Button type="primary" className={style["submit-btn"]}>
            提交
          </Button>
        </Col>
      </Row>
    );
  }
}

export default index;
