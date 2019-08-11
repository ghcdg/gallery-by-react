# gallery-by-react
gallery project by react

### 在线效果展示：Demo: https://ghcdg.github.io/gallery-by-react/

### 说明

工具、框架：yeoman、webpack、react、sass等

### 项目下载以及运行
1、下载项目: 使用git命令：git clone git@github.com:ghcdg/gallery-by-react.git     或者 git clone https://github.com/ghcdg/gallery-by-react.git 进行下载

2、打开命令提示符窗口 cmd：进入该项目目录（即 gallery-by-react 目录中）

3、本地安装npm包：在当前目录下输入命令：npm install 【该命令会根据 package.json 文件安装对应的模块】，安装完成后当前目录下会有一个 node_modules 的目录【注意：使用npm命令前请确保电脑已经安装nodejs，更多信息可查看：npm官网：https://docs.npmjs.com/getting-started/what-is-npm  或者npm中文文档： https://www.npmjs.com.cn/】

4、启动服务器：在当前目录下运行命令：npm run start，稍后cmd窗户中会提示  Open in iframe mode:  http://localhost:8000/webpack-dev-server/
  Open in inline mode:  http://localhost:8000/ 
  【具体端口可在 cfg 文件下的default.js中修改，有关项目的更多命令可查看项目中的 package.json 文件】

5、打开浏览器，在地址栏输入：http://localhost:8000/ 或 http://localhost:8000/webpack-dev-server/ 查看项目效果


### 项目构建

1、使用 yeoman 脚手架搭建项目框架（yeoman安装使用详情可到官网查看）

2、下载项目生成器：项目使用 react-webpack 构建（可在 github 搜索 react-webpack 并按照相关提示安装使用）

3、在github上新建一个仓库（此处仓库名为：gallery-by-react）,将 github 中新建的仓库 gallery-by-react 下载到本地，命令提示符窗口/GitBash 进入到当前文件夹 gallery-by-react 中，使用命令：yo react-webpack gallery-by-react （命令分别为：yeoman命令，项目生成器，项目名称）来生成项目,项目生成过程中的设置可结合自身需要选择（如，本项目过程中会使用到sass，在选择的时候就选sass），否则默认即可

4、项目生成后，可根据实际需要自行修改项目以适应实际开发需求，其中目录结构、文件配置等详情，可查看 yeoman 官网,或自行使用的脚手架官网

### 项目打包以及上传

1、项目打包：个人为了使本项目打包好后可以直接运行，进入 cfg 文件中的 default.js 文件，将其中的 publicPath: '/assets/',修改为 publicPath: './assets/',保存后运行 npm run dist 重新编译，dist 文件将会被更新

2、项目上传：使用相应的 git 命令上传项目

3、使用 git subtree push --prefix=dist origin gh-pages 命令将当前项目中的 dist 文件推送到当前仓库的 gh-pages 分支即可在线查看 demo,其 URL 为： https://(你的 github 用户名).github.io/ 项目(仓库)名称（如：https://ghcdg.github.io/gallery-by-react ,前提: 先搭建 github.io,详情自行搜索）

### 注：
项目中的dist文件夹是已经打包好的项目文件:下载后可直接打开dist文件的index.html查看效果【index.html和assets为打包后最终生成的文件】 

