
/*
 * Quaternion - Quaternions 
 */
var Quaternion = {};

/*
 * Quaternion.create
 * Creates a new instance of a Quaternion using the default array type
 * Any javascript array containing at least 4 numeric elements can serve as a Quaternion
 *
 * Params:
 * quaternion - Optional, Quaternion containing values to initialize with
 *
 * Returns:
 * New Quaternion
 */
Quaternion.create = function(quaternion) {
    var result = new Float32Array(4);
    
    if(quaternion) {
        result[0] = quaternion[0];
        result[1] = quaternion[1];
        result[2] = quaternion[2];
        result[3] = quaternion[3];
    }
    
    return result;
};

/*
 * Quaternion.set
 * Copies the values of one Quaternion to another
 *
 * Params:
 * quaternion - Quaternion containing values to copy
 * result - Quaternion receiving copied values
 *
 * Returns:
 * result
 */
Quaternion.set = function(quaternion, result) {
    result[0] = quaternion[0];
    result[1] = quaternion[1];
    result[2] = quaternion[2];
    result[3] = quaternion[3];
    
    return result;
};

/*
 * Quaternion.calculateW
 * Calculates the W component of a Quaternion from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length. 
 * Any existing W component will be ignored. 
 *
 * Params:
 * quaternion - Quaternion to calculate W component of
 * result - Optional, Quaternion receiving calculated values. If not specified result is written to quaternion
 *
 * Returns:
 * result if specified, quaternion otherwise
 */
