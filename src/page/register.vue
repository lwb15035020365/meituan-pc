<template>
  <div class="page-register">
    <div class="header">
      <header>
        <a href="#" class="site-logo"></a>
        <div class="login">
          <span>已有美团账号</span>
          <router-link :to="{name: 'login'}">登录</router-link>
        </div>
      </header>
    </div>
    <div class="content">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm2.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off" @input="input"></el-input>
          <div class="pw-strength">
             <div :class="['bar', strengthClass]"></div>
            <div class="letter">
              <span>弱</span>
              <span>中</span>
              <span>强</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input type="password" v-model="ruleForm2.rePassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      } else if (value.length < 4 || value.length > 16) {
        callback(new Error("用户名必须为4-16位的字母数字下划线组成"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.rePassword !== "") {
          this.$refs.ruleForm2.validateField("rePassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm2: {
        userName: "",
        password: "",
        rePassword: ""
      },
      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        rePassword: [{ validator: validatePass2, trigger: "blur" }],
        userName: [{ validator: validateUser, trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            api.register({
                params: this.ruleForm2
            }).then(res => {
                if(res.data.status == 'success') {
                    this.$router.push({name: 'login'})
                }else {
                    alert(res.data.msg);
                }
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    input() {
        var regStr = /\w+/g;
        var regNum = /\d+/g;
        var reg = /_/g;
        var strongth = this.ruleForm2.password.match(reg) && this.ruleForm2.password.match(regStr) && this.ruleForm2.password.match(regNum);

        if(this.ruleForm2.password.length > 20 || (this.ruleForm2.password.length > 6 && strongth)) {
            this.strengthClass = 'strong';
        }else if(this.ruleForm2.password.length < 6) {
            this.strengthClass = 'week'
        }else if (!this.ruleForm2.password) {
            this.strengthClass = '';
        } else{
            this.strengthClass = 'normal';
        }
    }
  }
};
</script>

<style lang='less'>
@import "~@/assets/css/register/index.less";
</style>