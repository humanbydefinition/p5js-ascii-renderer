// Specifies the precision for float variables. 'highp' is the highest precision.
precision highp float;

// Declares an attribute vec3 for storing the position of a vertex. 
// Attributes are read-only inputs for the vertex shader.
attribute vec3 aPosition;

// The main function of the shader. This function is called once per vertex.
void main() {

  // Creates a vec4 (4-component vector) from the position attribute.
  // The fourth component is set to 1.0, which is typical for homogeneous coordinates.
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // Scales the rectangle by two and moves it to the center of the screen.
  // This is done by multiplying the x and y components of the position vector by 2 and then subtracting 1.
  // The result is that the rectangle's coordinates range from -1 to 1 in both dimensions, which is the coordinate system used by OpenGL.
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // Sets the position of the current vertex.
  // gl_Position is a built-in variable that must be set in the vertex shader.
  // The value assigned to gl_Position will be used by the rasterizer to generate fragments.
  gl_Position = positionVec4;
}