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
      },
      4: {
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
      5: {
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
      // const { name, price, size } = record;
      let { cart } = this.state;
      // 在购物车列表中查找当前点击商品的key，查到则进行加1，否则购物车添加一个新的商品
      const index = cart.findIndex(item => item.key === record.key);
      index >= 0
        ? cart.splice(index, 1, {
            ...cart[index],
            count: cart[index].count + 1
          })
        : (cart = [
            ...cart,
            {
              ...record,
              count: 1
            }
          ]);
      this.setState({
        cart
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
            <Button
              className={style["cart-btn"]}
              onClick={() => handleDecrease(record)}
            >
              -
            </Button>
            <span>{record.count}</span>
            <Button
              className={style["cart-btn"]}
              onClick={() => handleIncrease(record)}
            >
              +
            </Button>
          </span>
        )
      },
      {
        key: "name",
        title: "品种",
        dataIndex: "name"
      },
      {
        key: "price",
        title: "价格",
        dataIndex: "price"
      }
    ];

    // 减
    const handleDecrease = record => {
      let { cart } = this.state;
      // 获取当前点击的行在数组中的下标
      const index = cart.findIndex(item => item.key === record.key);
      // 当前点击行的数据
      const current = cart[index];
      // 当数量小于等于1时，购物车移除该商品,否则商品数量减1
      if (current.count <= 1) {
        cart.splice(index, 1);
      } else {
        cart.splice(index, 1, {
          ...current,
          count: current.count - 1
        });
      }
      this.setState({
        cart
      });
    };
    // 增
    const handleIncrease = record => {
      let { cart } = this.state;
      const index = cart.findIndex(item => item.key === record.key);
      const current = cart[index];
      // 商品数量加1
      cart.splice(index, 1, {
        ...current,
        count: current.count + 1
      });
      this.setState({
        cart
      });
    };

    return (
      <Table
        columns={columns}
        dataSource={this.state.cart}
        pagination={false}
        className="menus-table cart"
        locale={{
          emptyText: "购物车没有任何商品"
        }}
      />
    );
  }

  render() {
    // 总价
    const totalPrice = this.state.cart.reduce(
      (total, item) => (total += item.price * item.count),
      0
    );
    console.log(totalPrice);
    return (
      <Row>
        <Col sm={24} md={16}>
          {this.renderMenusTable()}
        </Col>
        <Col sm={24} md={8}>
          {this.renderCartTable()}
          <p className={style["total-price"]}>总价：{totalPrice} RMB</p>
          <Button type="primary" className={style["submit-btn"]}>
            提交
          </Button>
        </Col>
      </Row>
    );
  }
}

export default index;
