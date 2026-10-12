export function notFound(req, res) {
  res
    .status(404)
    .json({
      success: false,
      error: { code: 'NOT_FOUND', message: `No route for ${req.method} ${req.path}.` },
    });
}

export function errorHandler(error, _req, res, _next) {
  const status =
    Number.isInteger(error.status) && error.status >= 400 && error.status <= 599
      ? error.status
      : 500;
  if (status >= 500) console.error(error.message);
  res.status(status).json({
    success: false,
    error: {
      code: status === 400 ? 'BAD_REQUEST' : 'INTERNAL_ERROR',
      message:
        status >= 500
          ? 'An unexpected server error occurred.'
          : 'The request could not be processed.',
    },
  });
}
