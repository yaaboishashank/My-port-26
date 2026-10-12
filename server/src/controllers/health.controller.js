export function health(_req, res) {
  res.json({ success: true, data: { app: 'Shashank Portfolio API', status: 'ok' } });
}
