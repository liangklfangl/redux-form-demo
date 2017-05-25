import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { App, Code, Markdown, Values, generateExampleBreadcrumbs } from 'redux-form-website-template'

const dest = document.getElementById('content')
const reducer = combineReducers({
  form: reduxFormReducer 
  // mounted under "form"
})
const store =
  (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)
//产生store对象
const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })

let render = () => {
  const AsyncValidationForm = require('./AsyncValidationForm').default
  //对我们的form进行校验
  const readme = require('./AsyncValidation.md')
  //markdown文件
  const raw = require('!!raw-loader!./AsyncValidationForm')
  //raw-loader来处理我们的文件
  const rawValidate = require('!!raw-loader!./validate')
  const rawAsyncValidate = require('!!raw-loader!./asyncValidate')
  //验证js文件都使用raw-loader来加载
  ReactDOM.render(
    <Provider store={store}>
      <App
        /**
         * This <App/> component only provides the site wrapper.
         * 这里的App组件只是一个包裹元素，可以在devServer中移除。这个App可以产生面包屑
         * Remove it on your dev server if you wish. It will not affect the functionality.
         */
        version="6.6.3"
        path="/examples/asyncValidation"
        breadcrumbs={generateExampleBreadcrumbs('asyncValidation', 'Async Validation Example', '6.6.3')}>
         /*
          这里是Markdown，原样显示markdown内容
          */
        <Markdown content={readme}/>
        <div style={{ textAlign: 'center' }}>
          <a href="https://codesandbox.io/s/nKlYo387"
            target="_blank"
            style={{ fontSize: '1.5em' }}>
            <i className="fa fa-codepen"/> Open in Sandbox
          </a>
        </div>
        <h2>Form</h2>
        /*
         AsyncValidationForm来自于redux-form的一个Form类型，onSubmit表示Form的提交，提交
        函数是一个异步的请求
         */
        <AsyncValidationForm onSubmit={showResults}/>
        /*Values组件*/
        <Values form="asyncValidation"/>
        <h2>Code</h2>
        <h4>validate.js</h4>
        /*Code组件*/
        <Code source={rawValidate}/>

        <h4>asyncValidate.js</h4>
        <Code source={rawAsyncValidate}/>

        <h4>AsyncValidationForm.js</h4>
        <Code source={raw}/>

      </App>
    </Provider>,
    dest
  )
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} className="redbox"/>,
      dest
    )
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  const rerender = () => {
    setTimeout(render)
  }
  module.hot.accept('./AsyncValidationForm', rerender)
  module.hot.accept('./AsyncValidation.md', rerender)
  module.hot.accept('!!raw-loader!./AsyncValidationForm', rerender)
  module.hot.accept('!!raw-loader!./asyncValidate', rerender)
  module.hot.accept('!!raw-loader!./validate', rerender)
}

render()
