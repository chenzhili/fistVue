export default {
  /* 有需要的自定义组件可以自行添加 */
  input: {
    component: 'el-input',
    attrs: {
      placeholder: '请输入',
    }
  },
  inputNumber: {
    component: 'el-input-number',
    attrs: {
      placeholder: '请输入',
    }
  },
  select: {
    component: 'c-select',
    attrs: {
      placeholder: '请输入',
    }
  },
  datePicker: {
    component: 'el-date-picker',
    attrs: {
      placeholder: '请输入',
    }
  },
  timePicker: {
    component: 'el-time-picker',
    attrs: {
      placeholder: '请输入',
    }
  },
  switch: {
    component: 'el-switch',
    attrs: {
      placeholder: '请输入',
    }
  },
  checkbox: {
    component: 'el-checkbox',
    attrs: {
      placeholder: '请输入'
    }
  },
  checkboxGroup: {
    component: 'c-checkbox',
    attrs: {
      placeholder: '请输入',
      /* 组件 默认 值的 特殊性 */
      defaultValue: []
    }
  },
  radio: {
    component: 'c-radio',
    attrs: {
      placeholder: '请输入',
    }
  }
}