
/*
 * Matrix4 - 4x4 Matrix
 */
var Matrix4 = {};

/*
 * Matrix4.create
 * Creates a new instance of a Matrix4 using the default array type
 * Any javascript array containing at least 16 numeric elements can serve as a Matrix4
 *
 * Params:
 * matrix - Optional, Matrix4 containing values to initialize with
 *
 * Returns:
 * New Matrix4
 */
Matrix4.create = function(matrix) {
    var result = new Float32Array(16);
    
    if(matrix) {
        result[0] = matrix[0];
        result[1] = matrix[1];
        result[2] = matrix[2];
        result[3] = matrix[3];
        result[4] = matrix[4];
        result[5] = matrix[5];
        result[6] = matrix[6];
        result[7] = matrix[7];
        result[8] = matrix[8];
        result[9] = matrix[9];
        result[10] = matrix[10];
        result[11] = matrix[11];
        result[12] = matrix[12];
        result[13] = matrix[13];
        result[14] = matrix[14];
        result[15] = matrix[15];
    }
    
    return result;
};

/*
 * Matrix4.set
 * Copies the values of one Matrix4 to another
 *
 * Params:
 * matrix - Matrix4 containing values to copy
 * result - Matrix4 receiving copied values
 *
 * Returns:
 * result
 */
Matrix4.set = function(matrix, result) {
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
};

/*
 * Matrix4.identity
 * Sets a Matrix4 to an identity matrix
 *
 * Params:
 * result - Matrix4 to set
 *
 * Returns:
 * result
 */
Matrix4.identity = function(result) {
    result[0] = 1;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = 1;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[10] = 1;
    result[11] = 0;
    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
    return result;
};

/*
 * Matrix4.transpose
 * Transposes a Matrix4 (flips the values over the diagonal)
 *
 * Params:
 * matrix - Matrix4 to transpose
 * result - Optional, Matrix4 receiving transposed values. If not specified result is written to matrix
 *
 * Returns:
 * result is specified, matrix otherwise
 */
Matrix4.transpose = function(matrix, result) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if(!result || matrix == result) {
        var a01 = matrix[1], a02 = matrix[2], a03 = matrix[3];
        var a12 = matrix[6], a13 = matrix[7];
        var a23 = matrix[11];
        
        matrix[1] = matrix[4];
        matrix[2] = matrix[8];
        matrix[3] = matrix[12];
        matrix[4] = a01;
        matrix[6] = matrix[9];
        matrix[7] = matrix[13];
        matrix[8] = a02;
        matrix[9] = a12;
        matrix[11] = matrix[14];
        matrix[12] = a03;
        matrix[13] = a13;
        matrix[14] = a23;
        return matrix;
    }
    
    result[0] = matrix[0];
    result[1] = matrix[4];
    result[2] = matrix[8];
    result[3] = matrix[12];
    result[4] = matrix[1];
    result[5] = matrix[5];
    result[6] = matrix[9];
    result[7] = matrix[13];
    result[8] = matrix[2];
    result[9] = matrix[6];
    result[10] = matrix[10];
    result[11] = matrix[14];
    result[12] = matrix[3];
    result[13] = matrix[7];
    result[14] = matrix[11];
    result[15] = matrix[15];
    return result;
};

/*
 * Matrix4.determinant
 * Calculates the determinant of a Matrix4
 *
 * Params:
 * matrix - Matrix4 to calculate determinant of
 *
 * Returns:
 * determinant of matrix
 */
Matrix4.determinant = function(matrix) {
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = matrix[0], a01 = matrix[1], a02 = matrix[2], a03 = matrix[3];
    var a10 = matrix[4], a11 = matrix[5], a12 = matrix[6], a13 = matrix[7];
    var a20 = matrix[8], a21 = matrix[9], a22 = matrix[10], a23 = matrix[11];
    var a30 = matrix[12], a31 = matrix[13], a32 = matrix[14], a33 = matrix[15];

    return  a30*a21*a12*a03 - a20*a31*a12*a03 - a30*a11*a22*a03 + a10*a31*a22*a03 +
            a20*a11*a32*a03 - a10*a21*a32*a03 - a30*a21*a02*a13 + a20*a31*a02*a13 +
            a30*a01*a22*a13 - a00*a31*a22*a13 - a20*a01*a32*a13 + a00*a21*a32*a13 +
            a30*a11*a02*a23 - a10*a31*a02*a23 - a30*a01*a12*a23 + a00*a31*a12*a23 +
            a10*a01*a32*a23 - a00*a11*a32*a23 - a20*a11*a02*a33 + a10*a21*a02*a33 +
            a20*a01*a12*a33 - a00*a21*a12*a33 - a10*a01*a22*a33 + a00*a11*a22*a33;
};