Quaternion.calculateW = function(quaternion, result) {
    var x = quaternion[0], y = quaternion[1], z = quaternion[2];

    if(!result || quaternion == result) {
        quaternion[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
        return quaternion;
    }
    result[0] = x;
    result[1] = y;
    result[2] = z;
    result[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
    return result;
};

/*
 * Quaternion.inverse
 * Calculates the inverse of a Quaternion
 *
 * Params:
 * quat - Quaternion to calculate inverse of
 * result - Optional, Quaternion receiving inverse values. If not specified result is written to quat
 *
 * Returns:
 * result if specified, quaternion otherwise
 */
Quaternion.inverse = function(quaternion, result) {
    if(!result || quaternion == result) {
        quaternion[0] *= -1;
        quaternion[1] *= -1;
        quaternion[2] *= -1;
        return quaternion;
    }
    result[0] = -quaternion[0];
    result[1] = -quaternion[1];
    result[2] = -quaternion[2];
    result[3] = quaternion[3];
    return result;
};

/*
 * Quaternion.length
 * Calculates the length of a Quaternion
 *
 * Params:
 * quaternion - Quaternion to calculate length of
 *
 * Returns:
 * Length of quaternion
 */
Quaternion.length = function(quaternion) {
    var x = quaternion[0], y = quaternion[1], z = quaternion[2], w = quaternion[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/*
 * Quaternion.normalize
 * Generates a unit quaternion of the same direction as the provided Quaternion
 * If quaternion length is 0, returns [0, 0, 0, 0]
 *
 * Params:
 * quaternion - Quaternion to normalize
 * result - Optional, Quaternion receiving operation result. If not specified result is written to quaternion
 *
 * Returns:
 * result if specified, quaternion otherwise
 */
Quaternion.normalize = function(quaternion, result) {
    if(!result) { result = quaternion; }
    
    var x = quaternion[0], y = quaternion[1], z = quaternion[2], w = quaternion[3];
    var len = Math.sqrt(x*x + y*y + z*z + w*w);
    if(len == 0) {
        result[0] = 0;
        result[1] = 0;
        result[2] = 0;
        result[3] = 0;
        return result;
    }
    len = 1/len;
    result[0] = x * len;
    result[1] = y * len;
    result[2] = z * len;
    result[3] = w * len;
    
    return result;
};

/*
 * Quaternion.multiply
 * Performs a quaternion multiplication
 *
 * Params:
 * quaternion - Quaternion, first operand
 * quaternion2 - Quaternion, second operand
 * result - Optional, Quaternion receiving operation result. If not specified result is written to quaternion
 *
 * Returns:
 * result if specified, quaternion otherwise
 */
Quaternion.multiply = function(quaternion, quaternion2, result) {
    if(!result) { result = quaternion; }
    
    var qax = quaternion[0], qay = quaternion[1], qaz = quaternion[2], qaw = quaternion[3];
    var qbx = quaternion2[0], qby = quaternion2[1], qbz = quaternion2[2], qbw = quaternion2[3];
    
    result[0] = qax*qbw + qaw*qbx + qay*qbz - qaz*qby;
    result[1] = qay*qbw + qaw*qby + qaz*qbx - qax*qbz;
    result[2] = qaz*qbw + qaw*qbz + qax*qby - qay*qbx;
    result[3] = qaw*qbw - qax*qbx - qay*qby - qaz*qbz;
    
    return result;
};

/*
 * Quaternion.multiplyVector3
 * Transforms a Vector3 with the given quaternion
 *
 * Params:
 * quaternion - Quaternion to transform the vector with
 * vector - Vector3 to transform
 * result - Optional, Vector3 receiving operation result. If not specified result is written to vector
 *
 * Returns:
 * result if specified, vector otherwise
 */
Quaternion.multiplyVector3 = function(quaternion, vector, result) {
    if(!result) { result = vector; }
    
    var x = vector[0], y = vector[1], z = vector[2];
    var qx = quaternion[0], qy = quaternion[1], qz = quaternion[2], qw = quaternion[3];

    // calculate quaternion * vector
    var ix = qw*x + qy*z - qz*y;
    var iy = qw*y + qz*x - qx*z;
    var iz = qw*z + qx*y - qy*x;
    var iw = -qx*x - qy*y - qz*z;
    
    // calculate result * inverse quaternion
    result[0] = ix*qw + iw*-qx + iy*-qz - iz*-qy;
    result[1] = iy*qw + iw*-qy + iz*-qx - ix*-qz;
    result[2] = iz*qw + iw*-qz + ix*-qy - iy*-qx;
    
    return result;
};

/*
 * Quaternion.toMatrix3
 * Calculates a 3x3 matrix from the given Quaternion
 *
 * Params:
 * quaternion - Quaternion to create matrix from
 * result - Optional, Matrix3 receiving operation result
 *
 * Returns:
 * result if specified, a new Matrix3 otherwise
 */
Quaternion.toMatrix3 = function(quaternion, result) {
    if(!result) { result = Matrix3.create(); }
    
    var x = quaternion[0], y = quaternion[1], z = quaternion[2], w = quaternion[3];

    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;

    var xx = x*x2;
    var xy = x*y2;
    var xz = x*z2;

    var yy = y*y2;
    var yz = y*z2;
    var zz = z*z2;

    var wx = w*x2;
    var wy = w*y2;
    var wz = w*z2;

    result[0] = 1 - (yy + zz);
    result[1] = xy - wz;
    result[2] = xz + wy;

    result[3] = xy + wz;
    result[4] = 1 - (xx + zz);
    result[5] = yz - wx;

    result[6] = xz - wy;
    result[7] = yz + wx;
    result[8] = 1 - (xx + yy);
    
    return result;
};

/*
 * Quaternion.toMatrix4
 * Calculates a 4x4 matrix from the given Quaternion
 *
 * Params:
 * quaternion - Quaternion to create matrix from
 * result - Optional, Matrix4 receiving operation result
 *
 * Returns:
 * result if specified, a new Matrix4 otherwise
 */
Quaternion.toMatrix4 = function(quaternion, result) {
    if(!result) { result = Matrix4.create(); }
    
    var x = quaternion[0], y = quaternion[1], z = quaternion[2], w = quaternion[3];

    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;

    var xx = x*x2;
    var xy = x*y2;
    var xz = x*z2;

    var yy = y*y2;
    var yz = y*z2;
    var zz = z*z2;

    var wx = w*x2;
    var wy = w*y2;
    var wz = w*z2;

    result[0] = 1 - (yy + zz);
    result[1] = xy - wz;
    result[2] = xz + wy;
    result[3] = 0;

    result[4] = xy + wz;
    result[5] = 1 - (xx + zz);
    result[6] = yz - wx;
    result[7] = 0;

    result[8] = xz - wy;
    result[9] = yz + wx;
    result[10] = 1 - (xx + yy);
    result[11] = 0;

    result[12] = 0;
    result[13] = 0;
    result[14] = 0;
    result[15] = 1;
    
    return result;
};

/*
 * Quaternion.slerp
 * Performs a spherical linear interpolation between two Quaternion
 *
 * Params:
 * quaternion - Quaternion, first quaternion
 * quaternion2 - Quaternion, second quaternion
 * slerp - interpolation amount between the two inputs
 * result - Optional, Quaternion receiving operation result. If not specified result is written to quaternion
 *
 * Returns:
 * result if specified, quaternion otherwise
 */
Quaternion.slerp = function(quaternion, quaternion2, slerp, result) {
    if(!result) { result = quaternion; }
    
    var cosHalfTheta =  quaternion[0]*quaternion2[0] +
                        quaternion[1]*quaternion2[1] +
                        quaternion[2]*quaternion2[2] +
                        quaternion[3]*quaternion2[3];
    
    if (Math.abs(cosHalfTheta) >= 1.0){
        if(result != quaternion) {
            result[0] = quaternion[0];
            result[1] = quaternion[1];
            result[2] = quaternion[2];
            result[3] = quaternion[3];
        }
        return result;
    }
    
    var halfTheta = Math.acos(cosHalfTheta);
    var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta*cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 0.001){
        result[0] = (quaternion[0]*0.5 + quaternion2[0]*0.5);
        result[1] = (quaternion[1]*0.5 + quaternion2[1]*0.5);
        result[2] = (quaternion[2]*0.5 + quaternion2[2]*0.5);
        result[3] = (quaternion[3]*0.5 + quaternion2[3]*0.5);
        return result;
    }
    
    var ratioA = Math.sin((1 - slerp)*halfTheta) / sinHalfTheta;
    var ratioB = Math.sin(slerp*halfTheta) / sinHalfTheta; 
    
    result[0] = (quaternion[0]*ratioA + quaternion2[0]*ratioB);
    result[1] = (quaternion[1]*ratioA + quaternion2[1]*ratioB);
    result[2] = (quaternion[2]*ratioA + quaternion2[2]*ratioB);
    result[3] = (quaternion[3]*ratioA + quaternion2[3]*ratioB);
    
    return result;
};

/*
 * Quaternion.str
 * Returns a string representation of a quaternion
 *
 * Params:
 * quaternion - Quaternion to represent as a string
 *
 * Returns:
 * string representation of quaternion
 */
Quaternion.str = function(quaternion) {
    return '[' + quaternion[0] + ', ' + quaternion[1] + ', ' + quaternion[2] + ', ' + quaternion[3] + ']';
};

