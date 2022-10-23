import React, { Component } from "react";
import { Row, Col, Table, Button } from "antd";
import NewPizza from "./NewPizza";
import style from "./index.scss";

export class index extends Component {
  // 渲染右侧菜单列表
  renderMenuTable() {
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
          <Button className={style["del-btn"]}>
            <span>×</span>
          </Button>
        )
      }
    ];
    const dataSource = [
      {
        key: 1,
        name: "pizza"
      }
    ];
    return (
      <Table
        className="menus-table"
        columns={columns}
        dataSource={dataSource}
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
          <h3>菜单</h3>
          {this.renderMenuTable()}
        </Col>
      </Row>
    );
  }
}

export default index;
