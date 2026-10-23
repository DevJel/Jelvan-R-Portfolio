// Deterministic illustration generator for the Jelvan Elements portfolio.
// All artwork is built locally from original SVG primitives.
const TYPES=["gpu","ram","ssd","mobo","fan","case","psu","chip","cooler","cpu"];
const DESCR={"gpu":"Graphics card","ram":"Memory module","ssd":"Solid state drive","mobo":"Motherboard","fan":"Cooling fan","case":"Computer case","psu":"Power supply","chip":"Microchip","cooler":"CPU cooler","cpu":"Processor"};
function R(x,y,w,h,fill="#151C27",stroke="#425061",rx=8,sw=2){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;}

function C(x,y,r,fill="#101822",stroke="#65788E",sw=2){return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;}

function L(x1,y1,x2,y2,stroke="#F48120",sw=3){return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" fill="none"/>`;}

function P(d,stroke="#F48120",sw=3,fill="none"){return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;}

function F(x,y,r,blades=5) {
 let z=C(x,y,r,"#121D2A","#C5CFDA",3)+C(x,y,r-7,"none","#566476",1.6);
 for(let i=0;i<blades;i++){const deg=i*360/blades;z+=`<path d="M${x+7} ${y-1} Q${x+14} ${y-29} ${x+r-13} ${y-10} Q${x+r-8} ${y+4} ${x+16} ${y+13}Z" transform="rotate(${deg} ${x} ${y})" fill="${i%2?"#E5EAF1":"url(#accent)"}" opacity="${i%2?".76":".95"}"/>`;}
 return z+C(x,y,10,"#111924","#FCB35A",2)+C(x,y,3,"#F6F8FB","#F6F8FB",1);
}

function H(type,v) {
 const a="#F48120",w="#EDF2F8",mut="#6D8095",dark="#172230";
 let z="";
 switch(type){
 case "gpu":{
  const n=1+(v%3), width=v%4===3?265:250, start=-width/2;
  z+=R(start,-68,width,128,dark,"#F2F5F8",17,3)+R(start+10,-57,width-20,100,"#0D141E",mut,10,1.5);
  const spacing=(width-34)/n;
  for(let i=0;i<n;i++){const x=start+17+(i+.5)*spacing; const rad=Math.min(41,spacing*.39);
   z+=F(Math.round(x),-8,Math.round(rad),4+((i+v)%5));
  }
  for(let i=0;i<6-(v%3);i++)z+=R(start+18+i*13,44,7,7,i%2?a:"#485668","#485668",2,1);
  z+=R(start+38,60,width*.64,9,"#B97728", "#EEAB48",1,1);
  if(v%2)z+=`<path d="M${start+18} -53l38 0M${start+18} -43h22" stroke="${a}" stroke-width="3"/>`;
  if(v>5)z+=L(start+width-30,49,start+width+5,83,w,3);
  break;
 }
 case "ram":{
  const modules=v%4===1?2:1;for(let m=0;m<modules;m++){const y=-46+m*69;let chips=4+(v%5);
   z+=R(-133,y,266,70,dark, v%2?a:w,8,2.5);
   const cw=226/chips;
   for(let i=0;i<chips;i++){
    z+=R(Math.round(-114+i*cw),y+12,Math.max(16,Math.round(cw-8)),35,(i+v)%3===0?"#B86A19":"#2E4054","#D4DEEA",3,1);
    if(v%3===0)z+=L(-110+i*cw,y+54,-103+i*cw,y+54,a,1.5);
   }
   for(let i=0;i<23;i++)z+=R(-116+i*10,y+67,6,10,i%3===0?"#FFD28C":"#C88A36","#C88A36",0,0);
  }
  if(v%2===0)z+=P("M-140 -57l25 -13h212l25 13",a,2);
  break;
 }
 case "ssd":{
  const mode=v%4;
  if(mode===0||mode===3){z+=R(-103,-91,206,182,"#DDE4EC","#FFFFFF",19,3)+R(-90,-78,180,155,dark,a,11,3)+R(-68,-57,136,38,"#26394D",mut,6,1)+R(-68,0,70,54,"url(#accent)","#FFCF91",6,1);
   for(let i=0;i<3;i++)z+=R(20+i*17,12,12,26,"#64788C",mut,2,1);
   if(mode===3)z+=P("M-55 68h110","#F48120",2);}
  else{z+=R(-133,-43,266,86,"#172C34", "#F5F7FA",11,3)+R(-118,-32,235,64,"#101C25","#478579",8,1);
   for(let i=0;i<3+(v%4);i++)z+=R(-102+i*40,-19,29,35,i%2?"#445368":"#E16E27","#E8E9EA",4,1);
   z+=C(117,0,7,dark,"#D7E2EB",3)+R(-101,40,176,11,"#C08B41","#EDBB69",1,1);}
  if(v>=5)z+=`<g opacity=".75">${L(-114,-88,-74,-88,a,2)}${L(78,88,115,88,w,2)}</g>`;
  break;
 }
 case "mobo":{
  z+=R(-118,-125,236,250,"#172E36","#E3E9F1",12,3);
  for(let j=0;j<5;j++)z+=P(`M-105 ${-94+j*40}h${60+j%2*20}l${25+j*5} ${-14+j%2*28}h${46-j*4}`,"#3D8A73",2);
  z+=R(-65,-82,103,100,"#0D1721", "#C8D2DE",11,3)+R(-54,-71,81,78,"#53677B",a,6,2);
  z+=R(-42,-59,56,52,"#263848","#E3E8F0",5,1.5);
  for(let i=0;i<(v%3)+2;i++)z+=R(56+i*14,-92,7,105,i%2?a:"#E0E6F0",mut,2,1);
  for(let j=0;j<3;j++)z+=R(-82,35+j*26,148-j*18,10,j===v%3?"url(#accent)":"#9EAAB8",mut,3,1);
  if(v%2===0)z+=R(62,49,36,46,"#DDE4ED","#F6F7FA",4,1)+R(68,56,24,24,dark,a,3,1);
  for(let i=0;i<4;i++)z+=R(-116+i*22,-137,15,13,"#D7DEE8","#D7DEE8",2,1);
  break;
 }
 case "fan":{
  const pairs=v%4===2?2:1;
  if(pairs===2){z+=R(-128,-77,124,154,dark,w,14,3)+F(-66,0,53,4+v%4)+R(4,-77,124,154,dark,w,14,3)+F(66,0,53,5+(v%3));}
  else {const rad=80+(v%3)*7;z+=R(-106,-106,212,212,dark,v%2?a:w,20,3)+F(0,0,rad,4+v%6);}
  for(let j=0;j<4;j++){const x=j%2?-96:96, y=j<2?-96:96;z+=C(x,y,5,"#F7F8FA",mut,1);}
  break;
 }
 case "case":{
  const narrow=v%3===0;const wd=narrow?127:178;const x=-wd/2;
  z+=R(x,-128,wd,254,"#263545","#D2DBE7",13,3);
  z+=P(`M${x+wd*.65} -126l22 15v221l-22 13`,a,2);
  z+=R(x+13,-110,wd-27,209,"#0E1622",mut,9,1.6);
  const cnt=2+v%3;
  for(let i=0;i<cnt;i++)z+=F(x+wd/2,-80+i*(154/Math.max(1,cnt-1)),Math.min(28,76/cnt),5+v%3);
  z+=R(x+17,106,wd-34,5,"url(#accent)",a,2,1);
  if(v%2)z+=R(x+wd-25,-112,11,205,"#567A89","#7491A8",2,1);
  for(let j=0;j<3;j++)z+=C(x+19+j*14,-120,2.5,j===0?a:"#C6CDD8","none",0);
  break;
 }
 case "psu":{
  z+=R(-125,-82,250,171,dark,"#F1F3F8",13,3)+R(-109,-67,145,139,"#0D141D",mut,10,2)+F(-37,0,59,5+(v%4));
  z+=R(49,-64,60,125,"#263748","#7D91A5",7,2);
  const n=5+(v%4);for(let i=0;i<n;i++){const x=55+(i%2)*25,y=-47+Math.floor(i/2)*25;z+=R(x,y,19,13,i%2?a:"#111922","#D3DEE9",2,1.5);}
  z+=R(-94,90,190,10,"#CDA171","#DEA85E",2,1);
  if(v%3===2)z+=P("M124 -28c24 -18 39 16 25 35s-6 33 12 46","#EC8B33",6);
  break;
 }
 case "chip":{
  const dims=114+(v%4)*14, half=dims/2;
  z+=R(-half,-half,dims,dims,"#111923",a,11,3);
  for(let i=0;i<9;i++){const pos=-half+9+i*(dims-18)/8;
   z+=R(-half-15,pos,12,5,"#E8C58D","#E8C58D",1,1)+R(half+3,pos,12,5,"#E8C58D","#E8C58D",1,1);
   z+=R(pos,-half-15,5,12,"#E8C58D","#E8C58D",1,1)+R(pos,half+3,5,12,"#E8C58D","#E8C58D",1,1);
  }
  z+=R(-half+20,-half+20,dims-40,dims-40,"#2E4358","#DFE6EF",6,2);
  const inner=2+(v%4),step=(dims-57)/inner;
  for(let x=0;x<inner;x++)for(let y=0;y<inner;y++){z+=R(-half+28+x*step,-half+28+y*step,step-5,step-5,(x+y+v)%3===0?"url(#accent)":"#90A6B9","#AFC1CF",2,1);}
  break;
 }
 case "cooler":{
  const liquid=v%3===2;
  if(liquid){
   z+=R(-136,-64,195,129,"#14222E","#DFE6EE",10,3);
   for(let i=0;i<2;i++)z+=F(-80+i*91,0,37,6+(v%3));
   z+=P("M59 -22C83 -99 114 -72 114 -20M59 23C87 83 126 72 117 22",a,5);
   z+=C(120,0,35,"#25364A",w,4)+C(120,0,20,"url(#accent)","#FFCC82",2);
  }else{
   z+=R(-98,-110,195,215,"#203042","#DCE4ED",12,3);
   for(let i=0;i<9;i++)z+=R(-87,-98+i*23,174,9,i%2?"#95A4B3":"#D3DCE7","#BAC4CE",2,1);
   if(v%2===0)z+=F(0,-3,69,5+v%4);
   else z+=R(-56,-82,112,164,dark,a,12,3)+F(0,0,50,4+(v%5));
   for(let i=0;i<3;i++)z+=P(`M${-40+i*35} 106v24`, "#D89B60",5);
  }
  break;
 }
 case "cpu":{
  const q=142+(v%3)*11, half=q/2;
  z+=R(-half,-half,q,q,"#D1DAE4","#F5F5F8",16,3)+R(-half+13,-half+13,q-26,q-26,"#1D2B3C",a,10,2.5);
  for(let j=0;j<8;j++){const pos=-half+18+j*(q-36)/7;
   z+=L(-half-17,pos,-half-2,pos,j%2?a:w,3)+L(half+2,pos,half+17,pos,j%2?a:w,3);
   z+=L(pos,-half-17,pos,-half-2,j%2?a:w,3)+L(pos,half+2,pos,half+17,j%2?a:w,3);
  }
  const nn=2+(v%3),pwidth=(q-58)/nn;
  for(let i=0;i<nn;i++)for(let j=0;j<nn;j++)
   z+=R(-half+29+i*pwidth,-half+29+j*pwidth,pwidth-6,pwidth-6,(i+j+v)%3===0?"url(#accent)":"#465E75","#C1D0DC",4,1);
  if(v>5)z+=P("M-42 -42H42V42H-42Z","#F3AA52",2);
  break;
 }}
 return z;
}

function makeSVG(type,variant,number,alternate=false){
 const serial=String(number).padStart(3,"0");
 const title=(DESCR[type]||type)+" — design "+serial+(alternate?" alternate":"");
 const heading=`${type.toUpperCase()} / ${serial}${alternate?"B":""}`;
 const center=(dx,dy,scale,rot,ix)=>`<g transform="translate(${dx} ${dy}) rotate(${rot}) scale(${scale})">${H(type,ix)}</g>`;
 let scene="";
 switch(variant){
 case 0:scene=center(200,198,1,0,0)+P("M46 112v-34h34M354 112v-34h-34M46 288v34h34M354 288v34h-34","#65788E",3);break;
 case 1:scene=center(153,163,.75,-12,1)+center(262,245,.62,10,2)+P("M95 281L182 281 200 263","#EF993D",3);break;
 case 2:scene=center(200,201,.98,-17,2)+`<circle cx="200" cy="201" r="140" fill="none" stroke="#F48120" stroke-opacity=".3" stroke-dasharray="12 18" stroke-width="2"/>`+C(323,105,6,"#F48120","#F48120");break;
 case 3:scene=center(128,153,.57,-7,3)+center(277,248,.67,14,4)+P("M210 110V291","#5B6D7F",2)+C(208,196,6,"#F48120","#F48120");break;
 case 4:scene=center(169,195,.87,0,4)+R(294,105,65,186,"#172331","#667C91",8,2)+Array.from({length:6},(_,i)=>R(305,118+i*29,40-i%2*9,9,i===2?"url(#accent)":"#B4C6D9","#B4C6D9",2,1)).join("");break;
 case 5:scene=center(199,140,.62,2,5)+center(199,263,.61,-8,6)+P("M62 197h276","#F48120",2);break;
 case 6:scene=center(191,199,.91,26,6)+R(54,68,292,262,"none","#F48120",18,2)+P("M72 299l51-46M278 129l50-50","#D0D9E4",2);break;
 case 7:scene=center(200,202,.9,-2,7)+Array.from({length:4},(_,i)=>{const ang=i*Math.PI/2+Math.PI/4;const x=(200+149*Math.cos(ang)).toFixed(1),y=(202+149*Math.sin(ang)).toFixed(1);return C(x,y,9,i%2?"#FFFFFF":"#F48120", "#F48120",2)+L(x,y,200,202,"#56677B",1)}).join("");break;
 case 8:scene=center(159,183,.76,-11,8)+center(270,242,.52,31,9)+P("M67 307l95-21M232 105l99-18","#F48120",3);break;
 case 9:scene=center(200,178,.9,0,9)+Array.from({length:12},(_,i)=>R(74+i*22,319,14,(i%4+1)*8,i%3===0?"url(#accent)":"#8194A8","#8194A8",1,1)).join("");break;
 default:scene=center(147,193,.72,-20,10)+center(263,191,.72,20,2)+C(200,190,15,"url(#accent)","#F6F8FA",3);break;
 }
 const serialMark=variant+1;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" role="img" aria-label="${title}" data-creator="Jelvan Elements">
<title>${title}</title><desc>Distinct vector hardware study with a consistent charcoal, silver and orange palette.</desc><metadata>Jelvan Elements | ${type.toUpperCase()} | ${serial} | Art study ${serialMark}</metadata>
<defs><linearGradient id="accent" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFB447"/><stop offset="1" stop-color="#F16A1B"/></linearGradient><linearGradient id="back" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1D2633"/><stop offset="1" stop-color="#090F18"/></linearGradient></defs>
<rect width="400" height="400" rx="30" fill="url(#back)"/>
<rect x="14" y="14" width="372" height="372" rx="22" fill="none" stroke="#6F8197" stroke-opacity=".3" stroke-width="1.5"/>
<path d="M34 332V80M360 78v250" stroke="#F48120" stroke-opacity=".19" stroke-width="2" stroke-dasharray="5 12"/>
${scene}
<rect x="25" y="25" width="128" height="31" rx="11" fill="#F1F4F8"/>
<text x="89" y="45" text-anchor="middle" fill="#1C2A39" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1">${heading}</text>
<rect x="312" y="345" width="62" height="27" rx="10" fill="#F48120"/>
<text x="343" y="363" text-anchor="middle" fill="#161D29" font-family="Arial, sans-serif" font-size="12" font-weight="700">ART ${String(serialMark).padStart(2,"0")}</text>
</svg>`;
}

module.exports={TYPES,makeSVG};
if (require.main === module) {
 const fs=require('node:fs'),path=require('node:path');
 for(let n=1;n<=100;n++){const kind=TYPES[(n-1)%10],v=Math.floor((n-1)/10),name=`pc_component_${String(n).padStart(3,'0')}_${kind}_premium.svg`; const p=path.join(__dirname,'../public/assets/svg-library/pc-components',kind,name);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,makeSVG(kind,v,n));}
 const alt=path.join(__dirname,'../public/assets/svg-library/pc-components/cpu/pc_component_100_cpu_premium-variant-2.svg');fs.writeFileSync(alt,makeSVG('cpu',10,100,true));
 console.log('Generated 101 distinct SVG illustrations.');
}
