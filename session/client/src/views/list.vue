<template>
  <div class="home">
    <el-button type="primary" @click="getContent">获取文章内容</el-button>
    <el-button type="primary" @click="addContent">新增文章内容</el-button>

    <h1>{{ result }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
import { Base64 } from 'js-base64'

export default {
  data() {
    return {
      result: ''
    }
  },
  methods: {
    async getContent() {
      const contentResult = await axios.get('/content')
      console.log('contentResult', contentResult.data)
    },
    async addContent() {
      const contentResult = await axios({
        url: '/content',
        method: 'post',
        headers: {
          'Authorization': this._encode()
        }
      })
      console.log('contentResult', contentResult.data)
    },
    _encode() {
      // Basic Auth
      const token = localStorage.getItem('token')
      // account:password
      // token:
      const encoded = Base64.encode(`${token}:`)
      // Basic xxx
      return `Basic ${encoded}`
    }
  }
}
</script>