<!--登陆页面-->
<style lang="less">
  .login-content {

    position: relative;
    height: 100%;
    background: url('../../static/image/login/bg.jpg');
    background-size: cover;

    .logo {

      width: 23vw;
      padding-bottom: 2vh;
      text-align: center;

      img {
        width: 100%;
        max-width: 525px;
      }
    }

    .login-right {

      position: absolute;
      width: 32vw;
      right: 2vw;
      top: 35vh;

      /*.logo {

        width: 37vw;
        padding-bottom: 2vh;
        text-align: center;

        img {
          width: 100%;
          max-width: 525px;
        }
      }*/
      .input-group {
        border:1px solid white;

        margin: 0 2vw;
        padding: 3vh 0;
        text-align: center;
        background: rgba(255, 255, 255, 0.2);

        h1 {
          padding-bottom: 20px;
          color: #fff;
          font-size: 24px;
        }

        p {
          padding-bottom: 30px;

          .ivu-input-wrapper{
            width: 63%;
            height: 45px;

            .ivu-input {
              height: 100%;
            }

            .ivu-icon {

              //height: 100%;
              line-height: 30px;
              font-size: 23px;
              margin-top: 6px;
            }
          }

          .ivu-btn {
            width: 63%;
            height: 50px;
            font-size: 23px;
            background: #4fceaa;
          }
        }
      }
    }
  }
</style>


<template>
  <div class="login-content">
    <div class="logo">
      <img src="../../static/image/login/logo_02.png" alt="">
    </div>
    <div class="login-right">
      <div class="input-group">
        <h1>用户登录</h1>
        <p><Input v-model="username" autofocus icon="person" placeholder="请输入账号"></Input></p>
        <p><Input v-model="password" @on-enter="submit" type="password" icon="locked" placeholder="请输入密码"></Input></p>
        <p><Button type="success" @click="submit">登录</Button></p>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        url: 'gmmeteo/sys/userinfo/login',
        username: '',
        password: ''
      }
    },
    methods: {
      submit: function() {
        if (this.username === '') {
          this.$Notice.warning({
            title: '请输入账号名'
          });
          return;
        }
        if (this.password === '') {
          this.$Notice.warning({
            title: '请输入账号密码'
          });
          return;
        }
        //this.$router.push('/main/home');
        var that = this;
        var params = {};
        params.data = {};
        params.data.username = this.username;
        params.data.password = this.password;
        //params.data.system_id = parameters.system_id;
        params.url = this.url;
        params.success = function(res) {
          that.$Loading.finish();
          console.log(res.data);
          if (res.data.code === '0000') {
            that.$Message.info({
              content: '登录成功',
              duration: 1,
              onClose: function() {
                console.log(res.data.result);
                /*that.setKey('realname', res.data.result.realname);
                that.setKey('department', JSON.stringify(res.data.result.department));
                that.setKey('username', res.data.result.username);*/
                that.setKey('token',    res.data.result.token);
                /*that.setKey('userid',   res.data.result.userid);
                that.setKey('roles',    JSON.stringify(res.data.result.roles));
                that.setKey('alermSound', true);*/
                that.$router.push('/main/home');
              }
            });
          } else {
            that.$Notice.warning({
              title: res.data.message
            });
          }
        }
        this.ajaxPost(params);
      }
    }
  }
</script>
