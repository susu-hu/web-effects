class LoadMethod{
    static get LOAD_IMG_FINISH(){
        return "load_img_finish";
    }
    static init(sourceList){
        let img=new Image();
        img.num=0;
        img.sourceList=sourceList;
        img.targetList={};
        img.addEventListener("load",LoadMethod.loadHandler);
        img.src=sourceList[0];
 
    }
    static loadHandler(e){
        let images=this.cloneNode(false);
        let name=this.sourceList[this.num];
        name=name.slice(name.lastIndexOf("/")+1,name.lastIndexOf("."));
        this.targetList[name]={src:images.src,elem:images,width:images.width,height:images.height};
        this.num++;
        if(this.num>this.sourceList.length-1){
            this.removeEventListener("load",LoadMethod.loadHandler);
            let evt=new Event(LoadMethod.LOAD_IMG_FINISH);
            evt.targetList=this.targetList;
            document.dispatchEvent(evt);
            return;
        }
        this.src=this.sourceList[this.num];
 
    }
}
class Drag{
    static dragElem(elem,rect,parent){
        Drag.drageHandler=Drag.mouseHandler.bind(elem);
        elem.rect=rect;
        elem.parent=parent;
        elem.addEventListener("mousedown",Drag.drageHandler);
    }
    static removeDrag(elem){
        elem.removeEventListener("mousedown",Drag.drageHandler);
        Drag.drageHandler=null;
    }
    static mouseHandler(e){
        if(e.type==="mousedown"){
            this.addEventListener("mouseup",Drag.drageHandler);
            this.offsetPoint={x:e.offsetX,y:e.offsetY};
            document.addEventListener("mousemove",Drag.drageHandler);
        }else if(e.type==="mousemove"){
           if(!this.rect){
               this.rect=this.parent.getBoundingClientRect();
           }
            let obj={
                left:e.x-this.offsetPoint.x-this.rect.left+"px",
                top:e.y-this.offsetPoint.y-this.rect.top+"px",
                position:"absolute"
            };
            Object.assign(this.style,obj);
            let elemRect=this.getBoundingClientRect();
            if(elemRect.left<this.rect.left){
                this.style.left="0px";
            }
            if(elemRect.right>this.rect.right){
                this.style.left=this.rect.right-elemRect.width-this.rect.left+"px";
            }
            if(elemRect.top<this.rect.top){
                this.style.top="0px";
            }
            if(elemRect.bottom>this.rect.bottom){
                this.style.top=this.rect.bottom-elemRect.height-this.rect.top+"px";
            }
            let evt=new Event(Drag.ELEM_MOVE_EVENT);
            evt.point={x:this.offsetLeft,y:this.offsetTop};
            this.dispatchEvent(evt);
        }else if(e.type==="mouseup"){
            this.removeEventListener("mouseup",Drag.drageHandler);
            document.removeEventListener("mousemove",Drag.drageHandler);
        }
    }
    static get ELEM_MOVE_EVENT(){
        return "elem_move_event";
    }
}