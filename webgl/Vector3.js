/*
 * Vector3 - 3 Dimensional Vector
 */
var Vector3 = {};

/*
 * Vector3.create
 * Creates a new instance of a Vector3 using the default array type
 * Any javascript array containing at least 3 numeric elements can serve as a Vector3
 *
 * Params:
 * vector - Optional, Vector3 containing values to initialize with
 *
 * Returns:
 * New Vector3
 */
Vector3.create = function(vector) {
    var result = new Float32Array(3);
    
    if(vector) {
        result[0] = vector[0];
        result[1] = vector[1];
        result[2] = vector[2];
    }
    
    return result;
};

/*
 * Vector3.set
 * Copies the values of one Vector3 to another
 *
 * Params:
 * vector - Vector3 containing values to copy
 * result - Vector3 receiving copied values
 *
 * Returns:
 * result
 */
Vector3.set = function(vector, result) {
    result[0] = vector[0];
    result[1] = vector[1];
    result[2] = vector[2];
    
    return result;
};

/*
 * Vector3.add
 * Performs a vector addition
 *
 * Params:
 * vec - Vector3, first operand
 * vec2 - Vector3, second operand
 * result - Optional, Vector3 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Vector3.add = function(vector, vector2, result) {
    if(!result || vector == result) {
        vector[0] += vector2[0];
        vector[1] += vector2[1];
        vector[2] += vector2[2];
        return vector;
    }
    
    result[0] = vector[0] + vector2[0];
    result[1] = vector[1] + vector2[1];
    result[2] = vector[2] + vector2[2];
    return result;
};

/*
 * Vector3.subtract
 * Performs a vector subtraction
 *
 * Params:
 * vec - Vector3, first operand
 * vec2 - Vector3, second operand
 * result - Optional, Vector3 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Vector3.subtract = function(vector, vector2, result) {
    if(!result || vector == result) {
        vector[0] -= vector2[0];
        vector[1] -= vector2[1];
        vector[2] -= vector2[2];
        return vector;
    }
    
    result[0] = vector[0] - vector2[0];
    result[1] = vector[1] - vector2[1];
    result[2] = vector[2] - vector2[2];
    return result;
};

/*
 * Vector3.negate
 * Negates the components of a Vector3
 *
 * Params:
 * vector - Vector3 to negate
 * result - Optional, Vector3 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Vector3.negate = function(vector, result) {
    if(!result) { result = vector; }
    
    result[0] = -vector[0];
    result[1] = -vector[1];
    result[2] = -vector[2];
    return result;
};

/*
 * Vector3.scale
 * Multiplies the components of a Vector3 by a scalar value
 *
 * Params:
 * vector - Vector3 to scale
 * val - Numeric value to scale by
 * result - Optional, Vector3 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Vector3.scale = function(vector, value, result) {
    if(!result || vector == result) {
        vector[0] *= value;
        vector[1] *= value;
        vector[2] *= value;
        return vector;
    }
    
    result[0] = vector[0]*value;
    result[1] = vector[1]*value;
    result[2] = vector[2]*value;
    return result;
};

/*
 * Vector3.normalize
 * Generates a unit vector of the same direction as the provided Vector3
 * If vector length is 0, returns [0, 0, 0]
 *
 * Params:
 * vector - Vector3 to normalize
 * result - Optional, Vector3 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Vector3.normalize = function(vector, result) {
    if(!result) { result = vector; }
    
    var x = vector[0], y = vector[1], z = vector[2];
    var len = Math.sqrt(x*x + y*y + z*z);
    
    if (!len) {
        result[0] = 0;
        result[1] = 0;
        result[2] = 0;
        return result;
    } else if (len == 1) {
        result[0] = x;
        result[1] = y;
        result[2] = z;
        return result;
    }
    
    len = 1 / len;
    result[0] = x*len;
    result[1] = y*len;
    result[2] = z*len;
    return result;
};

/*
 * Vector3.cross
 * Generates the cross product of two Vector3s
 *
 * Params:
 * vector - Vector3, first operand
 * vector2 - Vector3, second operand
 * result - Optional, Vector3 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Vector3.cross = function(vector, vector2, result){
    if(!result) { result = vector; }
    
    var x = vector[0], y = vector[1], z = vector[2];
    var x2 = vector2[0], y2 = vector2[1], z2 = vector2[2];
    
    result[0] = y*z2 - z*y2;
    result[1] = z*x2 - x*z2;
    result[2] = x*y2 - y*x2;
    return result;
};

/*
 * Vector3.length
 * Calculates the length of a Vector3
 *
 * Params:
 * vector - Vector3 to calculate length of
 *
 * Returns:
 * Length of vector
 */
Vector3.length = function(vector){
    var x = vector[0], y = vector[1], z = vector[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/*
 * Vector3.dot
 * Calculates the dot product of two vector3s
 *
 * Params:
 * vector - Vector3, first operand
 * vector2 - Vector3, second operand
 *
 * Returns:
 * Dot product of vector and vector2
 */
Vector3.dot = function(vector, vector2){
    return vector[0]*vector2[0] + vector[1]*vector2[1] + vector[2]*vector2[2];
};

/*
 * Vector3.direction
 * Generates a unit vector pointing from one vector to another
 *
 * Params:
 * vector - origin Vector3
 * vector2 - Vector3 to point to
 * result - Optional, Vector3 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Vector3.direction = function(vector, vector2, result) {
    if(!result) { result = vector; }
    
    var x = vector[0] - vector2[0];
    var y = vector[1] - vector2[1];
    var z = vector[2] - vector2[2];
    
    var len = Math.sqrt(x*x + y*y + z*z);
    if (!len) { 
        result[0] = 0; 
        result[1] = 0; 
        result[2] = 0;
        return result; 
    }
    
    len = 1 / len;
    result[0] = x * len; 
    result[1] = y * len; 
    result[2] = z * len;
    return result; 
};

/*
 * Vector3.lerp
 * Performs a linear interpolation between two Vector3
 *
 * Params:
 * vector - Vector3, first vector
 * vector2 - Vector3, second vector
 * lerp - interpolation amount between the two inputs
 * result - Optional, Vector3 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Vector3.lerp = function(vector, vector2, lerp, result){
    if(!result) { result = vector; }
    
    result[0] = vector[0] + lerp * (vector2[0] - vector[0]);
    result[1] = vector[1] + lerp * (vector2[1] - vector[1]);
    result[2] = vector[2] + lerp * (vector2[2] - vector[2]);
    
    return result;
};

/*
 * Vector3.str
 * Returns a string representation of a vector
 *
 * Params:
 * vector - Vector3 to represent as a string
 *
 * Returns:
 * string representation of vector
 */
Vector3.str = function(vector) {
    return '[' + vector[0] + ', ' + vector[1] + ', ' + vector[2] + ']';
};
