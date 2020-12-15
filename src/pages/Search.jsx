import React from 'react'
import { Row, Col, Typography, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import Settings from '../components/Settings';

const Search = () => {
  return (
    <>
      <Row justify="end" style={{ padding: 20 }}>
        <Col><Settings /></Col>
      </Row>
      <Row justify="center" style={{ marginTop: 100 }}>
        <Col>
          <Typography.Title>구 성 원 찾 기</Typography.Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col span={12}>
          <Input prefix={<SearchOutlined />} placeholder="검색어를 입력하세요!" />
        </Col>
      </Row>
    </>
  )
}

export default Search;
