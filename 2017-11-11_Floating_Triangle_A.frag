// Title: 2017-11-11_Floating_Triangle_A    Author: Rigbert

#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution; uniform float u_time;

const mat3 velocities = mat3(.09,.3,.0,-.27,-.11,.0,.15,-.17,.0);
const vec3 color0 = vec3(.9,.5,.1);
const vec3 color1 = vec3(.1,.1,.6);

vec3 reflect(vec3 point) {return abs(mod(point,2.0)-1.0);}

vec3 n(vec3 p0, vec3 p1) {return vec3(p1.y-p0.y,p0.x-p1.x,0.0);}

void main() {
    mat3 p = u_time * velocities;  // three moving 2D points
    p = mat3(reflect(p[0]), reflect(p[1]), reflect(p[2]));
    mat3 normals = mat3(n(p[0],p[1]),n(p[1],p[2]),n(p[2],p[0]));

    vec3 pixel = vec3(gl_FragCoord.xy / u_resolution.xy, 0.0);
    vec3 dist = vec3( dot((pixel-p[0]),normals[0]) ,
                      dot((pixel-p[1]),normals[1]) ,
                      dot((pixel-p[2]),normals[2]) );

    float sector = step(0.0, dist.s * dist.t * dist.p);
    gl_FragColor = vec4(mix(color0, color1, sector), 1.0);
}
