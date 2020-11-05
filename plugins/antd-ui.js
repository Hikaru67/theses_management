/*
 * Copyright 2020 Digi Dinos JSC. All rights reserved.
 * Email: tech@digidinos.com.
 */

import Vue from 'vue'
// import Antd from 'ant-design-vue/lib'
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Dropdown,
  FormModel,
  Icon,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Tree,
  notification
} from 'ant-design-vue'

// Vue.use(Antd)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(Dropdown)
Vue.use(FormModel)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Row)
Vue.use(Select)
Vue.use(Spin)
Vue.use(Table)
Vue.use(Tree)

Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm
