<template>
  <div id="todos">
    <label>
      <input type="text" v-model.lazy="inputVal" @keyup.13="add">
      <button @click="add">Add</button>
      <span v-if="isOk">输入有误（提示:只能输入汉字）！</span>
    </label>
    <ul>
      <li v-for="(item,index) in list" :key="item.id">
        {{ item.name }}-
        <button @click="del(item.id,index)">Del</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'todos',
  data () {
    return {
      inputVal: '',
      isOk: false,
      list: []
    }
  },
  methods: {
    add () {
      // post 添加
      let reg = /[\u4e00-\u9fa5]/g;
      if (reg.test(this.inputVal)) {
        this.$http.post('/posts', { name: this.inputVal })
          .then(res => {
            this.list.push(res.data);
            this.inputVal = '';
          })
          .catch(err => {
            alert(err);
          })
      } else {
        this.isOk = true;
      }
    },
    del (id, index) {
      // delete 删除
      this.$http.delete(`posts/${id}`)
        .then(res => {
          this.list.splice(index, 1);
          if (res.status === 200) {
            alert('删除成功！');
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  mounted () {
    // get 获取
    this.$http.get('/posts')
      .then((res) => {
        this.list = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #todos{
    label{
      button{
        margin-left: 2px;
      }
      span{
        color: red;
        font-size: 14px;
        margin-left: 4px;
      }
    }
  }
</style>
