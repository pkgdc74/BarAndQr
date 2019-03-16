angular.module("AssetsUI",[])
    .directive("qrcode",function(){
        return {
            restrict:"E",
            template:''
            +'<div style="display:inline-block">'
            +'  <div class="qrbar-labelbox qrbar-stdborder">'
            +'    <div class="qrbar-inlineblock qrbar-labeltext" style="width:{{width}}px;height: {{height}}px;">'
            +'        <div>{{code}}</div>'
            +'        <div ng-repeat="(k,v) in data" class="qrbar-databox"><span>{{k}}</span><span>: {{v}}</span></div>'
            +'    </div>'
            +'    <div class="qrbar-inlineblock qrbar-stdborder" width="{{width}}px" height="{{height}}px"></div>'
            +'  </div>'
            +'</div>',
            scope:{code:"=",data:"=?",width:"@?",height:"@?"},
            link:function(s,e,a){
                s.height=s.height||72;
                s.width=s.width||72;
                var canvas=e.children(0).children(0).children(0)[1]
                s.$watchGroup(["code","width","height"],function(){
                    new QRCode(canvas, {
                        text: ""+s.code,
                        width: s.height,
                        height: s.height,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.H
                    });
                })
            }
        }
    })
    .directive("barcode",function(){
        return {
            restrict:"E",
            template:''
            +'<div style="display:inline-block">'
            +'  <div class="qrbar-labelbox qrbar-stdborder">'
            +'      <div class="qrbar-inlineblock qrbar-labeltext" style="width:{{width}};height: {{height}};">'
            +'          <div>{{code}}</div>'
            +'          <div ng-repeat="(k,v) in data" class="qrbar-databox"><span>{{k}}</span><span>: {{v}}</span></div>'
            +'      </div>'
            +'      <canvas class="qrbar-inlineblock"></canvas>'
            +'  </div>'
            +'</div>',
            scope:{code:"=",data:"=?",width:"@?",height:"@?",options:"=?"},
            link:function(s,e,a){
                s.options=s.options||{displayValue:true,height:36,width:1,fontSize:10}
                s.width=s.width||"144px"
                s.height=s.height||"72px"
                var canvas=e.children(0).children(0).children(0)[1]
                s.$watchGroup(["code","width","height","options"],function(){
                    JsBarcode(canvas, s.code,s.options);
                })
            }
        }
    })