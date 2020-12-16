import React from 'react'
import { Input, AutoComplete, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/state/search.state';


const SearchInput = () => {
  const keyword = useSelector(state => state.search.keyword);
  const dispatch = useDispatch();
  function setKeyword(value) {
    if (value !== keyword) {
      dispatch(actions.setValue('keyword', value));
      dispatch(actions.fetchAutoComplete(value));
    }
  }

  const autoCompletes = useSelector(state => state.search.autoCompletes);

  return (
    <AutoComplete 
      autoFocus
      style={{ width:"100%" }}
      value={keyword}
      onChange={setKeyword}
      options={autoCompletes.map(item => ({
        value: item.name,
        label: (
          <Space>
            <Typography.Text strong>{item.name}</Typography.Text>
            <Typography.Text type="secondary">
              {item.department}
            </Typography.Text>
            <Typography.Text>{item.tag}</Typography.Text>
          </Space>
        ),
      }))}
    >
      <Input 
        size="large"
        prefix={<SearchOutlined />} 
        placeholder="검색어를 입력하세요!" 
      />
    </AutoComplete>
  )
}

export default SearchInput;
