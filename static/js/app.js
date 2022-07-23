function show_country_selector(ndx) 
  var dim = ndx.dimension(dc.pluck('Year'));
  var group = dim.group();

  dc.selectMenu("#country-selector")
      .dimension(dim)
      .group(group);