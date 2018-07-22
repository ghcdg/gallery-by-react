require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//let yeomanImage = require('../images/yeoman.png');

//获取图片相关的数据
var imageDatas=require('../data/imageDatas.json');

//传入图片数据，利用自执行函数，将图片名信息转化成图片URL路径信息,最后返回图片数组
imageDatas=(function getImageURL(imageDatasArr){
    for(var  i = 0, j = imageDatasArr.length;i < j;i++){
    var singleImageData=imageDatasArr[i];
    singleImageData.imageURL=require('../images/'+singleImageData.fileName);
    imageDatasArr[i]=singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

 /**
  * 返回两个数给定区间内的随机值
  */
 function getRangeRandom(low , high){
  return Math.ceil(Math.random()*(high - low) + low);
}

 /**
  * 返回0-30度之间的一个任意正负值
  */
function get30DegRandom(){
  return ((Math.random()>0.5 ? '' :'-')+
  Math.ceil(Math.random()*30));
}




//类 舞台
class AppComponent extends React.Component {
  constructor(){
    super();

    //存储图片的状态信息,数组中每一个元素对应一张图片的状态信息
    this.state={
      imgsArrangeArr:[
        /*
        {
          pos:{left:'0',top:'0'},//当前图片位置信息
          rotate:0, //当前图片旋转信息
          isInverse:false, //当前图片正反面 默认false不反转
          isCenter:false //当前图片是否居中
        }
        */
      ]
    };

    /**
     * 画廊一共分为4个分区 左分区、右分区、上分区、中心分区
     */
    this.Constant={
      centerPos:{//舞台中心分区图片
        left:0,
        right:0
      },
      hPosRange:{//左右分区图片取值范围 (将它看成水平方向 horizontalPos)
        leftSecX:[0,0],//左分区x坐标范围
        rightSecX:[0,0],//右分区x坐标范围
        y:[0,0]//左右分区y坐标范围
      },
      vPosRange:{//上分区图片取值范围 (将它看成垂直方向 verticalPos)
        x:[0,0],//上分区x坐标范围
        topY:[0,0]//上分区y坐标范围
      }
    };

  }

  //组件加载以后，为每张图片计算其位置的范围
  componentDidMount(){
    
    //拿到舞台的大小
    var stageDOM=ReactDOM.findDOMNode(this.refs.stage),
        stageW=stageDOM.scrollWidth,
        stageH=stageDOM.scrollHeight,
        halfStageW=Math.ceil(stageW/2),
        halfStageH=Math.ceil(stageH/2);

    //拿到一个imgFigure的大小
    var imgFigureDOM=ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW=imgFigureDOM.scrollWidth,
        imgH=imgFigureDOM.scrollHeight,
        halfImgW=Math.ceil(imgW/2),
        halfImgH=Math.ceil(imgH/2);

    //计算中心分区图片的位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    //计算左分区图片x坐标取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    
    //计算右分区图片x坐标取值范围
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    
    //计算左右分区图片y坐标取值范围
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    //计算上分区图片x坐标的取值范围
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    //计算上分区图片y坐标的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

    //componentDidMount后，调用rerrange函数指定第一张图片居中
    this.rerrange(0);

  }

  /**
   * 重新布局图片
   * @param centerIndex 指定居中排布那张图片
   */
  rerrange(centerIndex){
    //获取定义的相关变量信息
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        //水平方向即左右分区
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        //垂直方向即上分区
        vPosRange = Constant.vPosRange,
        vPosRangeX = vPosRange.x,
        vPosRangeTopY = vPosRange.topY,
        
        imgsArrangeTopArr=[],//定义数组存储上分区的图片
        topImgNum=Math.floor(Math.random()*2),//图片数量为0或1 Math.random()是令系统随机选取大于等于 0.0 且小于 1.0 的伪随机
        topImgSpliceIndex=0,//所获取的上分区在图片 在数组对象中的图片下标(0--imgsArrangeArr.length-1)

        //获取一张放在舞台中心的图片
        imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);
        imgsArrangeCenterArr[0]={
          pos:centerPos,//布局舞台中心的centerIndex图片使其居中
          rotate:0,//中心分区的图片不需要旋转
          isCenter:true
        };

        //获取要布局在上分区的图片的状态信息
        topImgSpliceIndex = Math.floor(Math.random()*(imgsArrangeArr.length - topImgNum));//获取图片下标
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);//获取图片
        //布局上分区图片使其放置在上分区范围内
        imgsArrangeTopArr.forEach(function(value,index){
          imgsArrangeTopArr[index]={
            pos:{
              top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
              left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
            },
            rotate:get30DegRandom(),
            isCenter:false
          }
        });

        //剩下的图片 布局左右分区图片使其放置在左右分区范围内
        for(var  i=0,j =imgsArrangeArr.length,k=j/2;i<j;i++){
          var hPosRangeLORX = null;
          
          //图片数组中的图片 前半部分布局左分区，右半部分布局右分区
          if(i < k){
            hPosRangeLORX = hPosRangeLeftSecX;
          }else{
            hPosRangeLORX = hPosRangeRightSecX;
          }
          //给剩下的图片设置状态
          imgsArrangeArr[i]={
            pos : {
              top: getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
              left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
            },
            rotate:get30DegRandom(),
            isCenter:false
          };
        }

        /**
         * 取出图片将其打乱显示后 重新将取出的图片放回数组
         * 为下一次打乱显示图片作准备 分别放回上分区和中心分区的图片
         */
        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({imgsArrangeArr:imgsArrangeArr});//更改状态信息
  }

  /**
   * 返回一个 改变图片的翻转状态 的闭包给<ImgFigure />组件的inverse属性
   * 当点击<ImgFigure />组件时,调用该闭包完成图片状态的翻转
   * 因为该方法的定义是在<AppComponent />组件 使用是在<ImgFigure />组件 所以使用闭包
   * @param index 当前被执行inverse操作的图片在数组中的index值
   */
  inverse(index){
    return function(){
      var imgsArrangeArr=this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse=!imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr:imgsArrangeArr
      });
    }.bind(this);
  }

  /**
   * 同理可返回一个 改变舞台中心分区图片的状态 的闭包<ImgFigure />组件的
   */
  center(index){
    return function(){
      this.rerrange(index);
    }.bind(this);
  }

  render() {

    var controllerUnits = [],imgFigures = [];//分别存储控制单元和图片

    //遍历并图片信息并传入给<ImgFigure/>组件,将每个组件都添加到数组ImgFigues中
    imageDatas.forEach(function(value,index){

      //初始化所有图片状态信息
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index]={
          pos:{left:0,top:0},
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      }

      //ImgFigure组件获取相关信息
      imgFigures.push(<ImgFigure ref={'imgFigure'+index}
       key={index} arrange={this.state.imgsArrangeArr[index]}
       data={value} inverse={this.inverse(index)} center={this.center(index)} />);

      //Controller组件获取相关的信息
      controllerUnits.push(<ControllerUnits key={index} arrange={this.state.imgsArrangeArr[index]}
      inverse={this.inverse(index)} center={this.center(index)} />);

    }.bind(this));


    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }

}