/*
 * Matrix4.inverse
 * Calculates the inverse matrix of a Matrix4
 *
 * Params:
 * matrix - Matrix4 to calculate inverse of
 * result - Optional, Matrix4 receiving inverse matrix. If not specified result is written to matrix
 *
 * Returns:
 * result is specified, matrix otherwise
 */
Matrix4.inverse = function(matrix, result) {
    if(!result) { result = matrix; }
    
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = matrix[0], a01 = matrix[1], a02 = matrix[2], a03 = matrix[3];
    var a10 = matrix[4], a11 = matrix[5], a12 = matrix[6], a13 = matrix[7];
    var a20 = matrix[8], a21 = matrix[9], a22 = matrix[10], a23 = matrix[11];
    var a30 = matrix[12], a31 = matrix[13], a32 = matrix[14], a33 = matrix[15];
    
    var b00 = a00*a11 - a01*a10;
    var b01 = a00*a12 - a02*a10;
    var b02 = a00*a13 - a03*a10;
    var b03 = a01*a12 - a02*a11;
    var b04 = a01*a13 - a03*a11;
    var b05 = a02*a13 - a03*a12;
    var b06 = a20*a31 - a21*a30;
    var b07 = a20*a32 - a22*a30;
    var b08 = a20*a33 - a23*a30;
    var b09 = a21*a32 - a22*a31;
    var b10 = a21*a33 - a23*a31;
    var b11 = a22*a33 - a23*a32;
    
    // Calculate the determinant (inlined to avoid double-caching)
    var invDet = 1/(b00*b11 - b01*b10 + b02*b09 + b03*b08 - b04*b07 + b05*b06);
    
    result[0] = (a11*b11 - a12*b10 + a13*b09)*invDet;
    result[1] = (-a01*b11 + a02*b10 - a03*b09)*invDet;
    result[2] = (a31*b05 - a32*b04 + a33*b03)*invDet;
    result[3] = (-a21*b05 + a22*b04 - a23*b03)*invDet;
    result[4] = (-a10*b11 + a12*b08 - a13*b07)*invDet;
    result[5] = (a00*b11 - a02*b08 + a03*b07)*invDet;
    result[6] = (-a30*b05 + a32*b02 - a33*b01)*invDet;
    result[7] = (a20*b05 - a22*b02 + a23*b01)*invDet;
    result[8] = (a10*b10 - a11*b08 + a13*b06)*invDet;
    result[9] = (-a00*b10 + a01*b08 - a03*b06)*invDet;
    result[10] = (a30*b04 - a31*b02 + a33*b00)*invDet;
    result[11] = (-a20*b04 + a21*b02 - a23*b00)*invDet;
    result[12] = (-a10*b09 + a11*b07 - a12*b06)*invDet;
    result[13] = (a00*b09 - a01*b07 + a02*b06)*invDet;
    result[14] = (-a30*b03 + a31*b01 - a32*b00)*invDet;
    result[15] = (a20*b03 - a21*b01 + a22*b00)*invDet;
    
    return result;
};

/*
 * Matrix4.toRotationMat
 * Copies the upper 3x3 elements of a Matrix4 into another Matrix4
 *
 * Params:
 * matrix - Matrix4 containing values to copy
 * result - Optional, Matrix4 receiving copied values
 *
 * Returns:
 * result is specified, a new Matrix4 otherwise
 */
Matrix4.toRotationMatrix = function(matrix, result) {
    if(!result) { result = Matrix4.create(); }
    
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    result[9] = matrix[9];
    result[10] = matrix[10];
    result[11] = matrix[11];
    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
    
    return result;
};

/*
 * Matrix4.toMatrix3
 * Copies the upper 3x3 elements of a Matrix4 into a Matrix3
 *
 * Params:
 * matrix - Matrix4 containing values to copy
 * result - Optional, Matrix3 receiving copied values
 *
 * Returns:
 * result is specified, a new Matrix3 otherwise
 */
