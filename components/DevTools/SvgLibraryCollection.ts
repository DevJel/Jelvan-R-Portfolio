/**
 * Jelvan Elements — one hundred additional, original, programmatic SVG designs.
 * Ten intentionally different collections, each with ten uniquely named motifs.
 * Every asset shares a 120 x 120 coordinate system, a transparent background,
 * and the same editable two-color palette; all geometry is local and deterministic.
 * No downloaded icons, stock artwork, libraries, external references or scripts.
 */

type Draw = (variant: number, ink: string, accent: string) => string;
export type SvgCollectionAsset = {
  id: string;
  name: string;
  kind: string;
  description: string;
  drawing: (ink: string, accent: string) => string;
};

type Point = [number, number];
const fmt = (value: number): string => Number(value.toFixed(2)).toString();
const polar = (r: number, angle: number, cx = 60, cy = 60): Point => [
  cx + r * Math.cos(angle * Math.PI / 180),
  cy + r * Math.sin(angle * Math.PI / 180),
];
const stroke = (color: string, width = 3): string =>
  'fill="none" stroke="' + color + '" stroke-width="' + fmt(width) + '" stroke-linecap="round" stroke-linejoin="round"';
const path = (d: string, color: string, width = 3, extra = ''): string =>
  '<path d="' + d + '" ' + stroke(color, width) + ' ' + extra + '/>';
const circle = (x: number, y: number, r: number, color: string, extra = ''): string =>
  '<circle cx="' + fmt(x) + '" cy="' + fmt(y) + '" r="' + fmt(r) + '" fill="' + color + '" ' + extra + '/>';
const line = (a: Point, b: Point, color: string, width = 3, extra = ''): string =>
  '<line x1="' + fmt(a[0]) + '" y1="' + fmt(a[1]) + '" x2="' + fmt(b[0]) + '" y2="' + fmt(b[1]) + '" ' + stroke(color, width) + ' ' + extra + '/>';
const poly = (vertices: Point[], fill: string, outline: string, width = 2, extra = ''): string =>
  '<polygon points="' + vertices.map(([x,y]) => fmt(x) + ',' + fmt(y)).join(' ') +
  '" fill="' + fill + '" stroke="' + outline + '" stroke-width="' + fmt(width) + '" stroke-linejoin="round" ' + extra + '/>';
const rect = (x: number, y: number, w: number, h: number, r: number, fill: string, outline = 'none', sw = 2): string =>
  '<rect x="' + fmt(x) + '" y="' + fmt(y) + '" width="' + fmt(w) + '" height="' + fmt(h) +
  '" rx="' + fmt(r) + '" fill="' + fill + '" stroke="' + outline + '" stroke-width="' + fmt(sw) + '"/>';
const polygonPoints = (sides: number, radius: number, rotation = -90, cx = 60, cy = 60): Point[] =>
  Array.from({length: sides}, (_,i) => polar(radius, rotation + i * 360 / sides, cx, cy));

const orbit: Draw = (v, a, b) => {
  const angle = v * 17 - 29;
  const rx = 33 + v % 3 * 4;
  const ry = 17 + v % 4 * 3;
  const ellipses = Array.from({length: 2 + v % 2}, (_,i) =>
    '<ellipse cx="60" cy="60" rx="' + fmt(rx + i * 4) + '" ry="' + fmt(ry + i * 2) +
    '" ' + stroke(i === 1 ? b : a, i === 1 ? 2.5 : 3) + ' transform="rotate(' +
    fmt(angle + i * (43 + v)) + ' 60 60)" opacity="' + (i === 1 ? '.8' : '1') + '"/>').join('');
  const satellites = Array.from({length: 2 + v % 3}, (_,i) => {
    const theta = (angle + i * 125 + 25) * Math.PI / 180;
    const pt: Point = [60 + rx * Math.cos(theta), 60 + ry * Math.sin(theta)];
    const rotated = polar(Math.hypot(pt[0]-60,pt[1]-60), angle + 20 + i * 100);
    return circle(rotated[0],rotated[1],3.5 + i % 2 * 1.5,i % 2 ? a : b);
  }).join('');
  return ellipses + satellites + circle(60,60,10 + v % 3,a) + circle(60,60,4,b) +
    line(polar(8,angle),polar(48,angle),b,2);
};

