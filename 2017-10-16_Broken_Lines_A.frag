// Author: Rigbert; Title: Broken Lines A

#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution, u_mouse; uniform float u_time;

const float gridSize = 3.0;
const float halfStroke  = 0.45 / gridSize;

vec2 line(in vec2 pos) {
	return vec2(+0.5,+0.866) * 0.6;
}

void main() {
	vec2 p = gl_FragCoord.xy / u_resolution * gridSize;  // TODO ratio correction
	vec2 q = floor(p);
    p = p-q;
    q *= gridSize;  // TODO 
    
    vec2 l = line(q);
    float len2 = l.x*l.x + l.y*l.y;
	float len1 = sqrt(len2);
    mat2 dir = mat2(l.x/len2, -l.y/len1, l.y/len2, +l.x/len1);  // TODO
    
    vec2 st = dir * p;
    float dist = st.s>0.0 ? st.s<1.0 ? abs(st.t) : distance(p,l) : length(p);
	float height = 1.0 - dist / halfStroke;
	
    vec3 color = vec3(height);
    gl_FragColor = vec4(color, 1.0);
}
