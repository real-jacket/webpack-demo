module.exports = function mock(app) {
  app.get('/some/mock', (req, res) => {
    res.json({
      data: ''
    });
  });
};