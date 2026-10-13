import { AppError } from '../utils/appError.js';

// TODO: Implement 'protect' middleware
export const protect = (req, res, next) => {
    let token;

// 1. Extract 'authorization' header from req.headers
// 2. Check if header exists and starts with 'Bearer '
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // 3. Extract token string
    token = req.headers.authorization.split(' ')[1];
}

// 4. Validate token:
if(token=='sustain-user-token') {
    req.user = { id: 101, name: 'Elena', role: 'user' };
} else if(token === 'sustain-admin-token') {
    req.user = { id: 999, name: 'Prof. Gabriel', role: 'admin' };
} else {
    return next(new AppError('Unauthorized: Invalid or missing token', 401));
}

next();
};
//    - If token === 'sustain-user-token', attach req.user = { id: 101, name: 'Elena', role: 'user' }
//    - If token === 'sustain-admin-token', attach req.user = { id: 999, name: 'Prof. Gabriel', role: 'admin' }
//    - Otherwise, pass next(new AppError('Unauthorized: Invalid or missing token', 401))

// TODO: Implement 'requireAdmin' middleware
// 1. Verify if req.user exists and req.user.role === 'admin'
// 2. If true, call next()
// 3. Otherwise, pass next(new AppError('Forbidden: Admin privilege required for this action', 403))
export const requireAdmin = (req, res, next) => {
    if(req.user && req.user.role == 'admin') {
        next();
    } else {
        return next(new AppError('Forbidden: Admin privilege required for this action', 403))
    }
};
