var years = ['2014', '2015', '2016']

Plotly.d3.csv('focused_df.csv', (err, rows) => {
  var data = years.map(y => {
    var d = rows.filter(r => r.Year === y)
    
    return {
      type: 'bar',
      name: y,
      x: d.map(r => r.Injury),
      y: d.map(r => r.Country)
    }
  })
  
  Plotly.newPlot('graph', data)
})
Run Pen


Resources