Matrix4.toMatrix3 = function(matrix, result) {
    if(!result) { result = Matrix3.create(); }
    
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[4];
    result[4] = matrix[5];
    result[5] = matrix[6];
    result[6] = matrix[8];
    result[7] = matrix[9];
    result[8] = matrix[10];
    
    return result;
};

/*
 * Matrix4.toInverseMatrix3
 * Calculates the inverse of the upper 3x3 elements of a Matrix4 and copies the result into a Matrix3
 * The resulting matrix is useful for calculating transformed normals
 *
 * Params:
 * matrix - Matrix4 containing values to invert and copy
 * result - Optional, Matrix3 receiving values
 *
 * Returns:
 * result is specified, a new Matrix3 otherwise
 */
Matrix4.toInverseMatrix3 = function(matrix, result) {
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = matrix[0], a01 = matrix[1], a02 = matrix[2];
    var a10 = matrix[4], a11 = matrix[5], a12 = matrix[6];
    var a20 = matrix[8], a21 = matrix[9], a22 = matrix[10];
    
    var b01 = a22*a11-a12*a21;
    var b11 = -a22*a10+a12*a20;
    var b21 = a21*a10-a11*a20;
        
    var d = a00*b01 + a01*b11 + a02*b21;
    if (!d) { return null; }
    var id = 1/d;
    
    if(!result) { result = Matrix3.create(); }
    
    result[0] = b01*id;
    result[1] = (-a22*a01 + a02*a21)*id;
    result[2] = (a12*a01 - a02*a11)*id;
    result[3] = b11*id;
    result[4] = (a22*a00 - a02*a20)*id;
    result[5] = (-a12*a00 + a02*a10)*id;
    result[6] = b21*id;
    result[7] = (-a21*a00 + a01*a20)*id;
    result[8] = (a11*a00 - a01*a10)*id;
    
    return result;
};

/*
 * Matrix4.multiply
 * Performs a matrix multiplication
 *
 * Params:
 * matrix - Matrix4, first operand
 * matrix2 - Matrix4, second operand
 * result - Optional, Matrix4 receiving operation result. If not specified result is written to matrix
 *
 * Returns:
 * result if specified, matrix otherwise
 */
