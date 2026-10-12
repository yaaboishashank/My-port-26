import * as model from '../models/portfolio.model.js';

// Controllers choose the response; they do not know where the data is stored.
export function portfolioIndex(_req, res) {
  res.set('Cache-Control', 'no-cache').json({ success: true, data: model.getPortfolio() });
}

export function projectIndex(_req, res) {
  res.json({ success: true, data: model.getProjects() });
}

export function projectShow(req, res) {
  const { slug } = req.params;
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) {
    return res
      .status(400)
      .json({
        success: false,
        error: { code: 'INVALID_SLUG', message: 'Use a lowercase project slug.' },
      });
  }
  const project = model.findProject(slug);
  if (!project)
    return res
      .status(404)
      .json({
        success: false,
        error: { code: 'PROJECT_NOT_FOUND', message: 'Project not found.' },
      });
  return res.json({ success: true, data: project });
}
