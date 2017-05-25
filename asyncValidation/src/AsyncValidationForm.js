import React from 'react'
import { Field, reduxForm } from 'redux-form'
//引入reduxForm,Field
import validate from './validate'
//同步表单验证
import asyncValidate from './asyncValidate'
//异步表单验证
//asyncValidating:true if the form is currently running asynchronous validation because this field was blurred.
//touchend:true if the field has been touched. By default this will be set when the field is blurred.
//pristine:true if the field value is the same as its initialized value. Opposite of dirty.
//dirty:true if the field value has changed from its initialized value. Opposite of pristine.
const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
  <div>
    <label>{label}</label>
    //asyncValidating表示是否是异步的
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)
/*
(1)Field组件中我们的name是必须的，和form中的某一个value对应
(2)component是必须的，可以是一个组件也可以是一个无状态的函数，字符串或者input/textarea等
(3)所有的其他属性会被传递到component指定的组件产生的元素中  

 */
const AsyncValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  //handleSubmit来自于父级组件传递
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="password" type="password" component={renderField} label="Password"/>
      <div>
        <button type="submit" disabled={submitting}>Sign Up</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'asyncValidation', 
  // a unique identifier for this form
  //唯一标记该form的标志
  validate,
  //validate表示对该form进行验证
  asyncValidate,
  //asyncValidate表示对该form进行异步验证
  asyncBlurFields: [ 'username' ]
})(AsyncValidationForm)
