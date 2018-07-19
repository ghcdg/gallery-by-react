require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');

//获取图片相关的数据
let imageDatas=require('../data/imageDatas.json');

//传入图片数据，利用自执行函数，将图片名信息转化成图片URL路径信息,最后返回图片数组
imageDatas=(function getImageURL(imageDatasArr){
    for(var i=0,j=imageDatasArr.length;i<j;i++){
    var singleImageData=imageDatasArr[i];
    singleImageData.imageURL=require('../images/'+singleImageData.fileName);
    imageDatasArr[i]=singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

/**
 *  <div className="index">
    <img src={yeomanImage} alt="Yeoman Generator" />
    <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
    </div>
 */

class AppComponent extends React.Component {

  constructor(){
    super();

    //存储图片的状态信息,数组中每一个元素对应一张图片的状态信息
    this.state={
      imgsArrangeArr:[
        /*
        {
          pos:{left:'0',top:'0'}
        }
        */
      ]
    };

    this.Constant={
      centerPos:{//舞台中心图片
        left:0,
        right:0
      },
      hPosRange:{//水平方向图片 horizontalPos
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{//垂直方向图片 verticalPos
        x:[0,0],
        topY:[0,0]
      }
    };

  }

  //组件加载以后，为每张图片计算其位置的范围
  componentDidMount(){
    
    //拿到舞台的大小
    var stageDOM=React.findDOMNode(this.refs.stage),
        stageW=stageDOM.scrollWidth,
        stageH=stageDOM.scrollHeight,
        halfStageW=Math.ceil(stageW/2),
        halfStageH=Math.ceil(stageH/2);

    //拿到一个imgFigure的大小
    var imgFigureDOM=React.findDOMNode(this.refs.ImgFigure0),
        imgW=imgFigureDOM.scrollWidth,
        imgH=imgFigureDOM.scrollHeight,
        halfImgW=Math.ceil(imgW/2),
        halfImgH=Math.ceil(imgH/2);

    //计算中心图片的位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    //计算左侧图片取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    
    //计算右侧图片取值范围
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算上测区域图片排布的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    //componentDidMount后，调用rerrange函数指定第一张图片居中
    this.rerrange(0);

  }

  /*重新布局图片
    @param centerIndex 指定居中排布那张图片
  */
  rerrange(centerIndex){

  }

  render() {

    var controllerUnits=[],ImgFigures=[];

    //遍历并图片信息并传入给<ImgFigure/>组件,将每个组件都添加到数组ImgFigues中
    imageDatas.forEach(function(value,index){

      //初始化所有图片状态信息
      if(!this.stage.imgsArrangeArr[index]){
        this.stage.imgsArrangeArr[index]={
          pos:{left:0,top:0}
        }
      }

      ImgFigures.push(<ImgFigure ref={'imgFigure'+index} data={value}/>);
    }.bind(this));

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {ImgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }

}

class ImgFigure extends React.Component{
  render(){
    return(
        //显示单张图片的相关信息
        <figure className="img-figure">
          <img src={this.props.data.imageURL} alt={this.props.data.title}/>
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
          </figcaption>
        </figure>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
