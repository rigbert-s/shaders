// Author: Rigbert
// Title:  Line Prototype

#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/* Definition einer Geraden in Hessescher Normalform */
const vec2  normal      = normalize(vec2(-0.866,+0.5));
const float dist2origin = -0.2;
const float halfStroke  = 0.3;

void main() {
    vec2 p = gl_FragCoord.xy / u_resolution;
    // p.x *= u_resolution.x / u_resolution.y;
    float dist = abs( dot(p,normal) - dist2origin );
    float height = 1.0 - dist / halfStroke;
    vec3 color = vec3( max(0.0, height) );
    gl_FragColor = vec4(color, 1.0);
}
