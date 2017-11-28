<template>
    <div class="skill-card" :class="leave">
        <h1>{{content.type}}</h1>
        <h1>{{content.explain}}</h1>
        <p>熟练度:  <span>{{content.proficiency}}</span></p>
        <div>{{content.other}}</div>
    </div>
</template>

<script>
    export default {
        name: 'skill-card',
        props: {
            content: {
                Object,
                default: {
                    key: 1,
                    type: '类别',
                    explain: '具体说明',
                    proficiency: '可以做事',
                    other: '刚了解，打算学中...',
                    leave: 'two'
                }
            },
        },
        computed: {
            leave(){
                return  "leave_"+this.content.leave;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
    .skill-card{
        width: 298px;
        height: 398px;
        border: 1px solid #e1eec3;
        border-radius: 6px;
        background: red;
        h1{
            height: 20%;
            text-align: center;
            text-shadow: 1px 1px #E2E2E2;
        }
        p{
            height: 20%;
            padding: 4px;
            text-indent: 2em;
            font-size: 16px;
            line-height: 20px;
            white-space: pre-wrap;
            word-wrap: break-word;
            span{
                color: red;
                font-size: 20px;
            }
        }
        div{
            height: 40%;
            padding: 4px;
            text-indent: 2em;
            font-size: 16px;
            line-height: 20px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
    }
    .leave_one{
        background: -webkit-linear-gradient(#22c1c3, #fdbb2d);
    }
    .leave_two{
        background: -webkit-linear-gradient(#e1eec3, #f05053);
    }
    .leave_three{
        background: -webkit-linear-gradient(#2F80ED,#56CCF2);
    }
    .leave_four{
        background: -webkit-linear-gradient(#fffcdc, #d9a7c7);
    }
</style>
