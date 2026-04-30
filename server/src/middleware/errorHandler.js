const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Default error response
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  });
};

export default errorHandler;