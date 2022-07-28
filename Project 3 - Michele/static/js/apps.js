function init() {
  // Select the dropdown element
  var caseSelector = d3.select("#selectCaseDate");
  var yearSelector = d3.select('#selectYear');
  // Populate the dropdown with subject ID's from the list of sample Names
  d3.json("data/sharks.json").then((data) => {
    var subjectIds = data.caseDates;
    subjectIds.forEach((id) => {
      caseSelector
        .append("option")
        .text(id)
        .property("value", id);
    });
    var subjectYears = data.years;
    subjectYears.forEach((Year) => {
      yearSelector
        .append("option")
        .text(Year)
        .property("value", Year);
    });

    // Use the first subject ID from the names to build initial plots
    const firstSubject = subjectIds[0];
    updateCharts(firstSubject);
    updateMetadata(firstSubject);
  });
}


function updateMetadata(sample) {
  d3.json("data/sharks.json").then((data) => {
    var metadata = data.metadata;
    var filterArray = metadata.filter(sampleObject => sampleObject.id == sample);
    var result = filterArray[0];
    var metaPanel = d3.select("#sample-metadata");
    metaPanel.html("");
    Object.entries(result).forEach(([key, value]) => {
      metaPanel.append("h6").text(`${key.toUpperCase()}: ${value}`)
    })

  });
}


function updateCharts(sample) {
  d3.json("data/sharks.json").then((data) => {
    var samples = data.samples;
    var filterArray = samples.filter(sampleObject => sampleObject.id == sample);
    var result = filterArray[0];
    var sample_values = result.sample_values;
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    

    
   // Plotly.newPlot(data, layout);
    // Bar Chart
    var trace1 = {
      x: Year.slice(0, 10).reverse(),
      y: Date.slice(0, 10).map(otuID => `id ${otuID}`).reverse(),
      text: Date.slice(0, 10).reverse(),
      name: "Greek",
      type: "bar",
      orientation: "h"
    };
    var data = [trace1];
    var layout = {
      title: "Types of Activitities Resulted in White Shark Attacks" + sample,
      margin: { l: 100, r: 100, t: 100, b: 100 }
    };
    Plotly.newPlot("bar", data, layout);
  });
}


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  updateCharts(newSample);
  updateMetadata(newSample);
}

// Initialize the dashboard
init();

