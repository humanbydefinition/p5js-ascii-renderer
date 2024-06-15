// Specifies the precision for float variables. 'highp' is the highest precision.
precision highp float;

// Uniforms are global GLSL variables that are the same for all vertices and fragments.
uniform sampler2D u_characterTexture; // The 2D texture containing the character set
uniform float u_charsetCols; // The number of columns in the charset texture
uniform float u_charsetRows; // The number of rows in the charset texture
uniform int u_totalChars; // The total number of characters in the character set texture

uniform sampler2D u_simulationTexture; // The texture containing the simulation, which is used to create the ASCII character grid

uniform vec2 u_gridOffsetDimensions; // The dimensions of the grid offset in pixels
uniform vec2 u_gridPixelDimensions; // The dimensions of the grid cell in pixels (total width and height)
uniform vec2 u_gridDimensions; // The dimensions of the grid in number of cells

uniform vec3 u_characterColor; // The color of the ASCII characters
uniform int u_characterColorMode; // The color mode (0 = image color, 1 = single color)
uniform vec3 u_backgroundColor; // The background color of the ASCII art
uniform int u_backgroundColorMode; // The background color mode (0 = image color, 1 = single color)

uniform int u_invertMode; // The character invert mode (0 = normal, 1 = inverted)

void main() {
    // Adjust the fragment coordinate to the grid
    vec2 adjustedCoord = (gl_FragCoord.xy - u_gridOffsetDimensions) / u_gridPixelDimensions;

    // If the adjusted coordinate is outside the grid, set the fragment color to the background color and return
    if (adjustedCoord.x < 0.0 || adjustedCoord.x > 1.0 || adjustedCoord.y < 0.0 || adjustedCoord.y > 1.0) {
        gl_FragColor = vec4(u_backgroundColor, 1.0);
        return;
    }

    // Calculate the grid coordinate
    vec2 gridCoord = adjustedCoord * u_gridDimensions;
    vec2 cellCoord = floor(gridCoord);
    vec2 centerCoord = cellCoord + vec2(0.5);
    vec2 baseCoord = centerCoord / u_gridDimensions;

    // Get the color of the simulation at the base coordinate
    vec4 simColor = texture2D(u_simulationTexture, baseCoord);

    // Calculate the grayscale brightness of the simulation color
    float brightness = dot(simColor.rgb, vec3(0.299, 0.587, 0.114)); // Grayscale brightness

    // Map the brightness to a character index
    int charIndex = int(brightness * float(u_totalChars - 1));

    // Calculate the column and row of the character in the charset texture
    int charCol = charIndex - int(u_charsetCols) * (charIndex / int(u_charsetCols));
    int charRow = charIndex / int(u_charsetCols);
    vec2 charCoord = vec2(float(charCol) / u_charsetCols, float(charRow) / u_charsetRows);
    vec2 fractionalPart = fract(gridCoord) * vec2(1.0 / u_charsetCols, 1.0 / u_charsetRows);
    vec2 texCoord = charCoord + fractionalPart;

    // Get the color of the character from the charset texture
    vec4 charColor = texture2D(u_characterTexture, texCoord);

    // If the inversion mode is enabled, invert the character color
    if (u_invertMode == 1) {
        charColor.a = 1.0 - charColor.a;
        charColor.rgb = vec3(1.0);
    }

    // Calculate the final color of the character
    vec4 finalColor = (u_characterColorMode == 0) ? vec4(simColor.rgb * charColor.rgb, charColor.a) : vec4(u_characterColor * charColor.rgb, charColor.a);
    
    // If the background color mode is 0, mix the simulation color and the final color based on the character's alpha value
    // Otherwise, mix the background color and the final color based on the character's alpha value
    if (u_backgroundColorMode == 0) {
        gl_FragColor = mix(vec4(simColor.rgb, 1.0), finalColor, charColor.a);
    } else {
        gl_FragColor = mix(vec4(u_backgroundColor, 1.0), finalColor, charColor.a);
    }
}
