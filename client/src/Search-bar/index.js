
import React from 'react'
import { Input, Form } from 'antd'
import animateCSS from './animate.js'


// Usage
function SearchBar(props) {
  // Similar to useState but first arg is key to the value in local storage.

  const [form] = Form.useForm();
  const { addToData, data } = props
  const globalHeaders = {
    pragma: 'no-cache',
    'cache-control': 'no-cache',
    'Content-Type': 'application/json',
  };
  

  const submitCity = async ({ cityname }) => {
    if (!data.find((city) => city.hebrewName === cityname.replace("-", ' '))) {
      try {
      const response = await fetch('/city?address='+encodeURIComponent(cityname), {
        method: 'GET',
        headers : globalHeaders
      })
      if (response.status === 200) {
        const body = await response.json()
        addToData(body)
        form.resetFields();
        return;
      }
    } catch (e) {
      console.log(e)
    }
    }
    animateCSS('.inputbar', 'shakeX').catch((e) => {
      console.log(e)
    }).then(() => form.resetFields()); 
  }

  return (
    <div>
      <Form 
      form={form}
      onFinish={submitCity}>
        <Form.Item 
        name="cityname">
      <Input className="inputbar" autoComplete="off" autoFocus/>
      </Form.Item>
</Form>
    </div>
  );
}

export default SearchBar;
