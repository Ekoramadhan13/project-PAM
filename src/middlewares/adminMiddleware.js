module.exports = (req, res, next) => {

     console.log('REQ.USER =>', req.user);
     
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Akses khusus admin' });
  }
  next();
};
