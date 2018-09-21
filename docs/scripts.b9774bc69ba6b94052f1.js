!function(){var t=function(t){var a,n,r,s=this;function l(t){s.draggedPie=s.getTarget(h(t)),s.draggedPie&&(s.hoveredIndex=s.draggedPie.index)}function d(){s.draggedPie&&(s.draggedPie=null,s.draw())}function o(t){var e=h(t);if(s.draggedPie){var a=s.draggedPie,n=Math.atan2(e.y-a.centerY,e.x-a.centerX)-a.angleOffset;s.shiftSelectedAngle(n),s.draw()}else{var i=s.getTarget(e);i?(s.hoveredIndex=i.index,s.draw()):-1!=s.hoveredIndex&&(s.hoveredIndex=-1,s.draw())}}function h(t){var e=s.canvas.getBoundingClientRect();return t.clientX?{x:t.clientX-e.left,y:t.clientY-e.top}:{x:t.originalEvent.targetTouches[0].clientX-e.left,y:t.originalEvent.targetTouches[0].clientY-e.top}}t=function(t){t=t||{};for(var e=1;e<arguments.length;e++)if(arguments[e])for(var a in arguments[e])arguments[e].hasOwnProperty(a)&&(t[a]=arguments[e][a]);return t}({},this.defaults,t),this.canvas=t.canvas,this.context=t.canvas.getContext("2d"),this.context?(t.proportions?this.data=(n=(a=t.proportions).reduce(function(t,e){return t+e.proportion},0),r=0,a.map(function(t,a){var s=e*t.proportion/n,l={angle:r,format:t.format,collapsed:s<=0};return r=i(r+s),l})):t.data&&(this.data=t.data),this.draggedPie=null,this.hoveredIndex=-1,this.radius=t.radius,this.collapsing=t.collapsing,this.minAngle=t.minAngle,this.drawSegment=t.drawSegment,this.drawNode=t.drawNode,this.onchange=t.onchange,"ontouchstart"in window||navigator.maxTouchPoints?(this.canvas.addEventListener("touchstart",l),this.canvas.addEventListener("touchmove",o),document.addEventListener("touchend",d)):(this.canvas.addEventListener("mousedown",l),this.canvas.addEventListener("mousemove",o),document.addEventListener("mouseup",d)),this.draw()):console.log("Error: DraggablePiechart needs an html5 canvas.")};t.prototype.moveAngle=function(t,e){if(this.data[t].collapsed&&e<0)this.setCollapsed(t,!1);else{var a=this.getGeometry();this.draggedPie={index:t,angleOffset:0,centerX:a.centerX,centerY:a.centerY,startingAngles:this.data.map(function(t){return t.angle}),collapsed:this.data.map(function(t){return t.collapsed}),angleDragDistance:0},this.shiftSelectedAngle(this.data[t].angle+e),this.draggedPie=null,this.draw()}},t.prototype.getSliceSizePercentage=function(t){for(var a=this.getVisibleSegments(),n=0;n<a.length;n+=1)if(a[n].index==t)return 100*a[n].arcSize/e;return 0},t.prototype.getAllSliceSizePercentages=function(){for(var t=this.getVisibleSegments(),a=[],n=0;n<this.data.length;n+=1)if(this.data[n].collapsed)a[n]=0;else for(var i=0;i<t.length;i+=1)t[i].index==n&&(a[n]=100*t[i].arcSize/e);return a},t.prototype.getGeometry=function(){var t=Math.floor(this.canvas.width/2),e=Math.floor(this.canvas.height/2);return{centerX:t,centerY:e,radius:Math.min(t,e)*this.radius}},t.prototype.getTarget=function(t){for(var e=this.getGeometry(),n=[],i=[],r={index:-1,distance:9999999,angle:null},s=0;s<this.data.length;s+=1)if(n.push(this.data[s].angle),i.push(this.data[s].collapsed),!this.data[s].collapsed){var l=Math.atan2(t.y-e.centerY,t.x-e.centerX),d=Math.abs(a(l,this.data[s].angle));d<r.distance&&(r.index=s,r.distance=d,r.angle=l)}return r.distance<.1?{index:r.index,angleOffset:a(r.angle,n[r.index]),centerX:e.centerX,centerY:e.centerY,startingAngles:n,collapsed:i,angleDragDistance:0}:null},t.prototype.setCollapsed=function(t,e){var r=this.data[t].collapsed&&!e;this.data[t].collapsed=e;for(var s=this.getVisibleSegments(),l=0;l<s.length;l+=1)if(s[l].index==t){if(r){var d=s[n(l+1,s.length)];this.data[t].angle=d.angle-this.minAngle}for(var o=0;o<s.length-1;o+=1){var h=s[n(1+l-o,s.length)],g=s[n(l-o,s.length)];Math.abs(a(this.data[h.index].angle,this.data[g.index].angle))<this.minAngle&&(this.data[g.index].angle=i(this.data[h.index].angle-this.minAngle))}break}this.draw()},t.prototype.getVisibleSegments=function(){for(var t=[],a=0;a<this.data.length;a+=1)if(!this.data[a].collapsed){for(var n=this.data[a].angle,i=!1,r=1;r<this.data.length;r+=1){var s=(a+r)%this.data.length;if(!this.data[s].collapsed){var l=this.data[s].angle-n;l<=0&&(l+=e),t.push({arcSize:l,angle:n,format:this.data[a].format,index:a}),i=!0;break}}if(!i){t.push({arcSize:e,angle:n,format:this.data[a].format,index:a});break}}return t},t.prototype.getInvisibleSegments=function(){for(var t=[],e=0;e<this.data.length;e+=1)this.data[e].collapsed&&t.push({index:e,format:this.data[e].format});return t},t.prototype.draw=function(){var t=this.context,e=this.canvas;t.clearRect(0,0,e.width,e.height);for(var a=this.getGeometry(),i=this.getVisibleSegments(),r=0,s=-1,l=0;l<i.length;l+=1)i[l].arcSize>r&&(r=i[l].arcSize,s=l);for(l=0;l<i.length;l+=1){var d=n(l+s+1,i.length);this.drawSegment(t,this,a.centerX,a.centerY,a.radius,i[d].angle,i[d].arcSize,i[d].format,!1)}var o,h,g=this.getInvisibleSegments();for(l=0;l<g.length;l+=1)this.drawSegment(t,this,a.centerX,a.centerY,a.radius,0,0,g[l].format,!0);for(l=0;l<i.length;l+=1){var c=(o=i[l].angle,{x:(h=a.radius)*Math.cos(o),y:h*Math.sin(o)});this.drawNode(t,this,c.x,c.y,a.centerX,a.centerY,l==this.hoveredIndex)}this.onchange(this)},t.prototype.shiftSelectedAngle=function(t){if(this.draggedPie){var r=this.draggedPie,s=r.startingAngles[r.index],l=a(t,s),d=r.angleDragDistance,o=d>0?1:-1,h=d>0==l>0;Math.abs(d-l)>Math.PI&&!h?l=(e-Math.abs(l))*o:o=l>0?1:-1,r.angleDragDistance=l,this.data[r.index].angle=i(s+l),this.data[r.index].collapsed=r.collapsed[r.index];for(var g=!0,c=!1,f=this.minAngle,u=0,v=1;v<this.data.length;v+=1){var p=n(parseInt(r.index)+v*o,this.data.length),m=a(r.startingAngles[p],s);if(m*o<0&&(m=(m*o+e)*o),this.collapsing){this.data[p].collapsed=r.collapsed[p];var x=!c&&!this.data[p].collapsed;x&&m>0&&l>m-f?(this.data[r.index].angle=this.data[p].angle,this.data[r.index].collapsed=!0,c=!0):x&&m<0&&l<m+f?(this.data[r.index].angle=this.data[p].angle,this.data[p].collapsed=!0,c=!0):this.data[p].angle=r.startingAngles[p]}else{var S=(u+1)*f;g&&m>0&&l>m-S?(this.data[p].angle=i(r.startingAngles[p]+(l-m)+S),u+=1):g&&m<0&&l<m+S?(this.data[p].angle=i(r.startingAngles[p]-(m-l)-S),u+=1):(g=!1,this.data[p].angle=r.startingAngles[p])}}}},t.prototype.defaults={onchange:function(t){},radius:.9,data:[{angle:-2,format:{color:"#de3832",label:"Angular"},collapsed:!1},{angle:-1,format:{color:"#61dafb",label:"React"},collapsed:!1},{angle:0,format:{color:"#744cbc",label:"Redux"},collapsed:!1},{angle:1,format:{color:"#c6538c",label:"SASS"},collapsed:!1},{angle:2,format:{color:"#c2185b",label:"RxJS"},collapsed:!1}],collapsing:!1,minAngle:.1,drawSegment:function(t,e,a,n,i,r,s,l,d){if(!d){t.save();var o=r+s;t.beginPath(),t.moveTo(a,n),t.arc(a,n,i,r,o,!1),t.closePath(),t.fillStyle=l.color,t.fill(),t.restore(),t.save(),t.translate(a,n),t.rotate(r);var h=Math.floor(t.canvas.height/25),g=i-h,c=n/10;t.textAlign="right",t.font=h+"pt Helvetica",t.fillText(l.label,g,c),t.restore()}},drawNode:function(t,a,n,i,r,s,l){t.save(),t.translate(r,s),t.fillStyle="#DDDDDD";var d=l?7:5;t.beginPath(),t.arc(n,i,d,0,e,!0),t.fill(),t.stroke(),t.restore()}},window.DraggablePiechart=t;var e=2*Math.PI;function a(t,e){return Math.atan2(Math.sin(t-e),Math.cos(t-e))}function n(t,e){return(t%e+e)%e}function i(t){return n(t+Math.PI,e)-Math.PI}}();