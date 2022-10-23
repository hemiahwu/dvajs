import React from "react";
import { connect } from "dva";
import { Layout } from "antd";
import Headers from "./Header";
import style from "./IndexPage.scss";

const { Header, Content } = Layout;

function IndexPage() {
  return (
    <Layout className={style.layout}>
      <Header className={style.header}>
        <Headers />
      </Header>
      <Content className={style.content}>Content</Content>
    </Layout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
