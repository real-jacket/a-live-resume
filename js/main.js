var css1 = `/*
各位面试官，你们好！
我叫柯特，自学前端已经有半年时间了
我就利用所学知识做一个会动的简历介绍下自己
*/
/*首先给动画加上过渡效果*/
*{
    transition:all 0.3s
}
/*背景太单调换个颜色*/
body{
    background:rgb(136,187,187);
}

/*给文字加点边距*/
#code{
    border: 1px solid rgb(238,255,255);
    padding: 16px;
}
#codewrapper{
    width:50%;
    position:fixed;
    left:0;
    height:100%;
}

/*加一个呼吸效果*/
#code{
    animation: breath 0.5s infinite alternate-reverse;
}

/*高亮一下代码*/`

var css2 = `/*接下来开始写简历吧*/
/*先准备一张白纸*/

#paper{
    width:50%;
    height:100%;
    position: fixed;
    right:0;
    background:rgb(136,187,187);
    padding:16px;
}
#markdown{
    width:100%;
    height:100%;
    padding:16px;
    background:white;
}

/*那我开始写了*/
`

var mdcode =`## 自我介绍
大家好，我叫柯特，
出生于1993年12月，2017年毕业于武汉工程大学，
自学前端半年，希望能得到一份前端开发的工作。
## 技能
1. 熟练掌握HTML&&CSS
2. 熟练掌握JavaScript
3. 了解HTTP基础知识（前端向）
4. 熟悉vue框架
5. 会使用git
## 项目介绍
* 简历
* 原生JS制作的导航网页
* 画板
* 会动的简历
* jQuery制作的轮播
## 联系方式
* 手机号: 13294184215
* qq: 1762982273
* Email: 1762982273@qq.com`

var css3 = `
/*这是markdown格式的
我们利用优秀的开源shoedown.js库将其转换成html格式*/
`
var css4 = `
/*稍微美化下*/
#markdown>h2{
    border-bottom: 2px grey dashed;
    display: inline-block;
    margin-bottom: 10px;
    font-size: 23px;
    padding-bottom: 5px;
}
#markdown>ol,ul{
    margin: -5px 0;
}
#markdown>ol,ul>li{
    list-style: none;
    margin: -5px 20px;
    padding: 0;
    list-style-type: disc;
}

/*这就是我的简历，谢谢观看！*/
`
// 将code写进css与pre中
function writecode(prefix,css,fn){
    var domcode = document.querySelector('#code')
    let n = 0;
    let id = setInterval(()=>{
        n += 1;
        domcode.innerHTML = Prism.highlight(prefix + css.substring(0,n), Prism.languages.css)
        stylecode.innerHTML = prefix + css.substring(0,n);
        domcode.scrollTop = domcode.scrollHeight;
        if(n >= css.length){
            window.clearInterval(id)
            fn && fn.call()
        }
    },50)
} 

// 创造paper
function createpaper(){
    let paper = document.createElement('div')
    let body = document.querySelector('body')
    paper.id = "paper"
    let paper_md = document.createElement('pre')
    paper_md.id = "markdown"
    body.appendChild(paper)
    paper.appendChild(paper_md)
}

// 写简历函数
function writemarkdown(code,markdown,fn){
    let dompaper = document.querySelector('#markdown')
    let n = 0
    let id = setInterval(()=>{
        n += 1
        markdown.innerHTML = code.substring(0,n)
        dompaper.scrollTop = dompaper.scrollHeight;
        if(n >= code.length){
            clearInterval(id)
            fn&&fn.call()
        }
    },50)  
}

//将markdown转化成html
function toHtml(){
    let dompaper = document.querySelector('#markdown')
    let converter = new showdown.Converter()
    dompaper.innerHTML = converter.makeHtml(dompaper.innerHTML)
}







// 开始执行写简历程序

writecode('',css1,()=>{
    createpaper()
    writecode(css1,css2,()=>{
        writemarkdown(mdcode,markdown,()=>{
            writecode(css1+css2,css3,()=>{
                toHtml()
                writecode(css1+css2+css3,css4)
            })
        })
    })
           
})









