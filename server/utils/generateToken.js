import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

    console.log("generate token....", userId)
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
console.log("gnerate token 2", token)
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // Return the generated token
  return token;
};

export default generateToken;