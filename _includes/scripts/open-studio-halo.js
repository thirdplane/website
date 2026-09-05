// Original Nova Halo shaders and renderer, with a compact page lifecycle.
(() => {
  const canvas = document.getElementById('open-halo-canvas');
  if (!canvas) return;
      // ========== GLSL ==========
      const vertexShaderSource = `
        attribute vec2 a_position;
        varying vec2 v_uv;
        void main() {
          v_uv = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fragmentShaderSource = `
        precision highp float;
        varying vec2 v_uv;
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        uniform float uHover;
        uniform float uSpin;
        uniform float uHue;
        uniform float uNoiseDensity;
        uniform float uNoiseSpeed;
        uniform float uNoiseIntensity;
        uniform float uHoverIntensity;

        const float INNER_RADIUS = 0.6;         // Framer spec center radius
        const float COLOR_ROTATION_SPEED = 2.0; // rotates gradient 2x faster than orbit
        const float ORBIT_SPEED = -1.0;         // CCW, one rev every ~6.28s

        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
        float snoise3(vec3 v){
          const vec2 C=vec2(1.0/6.0,1.0/3.0);
          const vec4 D=vec4(0.0,0.5,1.0,2.0);
          vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
          vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;
          vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
          vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
          i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
          float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
          vec4 j=p-49.0*floor(p*ns.z*ns.z);
          vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
          vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;
          vec4 h=1.0-abs(x)-abs(y);
          vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
          vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;
          vec4 sh=-step(h,vec4(0.0));
          vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
          vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
          vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
          vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
          vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
          m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        mat2 rot2(float a){float c=cos(a);float s=sin(a);return mat2(c,-s,s,c);}

        vec3 rgb2yiq(vec3 c){
          return vec3(
            dot(c, vec3(0.299, 0.587, 0.114)),
            dot(c, vec3(0.596, -0.274, -0.322)),
            dot(c, vec3(0.211, -0.523, 0.312))
          );
        }
        vec3 yiq2rgb(vec3 c){
          return vec3(
            dot(c, vec3(1.0, 0.956, 0.621)),
            dot(c, vec3(1.0, -0.272, -0.647)),
            dot(c, vec3(1.0, -1.106, 1.703))
          );
        }
        vec3 adjustHue(vec3 color, float hue){
          vec3 yiq = rgb2yiq(color);
          float h = radians(hue);
          float c = cos(h);
          float s = sin(h);
          yiq.yz = mat2(c, -s, s, c) * yiq.yz;
          return yiq2rgb(yiq);
        }

        float light1(float a, float b, float d){return a / (1.0 + d * b);}
        float light2(float a, float b, float d){return a / (1.0 + d * d * b);}

        vec4 extractAlpha(vec3 col){
          float alpha = max(col.r, max(col.g, col.b));
          return vec4(col, alpha);
        }

        void main(){
          vec2 uv=(v_uv-0.5)*2.0;
          uv.x*=iResolution.x/iResolution.y;
          uv=rot2(uSpin)*uv;
          float hover=uHover;
          uv.x+=hover*uHoverIntensity*0.1*sin(uv.y*10.0+iTime);
          uv.y+=hover*uHoverIntensity*0.1*sin(uv.x*10.0+iTime);

          float len=length(uv);
          float ang=atan(uv.y,uv.x);
          float invLen=len>0.0?1.0/len:0.0;

          // Base colors with optional hue shift
          vec3 c1 = adjustHue(uColorA, uHue);
          vec3 c2 = adjustHue(uColorB, uHue);
          vec3 c3 = adjustHue(uColorC, uHue);

          // Animated noise for edge breathing
          float n0 = snoise3(vec3(uv * uNoiseDensity, iTime * uNoiseSpeed)) * 0.5 + 0.5;

          // Ring centerline radius (breathing)
          float r0 = mix(mix(INNER_RADIUS, 1.0, 0.4), mix(INNER_RADIUS, 1.0, 0.6), n0 * uNoiseIntensity);

          // Distance to the ideal ring at this angle
          vec2 onCircle = (r0 * invLen) * uv;
          float d0 = distance(uv, onCircle);

          // Core ring glow
          float v0 = light1(1.0, 10.0, d0);
          v0 *= smoothstep(r0 * 1.05, r0, len);

          // Color rotation around the ring
          float cl = cos(ang + iTime * COLOR_ROTATION_SPEED) * 0.5 + 0.5;
          vec3 col = mix(c1, c2, cl);
          col = mix(c3, col, v0);

          // Orbiting highlight (sliver)
          float a = iTime * ORBIT_SPEED;
          vec2 pos = vec2(cos(a), sin(a)) * r0;
          float d = distance(uv, pos);
          float v1 = light2(1.5, 5.0, d);
          v1 *= light1(1.0, 50.0, d0); // constrain to ring

          // Outer edge and hollow masks
          float v2 = smoothstep(1.0, mix(INNER_RADIUS, 1.0, n0 * 0.5), len);
          float v3 = smoothstep(INNER_RADIUS, mix(INNER_RADIUS, 1.0, 0.5), len);

          col = (col + v1) * v2 * v3;
          col = clamp(col, 0.0, 1.0);

          vec4 outCol = extractAlpha(col);
          // premultiply
          gl_FragColor = vec4(outCol.rgb * outCol.a, outCol.a);
        }
      `;

      function createShader(gl, type, src) {
        const sh = gl.createShader(type);
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(sh));
          return null;
        }
        return sh;
      }

      function createProgram(gl, vs, fs) {
        const p = gl.createProgram();
        gl.attachShader(p, vs);
        gl.attachShader(p, fs);
        gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(p));
          return null;
        }
        return p;
      }

      class HaloRenderer {
        constructor(canvas, colors) {
          this.canvas = canvas;
          this.colors = colors;
          this.currentHover = 0;
          this.targetHover = 0;
          this.currentSpin = 0;
          this.lastTime = 0;
          this.destroyed = false;

          this.gl = canvas.getContext('webgl', {
            alpha: true,
            premultipliedAlpha: false,
            antialias: true
          });
          if (!this.gl) return;

          this.init();
        }

        init() {
          const gl = this.gl;
          const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
          const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
          if (!vs || !fs) return;
          this.program = createProgram(gl, vs, fs);
          gl.deleteShader(vs); gl.deleteShader(fs);
          if (!this.program) return;

          this.positionLocation = gl.getAttribLocation(this.program, 'a_position');
          this.uniforms = {
            iTime: gl.getUniformLocation(this.program, 'iTime'),
            iResolution: gl.getUniformLocation(this.program, 'iResolution'),
            uColorA: gl.getUniformLocation(this.program, 'uColorA'),
            uColorB: gl.getUniformLocation(this.program, 'uColorB'),
            uColorC: gl.getUniformLocation(this.program, 'uColorC'),
            uHover: gl.getUniformLocation(this.program, 'uHover'),
            uSpin: gl.getUniformLocation(this.program, 'uSpin'),
            uHue: gl.getUniformLocation(this.program, 'uHue'),
            uNoiseDensity: gl.getUniformLocation(this.program, 'uNoiseDensity'),
            uNoiseSpeed: gl.getUniformLocation(this.program, 'uNoiseSpeed'),
            uNoiseIntensity: gl.getUniformLocation(this.program, 'uNoiseIntensity'),
            uHoverIntensity: gl.getUniformLocation(this.program, 'uHoverIntensity')
          };

          this.positionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1,
             3, -1,
            -1,  3
          ]), gl.STATIC_DRAW);

          this.resize();
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }

        resize() {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const rect = this.canvas.getBoundingClientRect();
          this.canvas.width = rect.width * dpr;
          this.canvas.height = rect.height * dpr;
          this.width = rect.width;
          this.height = rect.height;
          if (this.gl) this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }

        render(time) {
          const gl = this.gl;
          if (!gl || !this.program || this.destroyed) return;
          const dt = time - this.lastTime;
          this.lastTime = time;
          this.currentHover += (this.targetHover - this.currentHover) * 0.1;
          if (this.currentHover > 0.01) this.currentSpin += dt * 0.3;

          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.useProgram(this.program);
          gl.uniform1f(this.uniforms.iTime, time);
          gl.uniform2f(this.uniforms.iResolution, this.width, this.height);
          gl.uniform3f(this.uniforms.uColorA, this.colors.a[0]/255, this.colors.a[1]/255, this.colors.a[2]/255);
          gl.uniform3f(this.uniforms.uColorB, this.colors.b[0]/255, this.colors.b[1]/255, this.colors.b[2]/255);
          gl.uniform3f(this.uniforms.uColorC, this.colors.c[0]/255, this.colors.c[1]/255, this.colors.c[2]/255);
          gl.uniform1f(this.uniforms.uHover, this.currentHover);
          gl.uniform1f(this.uniforms.uSpin, this.currentSpin);
          gl.uniform1f(this.uniforms.uHue, 0.0);
          gl.uniform1f(this.uniforms.uNoiseDensity, 0.65);
          gl.uniform1f(this.uniforms.uNoiseSpeed, 0.5);
          gl.uniform1f(this.uniforms.uNoiseIntensity, 1.0);
          gl.uniform1f(this.uniforms.uHoverIntensity, 0.2);

          gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
          gl.enableVertexAttribArray(this.positionLocation);
          gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

        setHover(isHovering) {
          this.targetHover = isHovering ? 1.0 : 0.0;
        }
      }


  const renderer = new HaloRenderer(canvas, {
    a: [169, 210, 187], b: [116, 164, 255], c: [171, 111, 157]
  });
  if (!renderer.gl || !renderer.program) return;
  canvas.parentElement.classList.add('is-rendered');
  const control = document.getElementById('open-motion');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  let visible = true;
  let frame = null;
  let elapsed = 0;
  let lastFrame = null;
  control.hidden = false;

  function updateControl() {
    control.textContent = paused ? 'Play motion' : 'Pause motion';
    control.setAttribute('aria-pressed', String(paused));
  }
  function stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastFrame = null;
  }
  function draw(timestamp) {
    frame = null;
    if (paused || document.hidden || !visible) return;
    if (lastFrame !== null) elapsed += (timestamp - lastFrame) / 1000;
    lastFrame = timestamp;
    renderer.render(elapsed);
    frame = requestAnimationFrame(draw);
  }
  function sync() {
    stop();
    updateControl();
    renderer.render(elapsed);
    if (!paused && !document.hidden && visible) frame = requestAnimationFrame(draw);
  }
  control.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', stop);
  canvas.addEventListener('pointermove', () => renderer.setHover(true), {passive:true});
  canvas.addEventListener('pointerleave', () => renderer.setHover(false), {passive:true});
  new ResizeObserver(() => { renderer.resize(); renderer.render(elapsed); }).observe(canvas);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(canvas);
  sync();
})();
