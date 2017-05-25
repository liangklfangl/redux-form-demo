import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate'

/**
 * (1)只有meta和input两个对象，其他都会原样传递过来，input中其他属性会作为该两个属性的同级属性:
 * (2)The props under the input key are what connects your input component to Redux 
 * and are meant to be destructured into your <input/> component.也就是input要
 * 原样解构到我们的input元素中
 * @param  {[type]} options.input [description]
 * @param  {[type]} options.label [description]
 * @param  {[type]} options.type  [description]
 * @param  {[type]} options.meta: {            touched, error } [description]
 * @return {[type]}               [description]
 */
const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

/**
 * (1)renderHobbies很有意思，它的name为name={`${member}.hobbies`}类型
 * (2)这些数据都会原样保存到我们的state中(触发action=>新的state)
 */
const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Hobby</button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}/>
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}/>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)

/**
 * (1)每一个Club下有很多member,所以member就会是一个数组，所以这里用的是FieldArray组件而不是Field
 * (2)每次点击一下我们的button会向field中push一个对象,push以后会导致我们state变化
      最后导致我们这个组件重新渲染，所以下面的map会多了一个元素
 */
const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Member</button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}/>
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="First Name"/>
        <Field
          name={`${member}.lastName`}
          type="text"
          component={renderField}
          label="Last Name"/>
        <FieldArray name={`${member}.hobbies`} component={renderHobbies}/>
      </li>
    )}
  </ul>
)

const FieldArraysForm = (props) => {
  //处理handleSubmit外其他的都是组件默认的属性
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="clubName" type="text" component={renderField} label="Club Name"/>
      <FieldArray name="members" component={renderMembers}/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldArrays',    
   // a unique identifier for this form
  validate
})(FieldArraysForm)
