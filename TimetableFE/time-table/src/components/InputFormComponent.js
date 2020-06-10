import React from 'react';
import { InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TableComponent from './TableComponent'
import { Form,Row,Col,Input, Button,TimePicker, Checkbox,Select} from 'antd';
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};


const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
};

const secList = ['A','B','C','D','E','F','G','H','I','K']
const daysList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 8, offset: 8 },
    sm: { span: 8, offset: 8 },
  },
};

const DynamicFieldSet = () => {
  return (

      <Form.List name="names">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Subject' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Enter the Subjects",
                      },
                    ]}
                    noStyle
                  >

                  <Input name = 'subject' placeholder="subject"   style={{ width: '60%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  
                >
                  <PlusOutlined /> Add Subjects
                </Button>
              </Form.Item>
            </div>
          );
        }}  
      </Form.List>
  );
};

const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};
class InputFormComponent extends React.Component{
  constructor(props){
    super(props)
    this.state={main_json:undefined}
  }
    render(){
        return(
          <div>
            <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
    onFinish ={(values)=>{
      let time_arr = []
      for(let i=1;i<=values.noClass;i++){
        time_arr.push(i)
      }
      
      function get_days_list(fi,feq){
        let d_list = []
        for(let j = 0,k=fi;j<feq;j++,k++){
          if(k<7)
            d_list.push(daysList[k])
          else
          d_list.push(daysList[k-7])
        }
        return d_list
      }
    console.log(daysList.indexOf(values.startClass))
      let final_json = {
      no_classes : values.noClass,
      no_days : values.noDays,
      days_list: get_days_list(daysList.indexOf(values.startClass),values.noDays),
      time_list: time_arr,
      subject_list:values.names

    }

    let dummyJSON = {
        no_classes: 3,
        no_days: 6,
        days_list: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        rooms: ['400', '401'],
        time_list: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
        subject_list: ['Physics', 'Chemistry', 'Biology', 'Math', 'English', 'Computers'],
        teacher_list: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        student_groups: [{'Physics': 'T1', 'Chemistry': 'T2', 'Biology': 'T3', 'Math': 'T4', 'English': 'T5',
                          'Computers': 'T6', 'empty': '-'},
                         {'Physics': 'T1', 'Chemistry': 'T2', 'Biology': 'T3', 'Math': 'T4', 'English': 'T5',
                         'Computers': 'T6', 'empty': '-'}]
    }
    console.log(final_json)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dummyJSON)
  };
  fetch('/generate', requestOptions)
      .then(response => {
        console.log(response)
        return response.json()})
      .then(data => this.setState({ main_json: data }));
  }}
    >
        
      <Row justify="center">
        <Col span={6} >
          <Form.Item name = "noDays"  label="No of Days">
            <InputNumber />
          </Form.Item> 
        </Col>
        <Col span={6}>
          <Form.Item
          name="startClass"
          label="Start Day"
          rules={[
            {
              required: true,
            },
          ]}>
          <Select
          style={{ width: '100%'}}
            placeholder="Select a Day"
            //onChange={onGenderChange}
            allowClear
          >
            <Option value="Sunday">Sunday</Option>
            <Option value="Monday">Monday</Option>
            <Option value="Tuesday">Tuesday</Option>
            <Option value="Wednesday">Wednesday</Option>
            <Option value="Thursday">Thursday</Option>
            <Option value="Friday">Friday</Option>
            <Option value="Saturday">Saturday</Option>
          </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={6}>
          <Form.Item name ="noSec" label="No of Sections">
              <InputNumber />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="noClass" label="No of Classes/day:">
              <InputNumber />
          </Form.Item>
        </Col>
      </Row>
      <Row>
      
      
      <Col  offset={8} span = {8}>
      <DynamicFieldSet />
      </Col>
      
      </Row>
      <Row justify="center">
      <Col span={1}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Col>
      </Row>
        </Form>    
        <TableComponent main_json = {this.state.main_json}/>
      </div>
        );
    }
}

export default InputFormComponent