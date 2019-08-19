<template>
  <div class="home">
  <mu-container>
   <mu-row gutter>
    <mu-col span="3" v-for="item in list" :key="item.link">
       <mu-paper class="demo-paper" round :z-depth="2">
         <template v-if="item.external">
         <a :href="item.link" :target="item.external?'_blank':'_self'">{{item.name}}</a>
         </template>
         <template v-else>
           <router-link class="highcolor" :to="{ name: 'ldap'}">LDAP 密码修改</router-link>
         </template>
      </mu-paper>
    </mu-col>
   </mu-row>
 
</mu-container>
    
  </div>
</template>

<script>

export default {
  name: 'home',
  data(){
    return {
      list:[
        {name:'公司内部git仓库', link:'https://git.chdi.com.cn',external:true},
        {name:'LDAP 密码修改', link:'/ldap',external:false},
        {name:'代码同步系统', link:'http://sysadmin.chsi.com.cn/deploy/index', external:true},
        {name:'CHSI原型图', link:'http://jira.chdi.com.cn/mockup/', external:true},
        {name:'前后台协作接口文档系统', link:'http://raps2.chdi.com.cn/', external:true},
        {name:'考勤管理系统', link:'https://kq.chsi.com.cn',external:true},
        {name:'会议室预定系统', link:'https://hygl.chsi.com.cn/', external:true},
       
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.demo-paper{
  margin-bottom: 15px;
  a { display: block; padding: 30px 10px; color: #ff5722; height: 80px;}
  &&:hover a{  background-color: #fafafa; color: #4caf50; font-size: 110%;}
  && a.highcolor { color: #4caf50;}
}

</style>