//类 单张图片
class ImgFigure extends React.Component{

  /**
   * imgFigure的点击处理函数
   * 若当前点击的图片是中心图片 则翻转该图片
   * 若当前点击的图片不是中心图片 则使该图片移动到中心分区
   */
  handleClick(e){
    if(this.props.arrange.isCenter){
      this.props.inverse();//中心图片才可以翻转
    }
    else{
      this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render(){
    //用于存储显示元素的css样式属性
    var styleObj={};

    //如果props属性中指定了这张图片的位置，则使用该位置信息
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }
    //设置中心图片的zIndex值得数量级10的1次方 避免被其他图片遮挡
    if(this.props.arrange.isCenter){
      styleObj.zIndex=111;
    }

    //如果props属性中指定了这张图片的旋转角度，则使用该旋转角度信息
    if(this.props.arrange.rotate){
      (['MozTransform','msTransform','WebkitTransform','transform']).forEach(
        function(value){
          styleObj[value]='rotate('+this.props.arrange.rotate+'deg)';
      }.bind(this))
    }

    var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';//多个类名之间要有空格
        
      return(
        //显示单张图片的相关信息
        <figure className={imgFigureClassName} style={styleObj}
        onClick={(e)=>this.handleClick(e)} >
          <img src={this.props.data.imageURL}
               alt={this.props.data.title}
          />
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
            <div className='img-back' onClick={(e)=>this.handleClick(e)}>
            <p>{this.props.data.desc}</p>
            </div>
          </figcaption>
        </figure>
    );
  }
}



//类 控制组件
class ControllerUnits extends React.Component{

  handleClick(e){
    //如果当前按钮在中心分区 则翻转图片 否则对应图片移动到中心分区
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }
    else{
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  }

  render(){
    var controllerUnitClassName='controller-unit';

    //如果图片位于中心分区 按钮显示对应居中状态
    if(this.props.arrange.isCenter){
      controllerUnitClassName+=' is-center';//多个类名之间要有空格
      //如果图片被翻转 南牛显示对应翻转状态
      if(this.props.arrange.isInverse){
        controllerUnitClassName+=' is-inverse';//多个类名之间要有空格
      }
    }

    return(
        <span className={controllerUnitClassName} onClick={(e)=>this.handleClick(e)}></span>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
