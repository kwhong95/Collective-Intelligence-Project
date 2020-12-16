import React from 'react'
import { Dropdown, Menu, Button } from 'antd'
import { SettingFilled } from '@ant-design/icons';

const Settings = () => {
  return (
    <Dropdown overlay={
      <Menu>
        <Menu.Item>로그아웃</Menu.Item>
      </Menu>
    }
      trigger={['click']}
      placement="bottomRight"
    >
      <Button shape="circle" icon={<SettingFilled />} />
    </Dropdown>
  )
}

export default Settings;