const crystal: Draw = (v, a, b) => {
  const sides = [3,4,5,6,7,8,4,5,6,8][v];
  const rotation = -90 + v * 9;
  const vertices = polygonPoints(sides, 43, rotation);
  const middle = polygonPoints(sides, 24 + v % 3 * 2, rotation + 180/sides);
  return poly(vertices,'none',a,3) +
    vertices.map((p,i) => poly([p, middle[i], middle[(i+1)%sides]], i % 2 ? 'none' : b,a,1,'opacity="' + (i % 2 ? '1' : '.2') + '"')).join('') +
    poly(middle,'none',b,3) +
    middle.filter((_,i)=>i % 2===0).map(p=>line(p,[60,60],a,2)).join('') +
    circle(60,60,5 + v % 3,b);
};

const bloom: Draw = (v, a, b) => {
  const petals = 5 + v;
  const width = 7 + v % 4 * 2;
  const reach = 42 - v % 3 * 3;
  const petal = 'M60 54 C' + fmt(60-width) + ' ' + fmt(54-reach*.33) +
    ' ' + fmt(60-width) + ' ' + fmt(54-reach*.7) + ' 60 ' + fmt(54-reach) +
    ' C' + fmt(60+width) + ' ' + fmt(54-reach*.7) + ' ' + fmt(60+width) + ' ' +
    fmt(54-reach*.33) + ' 60 54Z';
  return Array.from({length:petals},(_,i)=>'<path d="' + petal + '" fill="' +
    (i % 3===0 ? b : 'none') + '" fill-opacity=".35" stroke="' + a +
    '" stroke-width="2.5" transform="rotate(' + fmt(i*360/petals+v*6) + ' 60 60)"/>').join('') +
    circle(60,60,14,b) + circle(60,60,7,a) +
    Array.from({length:petals},(_,i)=>{const p=polar(12,i*360/petals);return circle(p[0],p[1],2.2,a);}).join('');
};

const signal: Draw = (v, a, b) => {
  const layers = 3 + v % 4;
  const centerY = 58 + v % 3 * 2;
  const top = Array.from({length:layers},(_,i)=>{
    const y = centerY - 33 + i * (55/(layers-1));
    const amp = 7 + (i+v)%3*7;
    return path('M13 '+fmt(y)+' C30 '+fmt(y-amp)+' 43 '+fmt(y+amp)+' 60 '+fmt(y)+
      ' S91 '+fmt(y-amp)+' 107 '+fmt(y),i===Math.floor(layers/2)?b:a,i===Math.floor(layers/2)?4.5:2.8);
  }).join('');
  const points = Array.from({length:2+v%3},(_,i)=>{
    const x=27+i*27, y=centerY + (i%2 ? 14 : -14);
    return circle(x,y,3.8,i%2?b:a);
  }).join('');
  return top + points + line([60,17],[60,102],b,1.5,'stroke-dasharray="2 7"');
};

const network: Draw = (v, a, b) => {
  const count = 4 + v;
  const nodes = Array.from({length:count},(_,i)=>polar(40,-90+i*360/count));
  const skip = 2 + v % 3;
  const edges = nodes.map((p,i)=>line(p,nodes[(i+skip)%count], i%2?a:b,1.7,'opacity=".63"')).join('');
  const contour = poly(nodes,'none',a,2);
  const hubs = nodes.map((p,i) => line([60,60],p,i%2?b:a,1.2,'opacity=".55"')).join('');
  const dots = nodes.map((p,i)=>circle(p[0],p[1],3.5+i%3*1.2,i%2?b:a)).join('');
  return edges + contour + hubs + dots + circle(60,60,7,b) + circle(60,60,2.8,a);
};

const interfaceDraw: Draw = (v, a, b) => {
  const frame=rect(14,16,92,88,10,'none',a,2.8)+line([14,36],[106,36],a,2.5)+
    [23,31,39].map(x=>circle(x,26,2.3,x===23?b:a)).join('');
  const solid=(x:number,y:number,w:number,h:number)=>rect(x,y,w,h,3,b);
  const box=(x:number,y:number,w:number,h:number)=>rect(x,y,w,h,4,'none',a,2.3);
  const bar=(x:number,y:number,w:number)=>line([x,y],[x+w,y],a,3);
  const motifs=[
    () => box(24,46,72,14)+circle(32,53,3,b)+bar(43,53,40)+solid(24,70,24,22)+box(56,70,40,22),
    () => solid(24,78,12,16)+solid(43,65,12,29)+solid(62,52,12,42)+solid(81,70,12,24)+bar(24,46,30),
    () => solid(24,45,18,49)+box(48,45,48,20)+box(48,71,22,23)+box(74,71,22,23),
    () => [24,49,74].map((x,i)=>box(x,47,22,19+i*7)).join('')+bar(24,91,72),
    () => [50,67,84].map((y,i)=>bar(26,y,66)+circle(40+i*19,y,6,b)).join(''),
    () => [46,62,78].map((y,i)=>circle(30,y,4,b)+bar(42,y,43-i*7)).join('')+bar(24,95,35),
    () => poly([[25,86],[42,72],[57,80],[77,54],[94,63]],'none',b,4)+bar(24,93,70)+bar(24,47,20),
    () => box(23,45,74,46)+path('M39 58l-9 10 9 9M81 58l9 10-9 9',a,3.5)+line([67,53],[52,82],b,4),
    () => [0,1,2,3,4,5,6].map(i=>box(24+(i%4)*19,47+Math.floor(i/4)*23,16,19)).join('')+solid(62,70,16,19),
    () => box(25,45,28,21)+box(69,45,27,21)+box(47,75,27,20)+
      line([53,55],[69,55],b,3)+line([81,66],[61,75],b,3)+line([39,66],[61,75],b,3),
  ];
  return frame+motifs[v]();
};

