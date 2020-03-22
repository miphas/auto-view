# auto-view  
auto-view是一款自动上报埋点的工具

## 用法

### 1. npm i @miphas/auto-view --save

### 2. insert js code

``` javascript
// 渲染真实节点前插入（before render）
import autoView from '@miphas/auto-view'

autoView({
    onElemView: (vid, vdata) => {
        // 替换为曝光上报函数
        console.log('View', vid, vdata)
    },
    onElemClick: (vid, vdata) => {
        // 替换为点击上报函数
        console.log('Click', vid, vdata)
    }
})
```

### 3. set html code
``` html
<div dataset-vid="m-vid"></div>
```

## 基本原理

### 1.[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
使用 MutationObserver 来监听节点的变动情况，跟踪 dataset 数据中包 vid 的元素
并根据实际变动情况更新监听列表

### 2.[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)
使用 IntersectionObserver 来监听节点与可视窗口的交叉情况，从而实现曝光 1px 打点行为
PS. 在不支持 IntersectionObserver 的机器上直接打文档上现有元素的曝光点


## 整体结构

<img src="https://github.com/miphas/auto-view/blob/master/docs/pics/Structure.jpeg" width="80%">


- MutationObserver 监控了页面节点的增删情况，并通知Record
- Record 根据节点信息进行筛选，记录下需要监控的节点
- Report 为监控的节点设置好曝光 (view) 和点击 (click) 的触发器
- view 触发器使用 IntersectionObserver 根据节点与视窗的交错情况来触发曝光
- click 触发器同 dom.addEventListener 的方式来触发上报


## 目录结构
src  
|- index.ts 项目初始化根文件  
|- type.ts  项目类型定义  
|- utils.ts 项目常用工具方法  
|- useObserve.ts  MutationObserver 观察节点变动  
|- useRecord.ts   记录vid标记的节点  
|- useReport.ts   设置上报打点的触发  
|- getViewTrigger.ts  曝光上报触发器  
|- getClickTrigger.ts 点击上报触发器  
