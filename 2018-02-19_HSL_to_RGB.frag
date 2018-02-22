// Author: rigbert; Title: Test

#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution; uniform float u_time;
// uniform sampler2D sampler;

const vec4 hue        = vec4(120,180,240,360);
const vec4 saturation = vec4(.86,.86,.86,.86);
const vec4 light      = vec4(.33,.33,.33,.33);
const float shadowFactor = .7;

mat4 lightColors; mat4 shadowColors;
const float d = shadowFactor; const float sqr = sqrt(3.);
const mat4 darken = mat4(d,0,0,0, 0,d,0,0, 0,0,d,0, 0,0,0,1);
const mat4 xyl2Rgb = (1./3.) * mat4(0,sqr,-sqr,0, 2,-1,-1,0, 3,3,3,0, 0,0,0,3);

mat4 transpose(mat4 m) {
    return mat4(m[0][0], m[1][0], m[2][0], m[3][0],
                m[0][1], m[1][1], m[2][1], m[3][1],
                m[0][2], m[1][2], m[2][2], m[3][2],
                m[0][3], m[1][3], m[2][3], m[3][3] );
}

vec4 index(int colIdx, int rowIdx) {
    mat4 chosenRow = rowIdx==1 ? lightColors: rowIdx==2 ? shadowColors : mat4(0);
    vec4 chosenColumn;
    if (colIdx<2) chosenColumn = colIdx==0 ? chosenRow[0] : chosenRow[1];
    else          chosenColumn = colIdx==2 ? chosenRow[2] : chosenRow[3];
    return chosenColumn;
}

vec3 hsl2Rgb(vec3 hsl) {
    return vec3(0);
}

mat4 hsl2Rgb(mat4 hsl) {
    return mat4(0);
}

void main() {
    vec4 h = radians(hue);
    vec4 x = saturation * sin(h);
    vec4 y = saturation * cos(h);
	mat4 xyl = transpose( mat4( x, y, light, vec4(1) ) );
    lightColors = xyl2Rgb * xyl;
    // TODO Pruefung 0<value<1
    shadowColors = darken * lightColors;
    ivec2 st = ivec2( floor( 4. * gl_FragCoord.xy / u_resolution.xy ) );
    gl_FragColor = index(st.s, 3-st.t);
    // vec4 testColor = texture2D(sampler, vec2(.5,.8));
}
