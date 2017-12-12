<template>
    <div class="login">
        <vue-particles color="#36D1DC" shapeType="star" :particlesNumber="180" :particleSize="3" :clickEffect="false"></vue-particles>
        <section class="container">
            <div class="selectHint">
                <div class="loginContainer">
                    <div class="opcitiyMask">
                        <h2>登录</h2>
                        <button class="btn_login" @click.stop="selectLogin">登录</button>
                    </div>
                </div>
                <div class="registContainer">
                    <div class="opcitiyMask">
                        <h2>注册</h2>
                        <button class="btn_regist" @click.stop="selectRegist">注册</button>
                    </div>
                </div>
            </div>
            <div class="bg">
                <div class="bg_grey">
                    <img :src="image" alt="" />
                </div>
            </div>
            <div class="formContainer" :class="[{formContainerActiveLogin: loginState}, {formContainerActiveRegist: registState}]" >
                <div class="imgBack">
                    <img :src="image" alt=""/>
                </div>
                <div class="form_login_body">
                    <a href="#" @click="cancel"></a>
                    <h2>登录</h2>
                    <input type="text" placeholder="用户名" />
                    <input type="password" placeholder="密码" />
                    <section>
                        <input type="text" placeholder="验证码" maxlength="4" />
                        <img />
                        <div class="change_img">换一张</div>
                    </section>
                    <p><span>忘记密码了</span></p>
                    <button class="btn_login" @click="login">登录</button>
                </div>
                <div class="form_regist_bogy">
                    <a href="#" @click="cancel"></a>
                    <h2>注册</h2>
                    <input type="text" placeholder="邮箱" />
                    <input type="text" placeholder="用户名" />
                    <input type="password" placeholder="密码" />
                    <input type="password" placeholder="在输一次密码" />
                    <button class="btn_regist" @click="regist">注册</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

    import VueParticles from "../../../node_modules/vue-particles/src/vue-particles/vue-particles.vue";
    export default {
        name: 'login',
        data(){
            return{
                image: 'http://img4.imgtn.bdimg.com/it/u=2563309609,3447899698&fm=214&gp=0.jpg',
                loginState: false,
                registState: false,
            }
        },
        components: {
            VueParticles
        },
        methods: {
            selectLogin(){
                console.log(123);
                this.registState= false;
                this.loginState= true;
            },
            selectRegist(){
                this.loginState= false;
                this.registState= true;
            },
            cancel(){
                this.loginState= false;
                this.registState= false;
            },
            login(){

            },
            regist(){

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    .login{
        position: relative;

        .container{
            position: absolute;
            width: 640px;
            left: 50%;
            margin-left: -320px;
            height: 100px;
            top: 50px;
            .selectHint{
                position: absolute;
                width: 640px;
                height: 280px;
                top: 100px;
                z-index: 1;
                .loginContainer{
                    position: relative;
                    float: left;
                    width: 50%;
                    text-align: center;
                }
                .registContainer{
                    position: relative;
                    float: left;
                    width: 50%;
                    text-align: center;
                }
                .opcitiyMask{
                    position: relative;
                    background-color: rgba(187, 168, 170, 0.79);
                    width: 80%;
                    border-radius:3px ;
                    padding: 15px 0px;
                    margin: 90px auto 0;
                    h2 {
                        font-weight: 400;
                        color: #fff;
                    }
                }
            }
            .btn_login{
                background-color: #FF9800;
                border: none;
                padding: 10px;
                width: 200px;
                border-radius:3px;
                box-shadow: 1px 5px 20px -5px rgba(0,0,0,0.4);
                color: #fff;
                margin-top: 10px;
                cursor: pointer;
            }
            .btn_regist{
                background-color: #f44336;
                border: none;
                padding: 10px;
                width: 200px;
                border-radius:3px;
                box-shadow: 1px 5px 20px -5px rgba(0,0,0,0.4);
                color: #fff;
                margin-top: 10px;
                cursor: pointer;
            }
            .bg{
                position: relative;
                float: left;
                width: 640px;
                height: 280px;
                overflow: hidden;
                background-color: #fff;
                margin-top: 100px;
                box-shadow: 1px 10px 30px -10px rgba(0,0,0,0.5);
                .bg_grey{
                    position: absolute;
                    width: 950px;
                    top:-80px;
                    left: -116px;
                    img {
                        width: 100%;
                        -webkit-filter: grayscale(100%);
                        filter: grayscale(100%);
                        opacity: 0.2;
                        animation-name: animar_fondo;
                        animation-duration: 20s;
                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                        animation-direction: alternate;
                    }
                }
            }
            .formContainer{
                position: absolute;
                overflow: hidden;
                top:100px;
                left: 0px;
                width: 320px;
                height: 280px;
                background-color: #eee;
                transition: all 0.5s;
                a{
                    width: 16px;
                    height: 12px;
                    display: block;
                    margin-left: 10px;
                    margin-top: 10px;
                    background: white url("../../assets/imgs/left_arrow.png") center center;
                    background-size: 100%;
                }
                input {
                    padding: 10px 5px;
                    margin-left: 10px;
                    margin-top: 20px;
                    width: 260px;
                    border: none;
                    text-align: left;
                    color: #757575;
                    height: 16px;
                }
                h2 {
                    margin-top: 60px;
                    font-weight: 400;
                    color: #757575;
                }
                .imgBack{
                    position: absolute;
                    width: 950px;
                    top:-80px;
                    left: -116px;
                    img {
                        width: 100%;
                        opacity: 0.9;
                        animation-name: animar_fondo;
                        animation-duration: 20s;
                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                        animation-direction: alternate;
                    }
                }
                .form_login_body{
                    position: absolute;
                    opacity: 0;
                    display: none;
                    width: 320px;
                    text-align: center;
                    transition: all 0.5s;
                    section {
                        width: 270px;
                        margin: 0 auto;
                        display: flex;
                        align-items: flex-end;
                        position: relative;
                        left: 5px;
                        input{
                            width:60px;
                            margin-left: 0px;
                        }
                        div{
                            width: 60px;
                            height: 36px;
                            line-height: 36px;
                            margin-left: 10px;
                            color: #3b95e9;
                            cursor: pointer;
                            &:hover{
                                color: #00BFFF;
                            }
                        }
                        img{
                            width: 130px;
                            height: 36px;
                            margin-left: 10px;
                        }
                    }
                    p {
                        margin-top: 20px;
                        font-weight: 400;
                        text-align: right;
                        margin-right: 20px;
                        font-size: 12px;
                        color: #00BFFF;
                        cursor: pointer;
                        span{
                            &:hover{
                                color: #D1EEEE;
                                text-decoration: underline;
                            }
                        }
                    }
                }
                .form_regist_bogy{
                    position: absolute;
                    width: 320px;
                    float: left;
                    opacity: 0;
                    display: none;
                    text-align: center;
                    transition: all 0.5s;
                }
            }
            .formContainerActiveLogin{
                box-shadow: 1px 10px 30px -10px rgba(0,0,0,0.5);
                height: 420px;
                top: 20px;
                left: 0px;
                transition: all 0.5s;
                z-index: 9;
                background: red;
                .imgBack{
                    top:0px;
                    transition: all 0.5s;
                }
                .form_login_body{
                    display: block;
                    opacity: 1;
                }
                .form_regist_bogy{
                    opacity: 0;
                    display: none;
                }
            }
            .formContainerActiveRegist{
                box-shadow: 1px 10px 30px -10px rgba(0,0,0,0.5);
                height: 420px;
                top:20px;
                left:320px;
                transition: all 0.5s;
                z-index: 2;
                .imgBack{
                    top: 0px;
                    left: -435px;
                    transition: all 0.5s;
                }
                .form_login_body{
                    display: none;
                    opacity: 0;
                }
                .form_regist_bogy{
                    opacity: 1;
                    display: block;
                }
            }

        }

        @keyframes animar_fondo {
            from {  transform: scale(1) translate(0px); }
            to {  transform: scale(1.5) translate(50px); }
        }

        @keyframes identifier {
            from {  transform: scale(1); }
            to {  transform: scale(1.5);  }
        }
    }

</style>
