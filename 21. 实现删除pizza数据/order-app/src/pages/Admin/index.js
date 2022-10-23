import React, { Component } from "react";
import { Row, Col, Table, Button, Message } from "antd";
import NewPizza from "./NewPizza";
import style from "./index.scss";
// axios封装函数Request
import Request from "Utils/Request";

export class index extends Component {
  state = {
    menus: []
  };

  componentDidMount() {
    this.getMenusData();
  }

  getMenusData = () => {
    Request("/menu.json").then(res => {
      if (res && res.status == 200 && res.data) {
        const { data } = res;
        this.setState(() => {
          const menus = [];
          for (let item in data) {
            menus.push({
              key: item,
              name: data[item].name
            });
          }
          return {
            menus
          };
        });
      }
    });
  };

  // 渲染右侧菜单列表
  renderMenuTable() {
    // console.log(this.state.menus);
    const columns = [
      {
        key: "name",
        dataIndex: "name",
        title: "品种"
      },
      {
        key: "action",
        title: "删除",
        render: (text, record) => (
          <Button
            className={style["del-btn"]}
            onClick={() => handleDelete(record)}
          >
            <span>×</span>
          </Button>
        )
      }
    ];
    // 点击删除事件
    const handleDelete = record => {
      Request(`/menu/${record.key}.json`, {
        method: "delete"
      }).then(res => {
        if (res && res.status == 200) {
          Message.success("删除成功！");
          // 删除成功跳转至menus
          window.location.href = "/#/menus";
        } else {
          Message.error("删除失败！");
        }
      });
    };
    return (
      <Table
        className="menus-table"
        columns={columns}
        dataSource={this.state.menus}
        pagination={false}
        locale={{
          emptyText: "菜单没有任何品种"
        }}
      />
    );
  }

  // 渲染左侧表单 “添加新的pizza”
  renderNewPizza() {
    return <NewPizza />;
  }

  render() {
    return (
      <Row className={style.admin}>
        <Col sm={24} md={16} className={style.left}>
          {this.renderNewPizza()}
        </Col>
        <Col sm={24} md={8} className={style.right}>
          <h3 className={style.title}>菜单</h3>
          {this.renderMenuTable()}
        </Col>
      </Row>
    );
  }
}

export default index;
