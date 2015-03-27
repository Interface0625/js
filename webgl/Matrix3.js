
/*
 * Matrix3 - 3x3 Matrix
 */
var Matrix3 = {};

/*
 * Matrix3.create
 * Creates a new instance of a Matrix3 using the default array type
 * Any javascript array containing at least 9 numeric elements can serve as a Matrix3
 *
 * Params:
 * mat - Optional, Matrix3 containing values to initialize with
 *
 * Returns:
 * New Matrix3
 */
Matrix3.create = function(matrix) {
    var result = new Float32Array(9);
    
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
    }
    
    return result;
};

/*
 * Matrix3.set
 * Copies the values of one Matrix3 to another
 *
 * Params:
 * matrix - Matrix3 containing values to copy
 * result - Matrix3 receiving copied values
 *
 * Returns:
 * result
 */
Matrix3.set = function(matrix, result) {
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = matrix[3];
    result[4] = matrix[4];
    result[5] = matrix[5];
    result[6] = matrix[6];
    result[7] = matrix[7];
    result[8] = matrix[8];
    return result;
};

/*
 * Matrix3.identity
 * Sets a Matrix3 to an identity matrix
 *
 * Params:
 * result - Matrix3 to set
 *
 * Returns:
 * result
 */
Matrix3.identity = function(result) {
    result[0] = 1;
    result[1] = 0;
    result[2] = 0;
    result[3] = 0;
    result[4] = 1;
    result[5] = 0;
    result[6] = 0;
    result[7] = 0;
    result[8] = 1;
    return result;
};

/*
 * Matrix4.transpose
 * Transposes a Matrix3 (flips the values over the diagonal)
 *
 * Params:
 * matrix - Matrix3 to transpose
 * result - Optional, Matrix3 receiving transposed values. If not specified result is written to matrix
 *
 * Returns:
 * result is specified, matrix otherwise
 */
Matrix3.transpose = function(matrix, result) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if(!result || matrix == result) {
        var a01 = matrix[1], a02 = matrix[2];
        var a12 = matrix[5];
        
        matrix[1] = matrix[3];
        matrix[2] = matrix[6];
        matrix[3] = a01;
        matrix[5] = matrix[7];
        matrix[6] = a02;
        matrix[7] = a12;
        return matrix;
    }
    
    result[0] = matrix[0];
    result[1] = matrix[3];
    result[2] = matrix[6];
    result[3] = matrix[1];
    result[4] = matrix[4];
    result[5] = matrix[7];
    result[6] = matrix[2];
    result[7] = matrix[5];
    result[8] = matrix[8];
    return result;
};

/*
 * Matrix3.toMatrix4
 * Copies the elements of a Matrix3 into the upper 3x3 elements of a Matrix4
 *
 * Params:
 * matrix - Matrix3 containing values to copy
 * result - Optional, Matrix4 receiving copied values
 *
 * Returns:
 * result if specified, a new Matrix4 otherwise
 */
Matrix3.toMatrix4 = function(matrix, result) {
    if(!result) { result = Matrix4.create(); }
    
    result[0] = matrix[0];
    result[1] = matrix[1];
    result[2] = matrix[2];
    result[3] = 0;

    result[4] = matrix[3];
    result[5] = matrix[4];
    result[6] = matrix[5];
    result[7] = 0;

    result[8] = matrix[6];
    result[9] = matrix[7];
    result[10] = matrix[8];
    result[11] = 0;

    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
    
    return result;
};

/*
 * Matrix3.str
 * Returns a string representation of a Matrix3
 *
 * Params:
 * matrix - Matrix3 to represent as a string
 *
 * Returns:
 * string representation of matrix
 */
Matrix3.str = function(matrix) {
    return '[' + matrix[0] + ', ' + matrix[1] + ', ' + matrix[2] +
        ', ' + matrix[3] + ', '+ matrix[4] + ', ' + matrix[5] +
        ', ' + matrix[6] + ', ' + matrix[7] + ', '+ matrix[8] + ']';
};
