// Author: 
// Title: 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

const float PI2 = 2.*3.1415926535;
const float PI2F = 1./PI2;
#define angle_mode_compass;

void main() {
    float r,t,a,red,green,blue,alpha;
    vec2 st = gl_FragCoord.xy/u_resolution.xy*2.-1.;
    #ifdef angle_mode_compass
	    t = atan(-st.x,-st.y)*PI2F+0.5;
    #else
    	t = atan(-st.y,-st.x)*PI2F+0.5;  // mathematician's angle
	#endif
    r = sqrt(dot(st,st));

    red   = cos(PI2*t);
    green = cos(PI2*(t-1./3.));
    blue  = sin(3.*PI2*r);
    alpha = r<=1.?1.:0.;

    gl_FragColor = vec4(red,green,blue,alpha);
}