const ribbon: Draw = (v, a, b) => {
  const count=3+v%4;
  const angle=v*13-35;
  const waves=Array.from({length:count},(_,i)=>{
    const y=29+i*(58/Math.max(1,count-1));
    const amp=17+v%4*3;
    return path('M15 '+fmt(y)+' C'+fmt(33+v%9)+' '+fmt(y-amp)+
      ' '+fmt(41-v%6)+' '+fmt(y+amp)+' 60 '+fmt(y)+
      ' S'+fmt(90-v%5)+' '+fmt(y-amp)+' 105 '+fmt(y),i%2?b:a,
      i%2?5:3.5,'transform="rotate('+angle+' 60 60)"');
  }).join('');
  const p=polar(36,angle+45);
  return waves+circle(p[0],p[1],5,b)+circle(60,60,5,a);
};

const star: Draw = (v, a, b) => {
  const tips=5+v;
  const outline=Array.from({length:tips*2},(_,i)=>polar(i%2===0?42:17,-90+i*180/tips+v*4));
  const moon=Array.from({length:4},(_,i)=>polar(49,v*43+i*75));
  return poly(outline,'none',a,2.8) +
    poly(outline.filter((_,i)=>i%2===0),'none',b,1.7,'opacity=".55"')+
    circle(60,60,10,b)+circle(60,60,4,a)+
    moon.map((p,i)=>i%2===0?circle(p[0],p[1],3.2,a):
      line([p[0]-4,p[1]],[p[0]+4,p[1]],b,2)+line([p[0],p[1]-4],[p[0],p[1]+4],b,2)).join('');
};

const glyph: Draw = (v, a, b) => {
  const designs=[
    ['M27 90V31l33-19 33 19v59M27 59h66','M43 76h34'],
    ['M29 25h37q29 0 29 28T66 81H29V25m0 28h41','M74 81v15'],
    ['M89 25H48q-24 0-24 35t24 35h41M65 37 46 60l19 23','M80 60h15'],
    ['M32 20v80h25q40 0 40-40T57 20H32m0 40h45','M56 42v36'],
    ['M91 25H29v70h62M29 60h46','M74 43v34'],
    ['M27 94 60 20 93 94M41 69h38','M60 20v74'],
    ['M32 22v76M32 22h36q28 0 28 21T68 65H32M65 65l30 33','M47 84h27'],
    ['M88 26H51q-25 0-25 19 0 20 32 16 36-5 36 16 0 18-24 18H27','M35 59h50'],
    ['M25 24h70M60 24v72M35 96h50','M47 60h26'],
    ['M30 24h60l-60 72h60M30 60h60','M44 37h33'],
  ];
  return path(designs[v][0],a,5)+path(designs[v][1],b,3.5)+
    circle(60,60,4,b,'opacity=".8"');
};

