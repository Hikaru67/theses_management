/*
 * Copyright 2020 HOI CHAO HANH JSC. All rights reserved.
 * Email: tech@hoichaohanh.com.
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
  ConfigProvider,
  Dropdown,
  FormModel,
  Icon,
  Input,
  Layout,
  Menu,
  Modal,
  Popover,
  Row,
  Select,
  Spin,
  Table,
  Tree,
  notification,
  Upload
} from 'ant-design-vue'

// Vue.use(Antd)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(ConfigProvider)
Vue.use(Dropdown)
Vue.use(FormModel)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Popover)
Vue.use(Row)
Vue.use(Select)
Vue.use(Spin)
Vue.use(Table)
Vue.use(Tree)
Vue.use(Upload)

Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm
