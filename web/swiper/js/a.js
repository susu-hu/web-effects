class ZoomClasses{
    constructor(panrent){
        this.bindHandler=this.loadFinishHandler.bind(this);
        document.addEventListener(LoadMethod.LOAD_IMG_FINISH,this.bindHandler);
        this.zoomView=this.createView();
        panrent.appendChild(this.zoomView);
    }
    createView(){
        if(this.zoomView) return this.zoomView;
        let div=document.createElement("div");
        this.minDiv=document.createElement("div");
        this.maxDiv=document.createElement("div");
        this.dragDiv=document.createElement("div");
        Object.assign(div.style,{
            position:"relative",
        });
        this.minDiv.appendChild(this.dragDiv);
        div.appendChild(this.minDiv);
        div.appendChild(this.maxDiv);
        this.dragDiv.addEventListener(Drag.ELEM_MOVE_EVENT,this.moveHandler.bind(this));
        Drag.dragElem(this.dragDiv,null,this.minDiv);
        this.minDiv.style.float=this.maxDiv.style.float="left";
        return div;
    }
    set width(value){
        this._width=value;
        this.render();
    }
    get width(){
        if(!this._width) this._width=0;
        return this._width;
    }
    set height(value){
        this._height=value;
        this.render();
    }
    get height(){
        if(!this._height) this._height=0;
        return this._height;
    }
    set imgSource(value){
        if(!Array.isArray(value))return;
        this._imgSource=value;
        LoadMethod.init(value);
    }
    set left(value){
        this.zoomView.style.left=value+"px";
    }
    set top(value){
        this.zoomView.style.top=value+"px";
    }
    loadFinishHandler(e){
        this.targetList=e.targetList;
       this.width=this.width || e.targetList["min"].width;
       this.height=this.height || e.targetList["min"].height;
 
    }
    moveHandler(e){
        if(!this.targetList || this.targetList.length<2) return;
        let widthScale=this.targetList["min"].width/this.targetList["max"].width;
        let heightScale=this.targetList["min"].height/this.targetList["max"].height;
        Object.assign(this.maxDiv.style,{
            backgroundPositionX:-e.point.x/widthScale+"px",
            backgroundPositionY:-e.point.y/widthScale+"px",
        });
    }
    render(){
        if(!this.targetList || this.targetList.length<2) return;
        Object.assign(this.minDiv.style,{
            width:this.width+"px",
            height:this.height+"px",
 
            border:"1px solid #000000",
 
            backgroundImage:`url(${this.targetList["min"].src})`,
            position:"relative"
        });
        Object.assign(this.maxDiv.style,{
            width:this.width+"px",
            height:this.height+"px",
            backgroundImage:`url(${this.targetList["max"].src})`,
            position:"relative"
        });
        let widthScale=this.targetList["min"].width/this.targetList["max"].width;
        let heightScale=this.targetList["min"].height/this.targetList["max"].height;
        Object.assign(this.dragDiv.style,{
            width:this.width*widthScale+"px",
            height:this.height*heightScale+"px",
            backgroundColor:"rgba(255,0,0,0.2)",
            position:"absolute"
        })
 
    }
}