Matrix4.multiply = function(matrix, matrix2, result) {
    if(!result) { result = matrix }
    
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = matrix[0], a01 = matrix[1], a02 = matrix[2], a03 = matrix[3];
    var a10 = matrix[4], a11 = matrix[5], a12 = matrix[6], a13 = matrix[7];
    var a20 = matrix[8], a21 = matrix[9], a22 = matrix[10], a23 = matrix[11];
    var a30 = matrix[12], a31 = matrix[13], a32 = matrix[14], a33 = matrix[15];
    
    var b00 = matrix2[0], b01 = matrix2[1], b02 = matrix2[2], b03 = matrix2[3];
    var b10 = matrix2[4], b11 = matrix2[5], b12 = matrix2[6], b13 = matrix2[7];
    var b20 = matrix2[8], b21 = matrix2[9], b22 = matrix2[10], b23 = matrix2[11];
    var b30 = matrix2[12], b31 = matrix2[13], b32 = matrix2[14], b33 = matrix2[15];
    
    result[0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
    result[1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
    result[2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
    result[3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
    result[4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
    result[5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
    result[6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
    result[7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
    result[8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
    result[9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
    result[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
    result[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
    result[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
    result[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
    result[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
    result[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;
    
    return result;
};

/*
 * Matrix4.multiplyVector3
 * Transforms a Vector3 with the given matrix
 * 4th vector component is implicitly '1'
 *
 * Params:
 * matrix - Matrix4 to transform the vector with
 * vector - Vector3 to transform
 * result - Optional, Vector3 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Matrix4.multiplyVector3 = function(matrix, vector, result) {
    if(!result) { result = vector }
    
    var x = vector[0], y = vector[1], z = vector[2];
    
    result[0] = matrix[0]*x + matrix[4]*y + matrix[8]*z + matrix[12];
    result[1] = matrix[1]*x + matrix[5]*y + matrix[9]*z + matrix[13];
    result[2] = matrix[2]*x + matrix[6]*y + matrix[10]*z + matrix[14];
    
    return result;
};

/*
 * Matrix4.multiplyVector4
 * Transforms a Vector4 with the given matrix
 *
 * Params:
 * matrix - Matrix4 to transform the vector with
 * vector - vector4 to transform
 * result - Optional, vector4 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Matrix4.multiplyVector4 = function(matrix, vector, result) {
    if(!result) { result = vector }
    
    var x = vector[0], y = vector[1], z = vector[2], w = vector[3];
    
    result[0] = matrix[0]*x + matrix[4]*y + matrix[8]*z + matrix[12]*w;
    result[1] = matrix[1]*x + matrix[5]*y + matrix[9]*z + matrix[13]*w;
    result[2] = matrix[2]*x + matrix[6]*y + matrix[10]*z + matrix[14]*w;
    result[3] = matrix[3]*x + matrix[7]*y + matrix[11]*z + matrix[15]*w;
    
    return result;
};

/*
 * Matrix4.translate
 * Translates a matrix by the given vector
 *
 * Params:
 * matrix - Matrix4 to translate
 * vector - Vector3 specifying the translation
 * result - Optional, Matrix4 receiving operation result. If not specified result is written to matrix
 *
 * Returns:
 * result if specified, matrix otherwise
 */
Matrix4.translate = function(matrix, vector, result) {
    var x = vector[0], y = vector[1], z = vector[2];
    
    if(!result || matrix == result) {
        matrix[12] = matrix[0]*x + matrix[4]*y + matrix[8]*z + matrix[12];
        matrix[13] = matrix[1]*x + matrix[5]*y + matrix[9]*z + matrix[13];
        matrix[14] = matrix[2]*x + matrix[6]*y + matrix[10]*z + matrix[14];
        matrix[15] = matrix[3]*x + matrix[7]*y + matrix[11]*z + matrix[15];
        return matrix;
    }
    
    var a00 = matrix[0], a01 = matrix[1], a02 = matrix[2], a03 = matrix[3];
    var a10 = matrix[4], a11 = matrix[5], a12 = matrix[6], a13 = matrix[7];
    var a20 = matrix[8], a21 = matrix[9], a22 = matrix[10], a23 = matrix[11];
    
    result[0] = a00;
    result[1] = a01;
    result[2] = a02;
    result[3] = a03;
    result[4] = a10;
    result[5] = a11;
    result[6] = a12;
    result[7] = a13;
    result[8] = a20;
    result[9] = a21;
    result[10] = a22;
    result[11] = a23;
    
    result[12] = a00*x + a10*y + a20*z + matrix[12];
    result[13] = a01*x + a11*y + a21*z + matrix[13];
    result[14] = a02*x + a12*y + a22*z + matrix[14];
    result[15] = a03*x + a13*y + a23*z + matrix[15];
    return result;
};

/*
 * Matrix4.scale
 * Scales a matrix by the given vector
 *
 * Params:
 * matrix - Matrix4 to scale
 * vector - Vector3 specifying the scale for each axis
 * result - Optional, Matrix4 receiving operation result. If not specified result is written to matrix
 *
 * Returns:
 * result if specified, matrix otherwise
 */
Matrix4.scale = function(matrix, vector, result) {
    var x = vector[0], y = vector[1], z = vector[2];
    
    if(!result || matrix == result) {
        matrix[0] *= x;
        matrix[1] *= x;
        matrix[2] *= x;
        matrix[3] *= x;
        matrix[4] *= y;
        matrix[5] *= y;
        matrix[6] *= y;
        matrix[7] *= y;
        matrix[8] *= z;
        matrix[9] *= z;
        matrix[10] *= z;
        matrix[11] *= z;
        return matrix;
    }
    
    result[0] = matrix[0]*x;
    result[1] = matrix[1]*x;
    result[2] = matrix[2]*x;
    result[3] = matrix[3]*x;
    result[4] = matrix[4]*y;
    result[5] = matrix[5]*y;
    result[6] = matrix[6]*y;
    result[7] = matrix[7]*y;
    result[8] = matrix[8]*z;
    result[9] = matrix[9]*z;
    result[10] = matrix[10]*z;
    result[11] = matrix[11]*z;
    result[12] = matrix[12];
    result[13] = matrix[13];
    result[14] = matrix[14];
    result[15] = matrix[15];
    return result;
};

/*
 * Matrix4.rotate
 * Rotates a matrix by the given angle around the specified axis
 * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
 *
 * Params:
 * matrix - Matrix4 to rotate
 * angle - angle (in radians) to rotate
 * axis - Vector3 representing the axis to rotate around
 * result - Optional, Matrix4 receiving operation result. If not specified result is written to matrix
 *
 * Returns:
 * result if specified, matrix otherwise
 */
Matrix4.rotate = function(matrix, angle, axis, result) {
    var x = axis[0], y = axis[1], z = axis[2];
    var len = Math.sqrt(x*x + y*y + z*z);
    if (!len) { return null; }
    if (len != 1) {
        len = 1 / len;
        x *= len; 
        y *= len; 
        z *= len;
    }
    
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    var t = 1-c;
    
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = matrix[0], a01 = matrix[1], a02 = matrix[2], a03 = matrix[3];
    var a10 = matrix[4], a11 = matrix[5], a12 = matrix[6], a13 = matrix[7];
    var a20 = matrix[8], a21 = matrix[9], a22 = matrix[10], a23 = matrix[11];
    
    // Construct the elements of the rotation matrix
    var b00 = x*x*t + c, b01 = y*x*t + z*s, b02 = z*x*t - y*s;
    var b10 = x*y*t - z*s, b11 = y*y*t + c, b12 = z*y*t + x*s;
    var b20 = x*z*t + y*s, b21 = y*z*t - x*s, b22 = z*z*t + c;
    
    if(!result) { 
        result = matrix
    } else if(matrix != result) { // If the source and resultination differ, copy the unchanged last row
        result[12] = matrix[12];
        result[13] = matrix[13];
        result[14] = matrix[14];
        result[15] = matrix[15];
    }
    
    // Perform rotation-specific matrix multiplication
    result[0] = a00*b00 + a10*b01 + a20*b02;
    result[1] = a01*b00 + a11*b01 + a21*b02;
    result[2] = a02*b00 + a12*b01 + a22*b02;
    result[3] = a03*b00 + a13*b01 + a23*b02;
    
    result[4] = a00*b10 + a10*b11 + a20*b12;
    result[5] = a01*b10 + a11*b11 + a21*b12;
    result[6] = a02*b10 + a12*b11 + a22*b12;
    result[7] = a03*b10 + a13*b11 + a23*b12;
    
    result[8] = a00*b20 + a10*b21 + a20*b22;
    result[9] = a01*b20 + a11*b21 + a21*b22;
    result[10] = a02*b20 + a12*b21 + a22*b22;
    result[11] = a03*b20 + a13*b21 + a23*b22;
    return result;
};

/*
 * Matrix4.rotateX
 * Rotates a matrix by the given angle around the X axis
 *
 * Params:
 * matrix - Matrix4 to rotate
 * angle - angle (in radians) to rotate
 * result - Optional, Matrix4 receiving operation result. If not specified result is written to matrix
 *
 * Returns:
 * result if specified, matrix otherwise
 */
Matrix4.rotateX = function(matrix, angle, result) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    
    // Cache the matrix values (makes for huge speed increases!)
    var a10 = matrix[4], a11 = matrix[5], a12 = matrix[6], a13 = matrix[7];
    var a20 = matrix[8], a21 = matrix[9], a22 = matrix[10], a23 = matrix[11];

    if(!result) { 
        result = matrix
    } else if(matrix != result) { // If the source and resultination differ, copy the unchanged rows
        result[0] = matrix[0];
        result[1] = matrix[1];
        result[2] = matrix[2];
        result[3] = matrix[3];
        
        result[12] = matrix[12];
        result[13] = matrix[13];
        result[14] = matrix[14];
        result[15] = matrix[15];
    }
    
    // Perform axis-specific matrix multiplication
    result[4] = a10*c + a20*s;
    result[5] = a11*c + a21*s;
    result[6] = a12*c + a22*s;
    result[7] = a13*c + a23*s;
    
    result[8] = a10*-s + a20*c;
    result[9] = a11*-s + a21*c;
    result[10] = a12*-s + a22*c;
    result[11] = a13*-s + a23*c;
    return result;
};

/*
 * Matrix4.rotateY
 * Rotates a matrix by the given angle around the Y axis
 *
 * Params:
 * matrix - Matrix4 to rotate
 * angle - angle (in radians) to rotate
 * result - Optional, Matrix4 receiving operation result. If not specified result is written to matrix
 *
 * Returns:
 * result if specified, matrix otherwise
 */
Matrix4.rotateY = function(matrix, angle, result) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = matrix[0], a01 = matrix[1], a02 = matrix[2], a03 = matrix[3];
    var a20 = matrix[8], a21 = matrix[9], a22 = matrix[10], a23 = matrix[11];
    
    if(!result) { 
        result = matrix
    } else if(matrix != result) { // If the source and resultination differ, copy the unchanged rows
        result[4] = matrix[4];
        result[5] = matrix[5];
        result[6] = matrix[6];
        result[7] = matrix[7];
        
        result[12] = matrix[12];
        result[13] = matrix[13];
        result[14] = matrix[14];
        result[15] = matrix[15];
    }
    
    // Perform axis-specific matrix multiplication
    result[0] = a00*c + a20*-s;
    result[1] = a01*c + a21*-s;
    result[2] = a02*c + a22*-s;
    result[3] = a03*c + a23*-s;
    
    result[8] = a00*s + a20*c;
    result[9] = a01*s + a21*c;
    result[10] = a02*s + a22*c;
    result[11] = a03*s + a23*c;
    return result;
};

/*
 * Matrix4.rotateZ
 * Rotates a matrix by the given angle around the Z axis
 *
 * Params:
 * matrix - Matrix4 to rotate
 * angle - angle (in radians) to rotate
 * result - Optional, Matrix4 receiving operation result. If not specified result is written to matrix
 *
 * Returns:
 * result if specified, matrix otherwise
 */
Matrix4.rotateZ = function(matrix, angle, result) {
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    
    // Cache the matrix values (makes for huge speed increases!)
    var a00 = matrix[0], a01 = matrix[1], a02 = matrix[2], a03 = matrix[3];
    var a10 = matrix[4], a11 = matrix[5], a12 = matrix[6], a13 = matrix[7];
    
    if(!result) { 
        result = matrix
    } else if(matrix != result) { // If the source and resultination differ, copy the unchanged last row
        result[8] = matrix[8];
        result[9] = matrix[9];
        result[10] = matrix[10];
        result[11] = matrix[11];
        
        result[12] = matrix[12];
        result[13] = matrix[13];
        result[14] = matrix[14];
        result[15] = matrix[15];
    }
    
    // Perform axis-specific matrix multiplication
    result[0] = a00*c + a10*s;
    result[1] = a01*c + a11*s;
    result[2] = a02*c + a12*s;
    result[3] = a03*c + a13*s;
    
    result[4] = a00*-s + a10*c;
    result[5] = a01*-s + a11*c;
    result[6] = a02*-s + a12*c;
    result[7] = a03*-s + a13*c;
    
    return result;
};

/*
 * Matrix4.frustum
 * Generates a frustum matrix with the given bounds
 *
 * Params:
 * left, right - scalar, left and right bounds of the frustum
 * bottom, top - scalar, bottom and top bounds of the frustum
 * near, far - scalar, near and far bounds of the frustum
 * result - Optional, Matrix4 frustum matrix will be written into
 *
 * Returns:
 * result if specified, a new Matrix4 otherwise
 */
Matrix4.frustum = function(left, right, bottom, top, near, far, result) {
    if(!result) { result = Matrix4.create(); }
    var rl = (right - left);
    var tb = (top - bottom);
    var fn = (far - near);
    result[0] = (near*2) / rl;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = (near*2) / tb;
    result[6] = 0;
    result[7] = 0;
    result[8] = (right + left) / rl;
    result[9] = (top + bottom) / tb;
    result[10] = -(far + near) / fn;
    result[11] = -1;
    result[12] = 0;
    result[13] = 0;
    result[14] = -(far*near*2) / fn;
    result[15] = 0;
    return result;
};

/*
 * Matrix4.perspective
 * Generates a perspective projection matrix with the given bounds
 *
 * Params:
 * fovy - scalar, vertical field of view
 * aspect - scalar, aspect ratio. typically viewport width/height
 * near, far - scalar, near and far bounds of the frustum
 * result - Optional, Matrix4 frustum matrix will be written into
 *
 * Returns:
 * result if specified, a new Matrix4 otherwise
 */
Matrix4.perspective = function(fovy, aspect, near, far, result) {
    var top = near*Math.tan(fovy*Math.PI / 360.0);
    var right = top*aspect;
    return Matrix4.frustum(-right, right, -top, top, near, far, result);
};

/*
 * Matrix4.ortho
 * Generates a orthogonal projection matrix with the given bounds
 *
 * Params:
 * left, right - scalar, left and right bounds of the frustum
 * bottom, top - scalar, bottom and top bounds of the frustum
 * near, far - scalar, near and far bounds of the frustum
 * result - Optional, Matrix4 frustum matrix will be written into
 *
 * Returns:
 * result if specified, a new Matrix4 otherwise
 */
Matrix4.ortho = function(left, right, bottom, top, near, far, result) {
    if(!result) { result = Matrix4.create(); }
    var rl = (right - left);
    var tb = (top - bottom);
    var fn = (far - near);
    result[0] = 2 / rl;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 0;
    result[5] = 2 / tb;
    result[6] = 0;
    result[7] = 0;
    result[8] = 0;
    result[9] = 0;
    result[10] = -2 / fn;
    result[11] = 0;
    result[12] = -(left + right) / rl;
    result[13] = -(top + bottom) / tb;
    result[14] = -(far + near) / fn;
    result[15] = 1;
    return result;
};

/*
 * Matrix4.ortho
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * Params:
 * eye - Vector3, position of the viewer
 * center - Vector3, point the viewer is looking at
 * up - Vector3 pointing "up"
 * result - Optional, Matrix4 frustum matrix will be written into
 *
 * Returns:
 * result if specified, a new Matrix4 otherwise
 */
Matrix4.lookAt = function(eye, center, up, result) {
    if(!result) { result = Matrix4.create(); }
    
    var eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (eyex == centerx && eyey == centery && eyez == centerz) {
        return Matrix4.identity(result);
    }
    
    var z0,z1,z2,x0,x1,x2,y0,y1,y2,len;
    
    //Vector3.direction(eye, center, z);
    z0 = eyex - center[0];
    z1 = eyey - center[1];
    z2 = eyez - center[2];
    
    // normalize (no check needed for 0 because of early return)
    len = 1/Math.sqrt(z0*z0 + z1*z1 + z2*z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    
    //Vector3.normalize(Vector3.cross(up, z, x));
    x0 = upy*z2 - upz*z1;
    x1 = upz*z0 - upx*z2;
    x2 = upx*z1 - upy*z0;
    len = Math.sqrt(x0*x0 + x1*x1 + x2*x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1/len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }
    
    //Vector3.normalize(Vector3.cross(z, x, y));
    y0 = z1*x2 - z2*x1;
    y1 = z2*x0 - z0*x2;
    y2 = z0*x1 - z1*x0;
    
    len = Math.sqrt(y0*y0 + y1*y1 + y2*y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1/len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }
    
    result[0] = x0;
    result[1] = y0;
    result[2] = z0;
    result[3] = 0;
    result[4] = x1;
    result[5] = y1;
    result[6] = z1;
    result[7] = 0;
    result[8] = x2;
    result[9] = y2;
    result[10] = z2;
    result[11] = 0;
    result[12] = -(x0*eyex + x1*eyey + x2*eyez);
    result[13] = -(y0*eyex + y1*eyey + y2*eyez);
    result[14] = -(z0*eyex + z1*eyey + z2*eyez);
    result[15] = 1;
    
    return result;
};

/*
 * Matrix4.str
 * Returns a string representation of a Matrix4
 *
 * Params:
 * matrix - Matrix4 to represent as a string
 *
 * Returns:
 * string representation of matrix
 */
Matrix4.str = function(matrix) {
    return '[' + matrix[0] + ', ' + matrix[1] + ', ' + matrix[2] + ', ' + matrix[3] +
        ', '+ matrix[4] + ', ' + matrix[5] + ', ' + matrix[6] + ', ' + matrix[7] +
        ', '+ matrix[8] + ', ' + matrix[9] + ', ' + matrix[10] + ', ' + matrix[11] +
        ', '+ matrix[12] + ', ' + matrix[13] + ', ' + matrix[14] + ', ' + matrix[15] + ']';
};