const mosaic: Draw = (v, a, b) => {
  const cols=3+v%3;
  const rows=3+(v+1)%3;
  const cell=76/Math.max(cols,rows);
  const sx=60-cell*(cols-1)/2, sy=60-cell*(rows-1)/2;
  return Array.from({length:cols*rows},(_,i)=>{
    const x=sx+i%cols*cell,y=sy+Math.floor(i/cols)*cell;
    const isAccent=(i+v)%3===0;
    const rad=cell*.38;
    switch(v%5) {
      case 0: return circle(x,y,rad,isAccent?b:'none','stroke="'+a+'" stroke-width="1.7"');
      case 1: return poly([[x,y-rad],[x+rad,y],[x,y+rad],[x-rad,y]],
        isAccent?b:'none',a,1.8);
      case 2: return rect(x-rad,y-rad,rad*2,rad*2,(i%3)*rad*.45,
        isAccent?b:'none',a,1.8);
      case 3: return path('M'+fmt(x-rad)+' '+fmt(y+rad)+' Q'+fmt(x+rad)+' '+fmt(y+rad)+
        ' '+fmt(x+rad)+' '+fmt(y-rad),isAccent?b:a,2.8);
      default: return circle(x,y,rad,a,'opacity=".13"')+
        line([x-rad,y],[x+rad,y],isAccent?b:a,2.3)+
        line([x,y-rad],[x,y+rad],isAccent?b:a,2.3);
    }
  }).join('');
};

const groups: {kind: string; names: string[]; description: string; draw: Draw}[] = [
  {kind:'Orbital', description:'Layered elliptical orbits, satellite markers and a luminous central core.', draw:orbit,
   names:['Aurora Orbit','Satellite Drift','Equinox Ring','Arc Meridian','Halo Beacon','Solstice Loop','Lunar Track','Orbit Crest','Axis Circuit','Perigee Lines']},
  {kind:'Crystal', description:'A faceted architectural emblem drawn from concentric vector polygons.', draw:crystal,
   names:['Quartz Fold','Hexa Portal','Prism Facet','Diamond Rise','Facet Bloom','Mineral Core','Lattice Peak','Sharded Halo','Crystal Axis','Polygon Vault']},
  {kind:'Botanical', description:'A rotational flower study with hand-constructed petals and a centered seed.', draw:bloom,
   names:['Lumen Petals','Radial Flora','Solar Blossom','Soft Corolla','Flora Crown','Petal Lantern','Bloom Dial','Echo Flower','Leaf Halo','Botanic Compass']},
  {kind:'Signal', description:'Fluid signal traces and accent nodes forming an original waveform mark.', draw:signal,
   names:['Pulse Relay','Tidal Frequency','Signal Thread','Amplitude Loom','Current Sweep','Echo Transit','Vibrant Band','Metric Flow','Resonant Paths','Spectral Pulse']},
  {kind:'Network', description:'An original connection topology with distributed nodes and linking paths.', draw:network,
   names:['Vertex Hub','Mesh Orbit','Link Matrix','Node Relay','Circuit Mesh','Point Nexus','Graph Bloom','Network Loop','Cluster Atlas','Data Constellation']},
  {kind:'Interface', description:'An original interface component study enclosed in a shared browser frame.', draw:interfaceDraw,
   names:['Search Surface','Metric Cards','Sidebar Studio','Tile Workspace','Slider Panel','Task Checklist','Trend Plot','Code Window','Calendar Grid','Flow Builder']},
  {kind:'Ribbon', description:'An interlaced ribbon mark using multiple hand-shaped Bézier curves.', draw:ribbon,
   names:['Satin Current','Ribbon Cascade','Flowfold','Thread Compass','Wind Gesture','Contour Drift','Motion Weave','Velvet Sweep','Cascade Trails','Kinetic Ribbons']},
  {kind:'Celestial', description:'A custom angular star emblem with accent satellites and a central spark.', draw:star,
   names:['Nova Compass','Polaris Bloom','Night Meridian','Starlight Axis','Zenith Crown','Cosmic Dial','Dawn Vector','Nebula Point','Aster Compass','Astral Crest']},
  {kind:'Glyph', description:'An original angular monoline symbol with a contrasting inner accent.', draw:glyph,
   names:['Aperture Glyph','Arcform Glyph','Crestline Glyph','Delta Glyph','Edge Glyph','Elevation Glyph','Linkform Glyph','Shift Glyph','Spine Glyph','Zigline Glyph']},
  {kind:'Pattern', description:'A repeatable, perfectly centered tile system with geometric accents.', draw:mosaic,
   names:['Lattice Dots','Diamond Field','Pixel Grid','Curve Matrix','Cross Stitch','Dot Chamber','Rhombus Tiles','Modular Squares','Weave Matrix','Axis Field']},
];

export const additionalSvgAssets: SvgCollectionAsset[] = groups.flatMap(group =>
  group.names.map((name,variant) => ({
    id: group.kind.toLowerCase() + '-' + String(variant + 1).padStart(2,'0'),
    name,
    kind: group.kind,
    description: group.description,
    drawing: (ink:string, accent:string) => group.draw(variant, ink, accent),
  }))
);
