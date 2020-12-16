import React from 'react'
import { Row, Col, Typography } from 'antd';
import Settings from '../components/Settings';
import SearchInput from '../components/SearchInput';

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
          <SearchInput />
        </Col>
      </Row>
    </>
  )
}

export default Search;
