import React from 'react';
import { Space, Spin } from 'antd';
import useFetchInfo from '../hook/useFetchInfo';

/**
 * 
 * @param {object} param
 * @param {string} param.label
 * @param {string} param.actionType
 * @param {string} param.fetchKey
 */

const FetchLabel = ({ label, actionType, fetchKey }) => {
  const { isSlow } = useFetchInfo(actionType, fetchKey)

  return (
    <Space>
      {label}
      {isSlow && <Spin size="small" />}
    </Space>
  )
}

export default FetchLabel;
