<template>
    <div id="ldap">
        <h2>LDAP 密码修改</h2>
   
        <mu-container>
    
        <div v-if="finished">
           <mu-icon size="54" value="check_circle" color="blue"></mu-icon>
           <br>
          <strong>密码修改成功啦!</strong>  <br>
          登录 <a href="https://git.chdi.com.cn" target="_blank">git.chdi.com.cn</a> 试试新密码。<br>
          <p>
           <mu-button @click="goback">返回</mu-button>
          </p>
        </div>
        <mu-form ref="form" :model="validateForm" class="mu-ldap-form" label-width="100" label-position="right" v-if="!finished">
          
            <mu-form-item label="用户名" help-text="" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
            </mu-form-item>
            <mu-form-item label="密码" prop="password" :rules="passwordRules">
                <mu-text-field  v-model="validateForm.password" prop="password" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"></mu-text-field>
            </mu-form-item>
      
             <mu-form-item label="输入新密码" prop="newpassword" :rules="passwordRules">
                <mu-text-field type="password"  v-model="validateForm.newpassword" prop="newpassword"></mu-text-field>
            </mu-form-item>
             <mu-form-item label="再次输入密码" prop="repassword" :rules="repasswordRules">
                <mu-text-field type="password" v-model="validateForm.repassword" prop="repassword"></mu-text-field>
            </mu-form-item>
            <mu-form-item>
            <mu-button color="primary" @click="submit">提交</mu-button>
            <mu-button @click="goback">取消</mu-button>
            </mu-form-item>
        </mu-form>
        </mu-container>
    </div>
</template>

<script>
import { async, Promise, reject } from 'q';
import qs from 'qs';
import axios from 'axios';

const ajax = function(data) {
  return new Promise((resolve, reject)=>{
        axios.post(
          // 'http://172.16.2.132:3000/changepwd', 
          'http://127.0.0.1:3000/changepwd',
          qs.stringify(data), 
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        )
        .then(({data}) => {
          if(data.code === 0){
             resolve(data.msg);
          }else{
             reject(data.msg)
          }
        })
        .catch(err =>{
            reject('服务异常或网络错误!')
        })
  })
}

export default {
  data () {
    return {
      finished: false, // 重置密码是否完成
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于2'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 6, message: '密码长度必须大于6'}
      ],
      repasswordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val === this.validateForm.newpassword, message: '两次填写的新密码不一致'}
      ],
      visibility:false,
      validateForm: {
        username: '',
        password: '',
        newpassword: '',
        repassword: ''
      }
    }
  },
  methods: {
    submit () {
      console.log("sss");
      
      this.$refs.form.validate().then((result) => {
        // console.log('成功！')
        if(result){
          const loading = this.$loading();
          let _this = this;
          ajax(this.validateForm)
          .then(function(res) {
            _this.finished = true;
          })
          .catch(function(error) {
            _this.$alert(error, '提示',{type:'error'});
          })
          .finally(()=>{
            loading.close();
          })
        }
      });
 
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
        newpassword: '',
        repassword: '',
      };
    },
     goback(){
      this.$router.push({ name: 'home' })
    }
  }
};
</script>

<style lang="less" scoped>
.mu-ldap-form {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
}
</style>
