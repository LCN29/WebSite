<template>
    <div class="introduce-myself">
        <div class="message">
            <p>姓名:<span>{{message.name}}</span></p>
            <p>生日:<span>{{message.birthday}}</span></p>
            <p>现居住地:<span>{{message.place}}</span></p>
            <p>邮箱:<span>{{message.email}}</span></p>
            <p>毕业学校:<span>{{message.school}}</span></p>
            <p>专业:<span>{{message.major}}</span></p>
            <p>兴趣爱好:<span>{{message.interest}}</span></p>
        </div>
        <h1>自我介绍:</h1>
        <pre class="introduce">
            {{message.introduce}}
        </pre>
    </div>
</template>

<script>
    export default {
        name: 'introduce-myself',
        data(){
            return{
                message: {
                    name: 'LCN',
                    birthday: '1995-05-23',
                    place: '广州番禺',
                    email: '1367869108@qq.com',
                    school: '广州番禺职业技术学校',
                    major: '软件开发(移动互联网方向)',
                    interest: '乒乓球、动漫、编程、美食',
                    introduce: '“代码虐我千百遍，我待代码如初恋”。个人认为我对于编程有种痴迷的感觉。每完成一个小小的功能都能让我兴奋不了，每解决一个bug.都能让我开心一天。'+
                    '在编程上。对于新技术，我都愿意去学，掌握的技术，我也希望着能够提升。只要是代码的事。我都可以接受。\n' +
                    '  “泾渭分明”是我生活的态度。属于学习的时间就学习，娱乐后面再说。某个时段属于什么就做什么，除了编程可以为所欲为地占用其他的时间。\n' +
                    '  总的来说：我是一个喜欢编程，喜欢按计划行走的人。\n\n(PS:本页面可以滑动哦，试着按住左键，左滑看看)',
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/scss">
    .introduce-myself{
        width: 100%;
        height: 100%;
        .message{
            display: flex;
            flex-wrap: wrap;
            p{
                width: 50%;
                font-size: 20px;
                margin: 10px 0px;
                &:nth-child(1){
                    width: 100%;
                }
                span{
                    text-indent: 3em;
                    margin-left: 30px;
                    color: #8E2323;
                    font-size: 16px;
                    text-shadow: 1px 0px black;
                }
            }
        }
        h1{
            margin-top: 50px;
            font-weight: normal;
            font-size: 25px;
        }
        .introduce{
            margin-top: 10px;
            border-radius: 10px;
            padding: 10px 10px;
            border: 1px solid #adcd3c;
            background: #f2fddb;
            width: 80%;
            min-height: 100px;
            overflow: auto;
            white-space: pre-wrap;
            font-size: 16px;
            line-height: 20px;
        }
    }
</style>
