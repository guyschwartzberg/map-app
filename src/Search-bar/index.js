
import React from 'react'
import { Input, Form } from 'antd'
import animateCSS from './animate.js'


// Usage
function SearchBar(props) {
  // Similar to useState but first arg is key to the value in local storage.

  const [form] = Form.useForm();
  const { addToData, data } = props

  const submitCity = async ({ cityname }) => {
    if (!data.find((city) => city.hebrewName === cityname.replace("-", ' '))) {
      const response = await fetch('/city?address='+encodeURIComponent(cityname), {
        method: 'GET',
      })
      if (response.status === 200) {
        const body = await response.json()
        addToData(body)
        form.resetFields();
        return;
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
      <Input className="inputbar"/>
      </Form.Item>
</Form>
    </div>
  );
}

export default SearchBar;
