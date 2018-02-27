// Author: rigbert;    Title: 2018-02-26_R-Logo

#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;

const vec2 normal = normalize(vec2(.6,.8));
const float stroke = .38;
const float gap = .18;
const float letterHeight = .8;
const vec3 color = sqrt(1./3.) * vec3(.30, .95, .86);

const float xmax = .78;  // TODO aus normal u.a. berechnen
const vec4 edges = vec4(gap/2.,1, .5,.7);

void main() {
    vec2 st = (gl_FragCoord.xy*2./u_resolution.xy-vec2(-1,-1))/letterHeight;
    vec4 p = vec4(st,dot(st,normal),dot(st,vec2(-normal.x,normal.y)));//TODO
    float a = any(bvec3(all(lessThan(p,edges)),false,false)) ?1.:0.;
    gl_FragColor = vec4(a * color, 1.);
}
