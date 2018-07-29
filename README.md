# gallery-by-react
gallery project by reac

### 在线效果展示：Demo: https://www.donglixia.club/gallery-by-react/

# 说明


## 项目下载以运行
1、下载项目: 使用git命令：git clone git@github.com:ghcdg/gallery-by-react.git     或者 git clone https://github.com/ghcdg/gallery-by-react.git 进行下载

2、打开命令提示符窗口 cmd：进入该项目目录（即 gallery-by-react 目录中）

3、本地安装npm包：在当前目录下输入命令：npm install，安装完成后当前目录下会有一个 node_modules 的目录【注意：使用npm命令前请确保电脑已经安装nodejs，更多信息可查看：npm官网：https://docs.npmjs.com/getting-started/what-is-npm  或者npm中文文档： https://www.npmjs.com.cn/】

4、启动服务器：在当前目录下运行命令：npm start，稍后cmd窗户中会提示  Open in iframe mode:  http://localhost:8000/webpack-dev-server/
  Open in inline mode:  http://localhost:8000/ 【有关项目的更多命令可查看项目中的 package.json 文件】

5、打开浏览器，在地址栏输入：http://localhost:8000/ 或 http://localhost:8000/webpack-dev-server/ 查看项目效果

## 注：

项目中的dist文件夹是已经打包好的项目：下载项目后直接打开dist文件中的index.html也可以查看效果【index.html和assets为打包后的文件】

## 项目上传

使用响应的git命令上传项目，使用 git subtree push --prefix dist origin gh-pages 命令将 dist 文件推送到 gh-pages 分支即可在线查看demo 
