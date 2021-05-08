/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 10,
  maxZoom: 18,
  ext: 'png'
}).addTo(map);


var PhiladelphiaBounds = "https://raw.githubusercontent.com/kylepmccarthy/675Final/6db840912b63a5cbd5a97d1fc553ec31cfa84e84/Data/City_Limits.geojson"
var Neighborhood = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/Neighborhoods2.geojson"
var Grid = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/gridFinal2.geojson"

var electric = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/electricRPRE2.geojson"
var electric1 = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/electricRPOST2.geojson"
var alteration = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/alterationRPRE.geojson"
var plum = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/PlumPre.geojson"
var newconst = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/NC3.geojson"
var addition = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/AddR4.geojson"
var demolition = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/DemoR5.geojson"
var alteration1 = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/alterationRPOST2.geojson"
var plum2 = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/PlumPost2.geojson "
var Mechanical = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/Mechanical.geojson"

var results = "https://raw.githubusercontent.com/palakagr/tree-canopy-loss/main/WebAppData/ScenA1.geojson"

var featureGroups; 
var featureEL;
var featureALT; 
var featureNC; 
var featureADD; 
var featureDEMO; 
var featureP; 
var featureM; 
var histogramChart; 
var bound; 

var histogramBins = [0, 0, 0, 0, 0] 


var ElectricStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'ELECTRICAL PERMIT' : return {color: '#B9D9EB'};
  }
};

var MechanicalcStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'MECHANICAL PERMIT' : return {color: '#D982B5'};
  }
};

var PlumStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'PLUMBING PERMIT' : return {color: '#90EE90'};
  }
};

var DeomoStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'DEMOLITION PERMIT' : return {color: '#9C51B6'};
  }
};

var AltStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'ALTERATION PERMIT' : return {color: '#FCE883'};
  }
};

var AddStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'ADDITION PERMIT' : return {color: '#A48D28'};
  }
};


var newStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'NEW CONSTRUCTION PERMIT' : return {color: '#48845C'};
  }
};

var ResultStyle = function(feature) {
  if(feature.properties.Risk_Cat == "Very Low"){
    return { fillColor: '#f7f7f7', weight: .3, opacity: 1, color: 'red'};
  }
  if(feature.properties.Risk_Cat == "Low"){ 
    return { fillColor: '#cccccc', weight: .3, opacity: 1, color: 'red'};
  }
  if(feature.properties.Risk_Cat == "Moderate"){ 
    return { fillColor: '#969696', weight: .3, opacity: 1, color: 'red'};
  }
  if(feature.properties.Risk_Cat == "High"){ 
    return { fillColor: '#636363', weight: .3, opacity: 1, color: 'red'};
  }
  if(feature.properties.Risk_Cat == "Severe"){
    return { fillColor: '#252525', weight: .3, opacity: 1, color: 'red'};
    }
};

var CoverageStyle = function(feature) {
  if(feature.properties.AreaCoverage08 < 2080000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 2080000 & feature.properties.AreaCoverage08 < 4766600){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 4766600& feature.properties.AreaCoverage08 < 8960000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 8960000 & feature.properties.AreaCoverage08 < 14183000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 14183000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var CoverageStyle08F = function(feature) {
  if(feature.properties.AreaCoverage08 < 141000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 141000 & feature.properties.AreaCoverage08 < 318000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 318000 & feature.properties.AreaCoverage08 < 553000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 553000 & feature.properties.AreaCoverage08 < 935800){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 553000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};


var CoverageStyle18 = function(feature) {
  if(feature.properties.AreaCoverage08 < 2080000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 2080000 & feature.properties.AreaCoverage08 < 4766600){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 4766600& feature.properties.AreaCoverage08 < 8960000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 8960000 & feature.properties.AreaCoverage08 < 14183000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 14183000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var CoverageStyle18F = function(feature) {
  if(feature.properties.AreaCoverage18 < 141000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 141000 & feature.properties.AreaCoverage18 < 318000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 318000 & feature.properties.AreaCoverage18 < 553000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 553000 & feature.properties.AreaCoverage18 < 935800){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 553000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctCoverageStyle = function(feature) {
  if(feature.properties.pctCoverage08 < 7){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 7 & feature.properties.pctCoverage08 < 13){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 13 & feature.properties.pctCoverage08 < 21){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 21 & feature.properties.pctCoverage08 < 30){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 30){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};



var pctCoverageStyle18 = function(feature) {
  if(feature.properties.pctCoverage08 < 7){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 7 & feature.properties.pctCoverage08 < 13){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 13 & feature.properties.pctCoverage08 < 21){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 21 & feature.properties.pctCoverage08 < 30){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 30){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var AreaLossN = function(feature) {
  if(feature.properties.AreaLoss < 500000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 500000 & feature.properties.AreaLoss < 1126500){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss> 1126500 & feature.properties.AreaLoss < 2100000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 2100000 & feature.properties.AreaLoss < 3500000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 3500000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'}; 
    }
};

var AreaLossF = function(feature) {
  if(feature.properties.AreaLoss < 43200){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 43200 & feature.properties.AreaLoss < 98000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss> 98000 & feature.properties.AreaLoss < 164900){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 164900 & feature.properties.AreaLoss < 362900){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 362900){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'}; 
    }
};

var AreaGainN = function(feature) {
  if(feature.properties.AreaGain < 250000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain > 250000 & feature.properties.AreaGain < 560000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain> 560000 & feature.properties.AreaGain < 1030000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain > 1030000 & feature.properties.AreaGain < 1635000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain > 1635000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var AreaGainF = function(feature) {
  if(feature.properties.AreaGain < 24300){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain > 24300 & feature.properties.AreaGain < 52850){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain> 52850 & feature.properties.AreaGain < 89000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain > 89000 & feature.properties.AreaGain < 145800){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain > 145800){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var NetChangeN = function(feature) {
  if(feature.properties.GainMinusLoss < -2007700){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss > -2007700 & feature.properties.GainMinusLoss < -886000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss> -886000 & feature.properties.GainMinusLoss< -283500){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss > -283500 & feature.properties.GainMinusLoss< 0){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss > 0){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var NetChangeF = function(feature) {
  if(feature.properties.netChange < -63400){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.netChange > -63400 & feature.properties.netChange< -31670){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.netChange> -31670 & feature.properties.netChange< -7280){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.netChange > -7280 & feature.properties.netChange< 0){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.netChange > 0){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctLossN = function(feature) {
  if(feature.properties.pctLoss < 13){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 13 & feature.properties.pctLoss < 20){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss> 20 & feature.properties.pctLoss < 25){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 25 & feature.properties.pctLoss < 32){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 32){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctLossF = function(feature) {
  if(feature.properties.pctLoss < 13){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 13 & feature.properties.pctLoss < 20){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss> 20 & feature.properties.pctLoss <= 25){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 25 & feature.properties.pctLoss < 37){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 37){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctGainN = function(feature) {
  if(feature.properties.pctGain < 10){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain > 10 & feature.properties.pctGain < 16){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain> 16 & feature.properties.pctGain < 22){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain > 22 & feature.properties.pctGain < 30){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain > 30){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctGainF = function(feature) {
  if(feature.properties.pctGain < 10){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain > 10 & feature.properties.pctGain <= 16){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain> 16 & feature.properties.pctGain < 22){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain > 22 & feature.properties.pctGain < 30){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain > 30){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctChangeN = function(feature) {
  if(feature.properties.pctChange < -24){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > -24 & feature.properties.pctChange < -11){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange> -11 & feature.properties.pctChange < 0){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > 0 & feature.properties.pctChange < 8){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > 8){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctChangeF = function(feature) {
  if(feature.properties.pctChange < -17){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > -17 & feature.properties.pctChange < -10){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange> -11 & feature.properties.pctChange < -4){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > -4 & feature.properties.pctChange < 0){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > 0){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

let FilterMain = function(feature) {
  if (feature.properties.pctCoverage08 == 0 | feature.properties.pctLoss == 0 | feature.properties.pctGain == 0) {
    return false;
  } else {
    return true; 
  }
};

let FilterResults2 = function(feature) {
  if (feature.properties.Scenario == 'const_25less') {
    return true;
  } else {
    return false; 
  }
};

let FilterResults1 = function(feature) {
  if (feature.properties.Scenario == 'const_50less') {
    return true;
  } else {
    return false; 
  }
};

let FilterResults3 = function(feature) {
  if (feature.properties.Scenario == 'const_original') {
    return true;
  } else {
    return false; 
  }
};

let FilterResults4 = function(feature) {
  if (feature.properties.Scenario == 'const_50more') {
    return true;
  } else {
    return false; 
  }
};

let FilterResults5 = function(feature) {
  if (feature.properties.Scenario == 'const_100more') {
    return true;
  } else {
    return false; 
  }
};




let FilterYear = function(feature) {
  if (feature.properties.year <= 2018 ) {
    return true;
  } else {
    return false
  }
};

let FilterYear2 = function(feature) {
  if (feature.properties.year >= 2019 ) {
    return true;
  } else {
    return false
  }
};

let FilterGain = function(feature) {
  if (feature.properties.CLASS_NAME == "Gain" ) {
    return true;
  } else {
    return false
  }
};

let FilterSame = function(feature) {
  if (feature.properties.CLASS_NAME == "No Change" ) {
    return true;
  } else {
    return false
  }
};

$('input[id ="ELCheck"]').click(function () {
  if ($('input[id ="ELCheck"]').prop('checked')) { 
    if(i == 0) {
       ajaxEL(electric, ElectricStyle)
       $('#ConL').show();
       $('#legends1').show();
    } 
    else{ 
      ajaxEL(electric1, ElectricStyle)
      $('#ConL').show();
      $('#legends1').show();
    }
  }
  else{ 
    map.removeLayer(featureEL)
    constLegend()
  }
});

$('input[id ="NCCheck"]').click(function () {
  if ($('input[id ="NCCheck"]').prop('checked')) { 
    if (i == 0 ) { 
      ajaxNC(newconst, newStyle, FilterYear)
      $('#ConL').show();
      $('#legends1').show();
    } 
    else { 
      ajaxNC(newconst, newStyle, FilterYear2)
      $('#ConL').show();
      $('#legends1').show();
    }
  }
  else{ 
    map.removeLayer(featureNC)
    constLegend()
  }
});

$('input[id ="DEMCheck"]').click(function () {
  if ($('input[id ="DEMCheck"]').prop('checked')) { 
    if (i == 0){ 
      ajaxDEMO(demolition, DeomoStyle, FilterYear)
      $('#ConL').show();
      $('#legends1').show();
    } 
    else { 
      ajaxDEMO(demolition, DeomoStyle, FilterYear2)
      $('#ConL').show();
      $('#legends1').show();
    }
  }
  else{ 
    map.removeLayer(featureDEMO)
    constLegend()
  }
});

$('input[id ="ALTCheck"]').click(function () {
  if ($('input[id ="ALTCheck"]').prop('checked')) { 
    if(i == 0) { 
      ajaxALT(alteration, AltStyle)
      $('#ConL').show();
      $('#legends1').show();
    } 
    else{ 
      ajaxALT(alteration1, AltStyle)
      $('#ConL').show();
      $('#legends1').show();
    }
  }
  else{ 
    map.removeLayer(featureALT)
    constLegend()
  }
});

$('input[id ="ADDCheck"]').click(function () {
  if ($('input[id ="ADDCheck"]').prop('checked')) { 
    if(i == 0) { 
    ajaxADD(addition, AddStyle, FilterYear)
    $('#ConL').show();
    $('#legends1').show();
    } 
    else { 
      ajaxADD(addition, AddStyle, FilterYear2)
      $('#ConL').show();
      $('#legends1').show();
    }
  }
  else{ 
    map.removeLayer(featureADD) 
    constLegend()
  }
});

$('input[id ="PCheck"]').click(function () {
  if ($('input[id ="PCheck"]').prop('checked')) { 
    if(i == 0) { 
    ajaxP(plum, PlumStyle)
    $('#ConL').show();
    $('#legends1').show();
    } 
    else { 
      ajaxP(plum2, PlumStyle)
      $('#ConL').show();
      $('#legends1').show();
      
    }
  }
  else{ 
    map.removeLayer(featureP) 
    constLegend()
  }
});

$('input[id ="MCheck"]').click(function () {
  if ($('input[id ="MCheck"]').prop('checked')) { 
    if(i == 0) { 
    ajaxM(Mechanical, MechanicalcStyle, FilterYear)
    $('#ConL').show();
    $('#legends1').show();
    } 
    else { 
      ajaxM(Mechanical, MechanicalcStyle, FilterYear2)
      $('#ConL').show();
      $('#legends1').show();
    }
  }
  else{ 
    map.removeLayer(featureM) 
    constLegend()
  }
});


var NDropDown1 = function(string, style, dataset, Filter, pop){ $( string ).click(function() {
  if(featureGroups != undefined){
    map.removeLayer(featureGroups) }  
    map.removeLayer(bound); 
  ajaxfunc(dataset, style, Filter, pop); 
});
} 

var NDropDown2Bar = function(string, style, dataset, Filter, pop){ $( string ).click(function() {
  map.removeLayer(bound)
  if(featureGroups != undefined){
    map.removeLayer(featureGroups) }  
    histogramBins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
  ajaxfunc(dataset, style, Filter, pop).done(function (){ 
    if(histogramChart === undefined) { 
      $('#BenFrank').hide();
      BuildChart() 
    }
    else{ updateChart()} 
  }) 
});
} 

NDropDown1("#cov08", CoverageStyle, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#cov18", CoverageStyle18,  Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#pctCov08", pctCoverageStyle, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#pctCove18", pctCoverageStyle18, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#lostTrees", AreaLossN, Neighborhood, FilterMain, onEachFeatureStats) 
NDropDown1("#gainedTrees", AreaGainN, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#NetChange", NetChangeN, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#pctLoss", pctLossN, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#pctGain", pctGainN, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#pctChange", pctChangeN, Neighborhood, FilterMain, onEachFeatureStats)



NDropDown1("#cov08F", CoverageStyle08F, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#cov18F", CoverageStyle18F,  Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#pctCov08F", pctCoverageStyle, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#pctCove18F", pctCoverageStyle18, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#lostTreesF", AreaLossF, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#gainedTreesF", AreaGainF, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#NetChangeF", NetChangeF, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#pctLossF", pctLossF, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#pctGainF", pctGainF, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#pctChangeF", pctChangeF, Grid, FilterMain, onEachFeatureStats1)

NDropDown2Bar("#S1", ResultStyle, results, FilterResults1, onEachFeatureStats2)
NDropDown2Bar("#S2", ResultStyle, results, FilterResults2, onEachFeatureStats2)
NDropDown2Bar("#S3", ResultStyle, results, FilterResults4, onEachFeatureStats2)
NDropDown2Bar("#S4", ResultStyle, results, FilterResults3, onEachFeatureStats2)
NDropDown2Bar("#S5", ResultStyle, results, FilterResults5, onEachFeatureStats2)





/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


$('#clearMap').on('click', function(e) {
  if (map.hasLayer(featureGroups)){ 
  map.removeLayer(featureGroups)
  $('#legends').hide();
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').hide();
  $('#sce').hide();
  } 
  $("#firstDrop").html("View Tree Canopy Statistics by Neighborhood");
  $("#secondDrop").html("View Tree Canopy Statistics by Grid Cell");
  $("#thirdDrop").html("View Tree Canopy Construction Scenarios");

  ajaxBound() 
});

$('#MapOn').on('click', function(e) {
  if(featureGroups != undefined){ 
  if (map.hasLayer(featureGroups) == false){ 
  map.addLayer(featureGroups) ; 
  map.removeLayer(bound); 
  featureGroups.bringToBack(); 
  if (y == 1){ 
    y1() 
  }
  if (y == 2){ 
    y2() 
  }
  if (y == 3){ 
    y3() 
  }
  if (y == 3){ 
    y3() 
  }
  if (y == 4){ 
    y4() 
  }
  if (y == 5){ 
    y5() 
  }
  if (y == 6){ 
    y6() 
  }
  if (y == 7){ 
    y7() 
  }
  if (y == 8){ 
    y8() 
  }
  if (y == 9){ 
    y9() 
  }
  } } 
});





ajaxfunc = function(dataset, myStyle, myFilter, oneach){ 
  return $.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureGroups = L.geoJson(parsedData, {
    style: myStyle,
    color: "red", 
    fillOpacity: 1,
    weight: 3,
    filter: myFilter, 
    onEachFeature: oneach,
    }).addTo(map);
    featureGroups.bringToBack(); 
});
} 



ajaxEL = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureEL = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 2})
    }
}).addTo(map) 
});
} 

ajaxALT = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureALT = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 2})
    }
}).addTo(map) 
});
} 

ajaxADD = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureADD = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 2})
    }
}).addTo(map) 
});
} 

ajaxDEMO = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureDEMO = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 2})
    }
}).addTo(map) 
});
} 

ajaxNC = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureNC = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 2})
    }
}).addTo(map) 
});
} 

ajaxP = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureP = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 2})
    }
}).addTo(map) 
});
} 

ajaxM = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureM = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 2})
    }
}).addTo(map) 
});
} 

ajaxBound = function(){ $.ajax(PhiladelphiaBounds).done(function(data) {
  var parsedData = JSON.parse(data);
  bound = L.geoJson(parsedData, {
    color: "black", 
    fillOpacity: 0,
    weight: 1.5, 
}).addTo(map) 
});
} 

ajaxBound() 

let i = 0; 

$('#CON0818').click(function(){
  $("button").removeClass("active");
  $(this).addClass("active");
  i = 0; 
  if(map.hasLayer(featureNC)){ 
    map.removeLayer(featureNC); 
    ajaxNC(newconst, newStyle, FilterYear)
  }
  if(map.hasLayer(featureDEMO)){ 
    map.removeLayer(featureDEMO); 
    ajaxDEMO(demolition, DeomoStyle, FilterYear)
  }
  if(map.hasLayer(featureADD)){ 
    map.removeLayer(featureADD); 
    ajaxADD(addition, AddStyle, FilterYear)
  }
  if(map.hasLayer(featureALT)){ 
    map.removeLayer(featureALT); 
    ajaxALT(alteration, AltStyle, FilterYear)
  }
  if(map.hasLayer(featureEL)){ 
    map.removeLayer(featureEL); 
    ajaxEL(electric, ElectricStyle, FilterYear)
  }
  if(map.hasLayer(featureP)){ 
    map.removeLayer(featureP); 
    ajaxP(plum, PlumStyle)
  }
  if(map.hasLayer(featureM)){ 
    map.removeLayer(featureM); 
    ajaxM(Mechanical, MechanicalcStyle, FilterYear)
  }
});

$('#CON19').click(function(){
  $("button").removeClass("active");
  $(this).addClass("active");
  i = 1; 
  if(map.hasLayer(featureNC)){ 
    map.removeLayer(featureNC); 
    ajaxNC(newconst, newStyle, FilterYear2)
  }
  if(map.hasLayer(featureDEMO)){ 
    map.removeLayer(featureDEMO); 
    ajaxDEMO(demolition, DeomoStyle, FilterYear2)
  }
  if(map.hasLayer(featureADD)){ 
    map.removeLayer(featureADD); 
    ajaxADD(addition, AddStyle, FilterYear2)
  }
  if(map.hasLayer(featureALT)){ 
    map.removeLayer(featureALT); 
    ajaxALT(alteration1, AltStyle, FilterYear2)
  }
  if(map.hasLayer(featureEL)){ 
    map.removeLayer(featureEL); 
    ajaxEL(electric1, ElectricStyle, FilterYear2)
  }
  if(map.hasLayer(featureP)){ 
    map.removeLayer(featureP); 
    ajaxP(plum2, PlumStyle)
  }
  if(map.hasLayer(featureM)){ 
    map.removeLayer(featureM); 
    ajaxM(Mechanical, MechanicalcStyle, FilterYear2)
  }
});


function yourOnEachFeatureFunction(feature, layer){
  layer.bindPopup("Change Type:  " + feature.properties.CLASS_NAME + "<br>"  + 
          "Neighborhood:  " + feature.properties.NAME + "<br>" + 
          "Area (m^2):  " + feature.properties.Area+ "<br>" ) 
} 

function onEachFeatureStats(feature, layer) { 
  layer.bindPopup("Neighborhood: " + feature.properties.LISTNAME +  "<br>" + 
    "2008 Tree Canopy Coverage:  " + feature.properties.AreaCoverage08.toFixed(2) + " Square Feet" +  "<br>" + 
  "2018 Tree Canopy Coverage:  " + feature.properties.AreaCoverage18.toFixed(2) +  " Square Feet" + "<br>" + 
  "2008 Percent Tree Coverage:  " + feature.properties.pctCoverage08.toFixed(2) + "%" + "<br>" + 
  "2018 Percent Tree Coverage:  " + feature.properties.pctCoverage18.toFixed(2) + "%" + "<br>" + 
  "Area Lost:  " + feature.properties.AreaLoss.toFixed(2) + " Square Feet" + "<br>" + 
  "Area Gained:  "+ feature.properties.AreaGain.toFixed(2) + " Square Feet" + "<br>" + 
  "Net Change:  " + feature.properties.GainMinusLoss.toFixed(2) + " Square Feet" + "<br>" + 
  "Percent Loss:  " + feature.properties.pctLoss.toFixed(2)+ "%"  + "<br>" + 
  "Precent Gain:  " + feature.properties.pctGain.toFixed(2)+ "%"  + "<br>" + 
  "Percent Change: "+ feature.properties.pctChange.toFixed(2)+ "%" )
}

function onEachFeatureStats1(feature, layer) { 
  layer.bindPopup(
    "2008 Tree Canopy Coverage:  " + feature.properties.AreaCoverage08.toFixed(2)+ " Square Feet" + "<br>" + 
  "2018 Tree Canopy Coverage:  " + feature.properties.AreaCoverage18.toFixed(2) + " Square Feet" + "<br>" + 
  "2008 Percent Tree Coverage:  " + feature.properties.pctCoverage08.toFixed(2) + "%" + "<br>" + 
  "2018 Percent Tree Coverage:  " + feature.properties.pctCoverage18.toFixed(2)+ "%"  + "<br>" + 
  "Area Lost:  " + feature.properties.AreaLoss.toFixed(2) + " Square Feet"+ "<br>" + 
  "Area Gained:  "+ feature.properties.AreaGain.toFixed(2)+ " Square Feet" + "<br>" + 
  "Net Change:  " + feature.properties.netChange.toFixed(2) + " Square Feet" + "<br>" + 
  "Percent Loss:  " + feature.properties.pctLoss.toFixed(2)+ "%"  + "<br>" + 
  "Precent Gain:  " + feature.properties.pctGain.toFixed(2) + "%"  + "<br>" + 
  "Percent Change: "+ feature.properties.pctChange.toFixed(2) + "%" )
}


function onEachFeatureConst(feature, layer) { 
  layer.bindPopup( 
    "ADDRESS: " + feature.properties.address + "<br>" + 
    "YEAR: "   + feature.properties.year + "<br>" + 
    "PERMIT TYPE: " + feature.properties.permitdescription + "<br>" 

  )
}


var countCat = function (feature) { 
  if(feature.properties.Risk_Cat === "Very Low"){ 
    histogramBins[0] = histogramBins[0] + 1
  }
  if(feature.properties.Risk_Cat === "Low"){ 
    histogramBins[1] = histogramBins[1] + 1
  }
  if(feature.properties.Risk_Cat === "Moderate"){ 
    histogramBins[2] = histogramBins[2] + 1
  }
  if(feature.properties.Risk_Cat === "High"){ 
    histogramBins[3] = histogramBins[3] + 1
  }
  if(feature.properties.Risk_Cat === "Severe"){ 
    histogramBins[4] = histogramBins[4] + 1
  }
}


function onEachFeatureStats2(feature, layer) { 
  if (feature.properties.Risk_Cat != "Severe"){ 
  layer.bindPopup(
    "Subtantial Tree Loss Risk: " + feature.properties.Probs.toFixed(2) * 100 + "%" + "<br>" + 
  "Tree Loss Severity: " + feature.properties.Risk_Cat + "<br>") ; } 
  else { 
    layer.bindPopup(
      "Probaility of Substantial Tree Loss: " + feature.properties.Probs.toFixed(2) * 100 + "%" + "<br>" + 
    "Subtantial Tree Loss Risk: " + "Very High"+ "<br>") ; 
  }
  countCat(feature)
}

function BuildChart( ){ 
  var ctx = document.getElementById('myChart').getContext('2d');

histogramChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Very Low', 'Low', 'Moderate', 'High', 'Very High'],
        datasets: [{
            label: '# of Grid Cells',
            data: histogramBins, 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      
      plugins: {
        legend: false, 
        title: {
            display: true,
            text: ["Substantial Tree Canopy Risk by Grid Cell Count", s]
        }
    }, 
        scales: {
          yAxes: {
            title: {
              display: true,
              text: '# of Grid Cells'
            }
          },
          xAxes: {
            title: {
              display: true,
              text: 'Risk Category'
            }
          }
        }, 
        
    }
});


}


var histogramBins1 = [0, 0, 0, 0, 0] 

var updateChart= function(){ 
  histogramChart.data.datasets[0].data = histogramBins ; 
  histogramChart.options.plugins.title.text = ["Substantial Tree Canopy Risk by Grid Cell Count", s]
  histogramChart.update()
}

document.getElementById("myModal").click();

var y; 

var y1 = function() { 
  $('#AreaCov').show();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
}

var y2 = function() { 
  $('#AreaCov').hide();
  $('#pctLegend').show();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
}

var y3 = function() { 
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').show();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
}

var y4 = function () { 
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').show();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
}

var y5 = function() { 
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').show();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
}

var y6 = function() { 
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').show();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
}

var y7 = function() { 
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').show();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
}

var y8 = function () { 
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').show();
  $('#legends').show();
  $('#sce').hide();
}

var y9 = function () { 
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').show();
}


$( "#cov08" ).click(function() {
  y1()
  y = 1
});

$( "#cov18" ).click(function() {
  y1() 
  y = 1
});

$( "#cov08F" ).click(function() {
   y1() 
  y = 1
});

$( "#cov08F" ).click(function() {
  y1() 
  y = 1
});

$( "#pctCov08" ).click(function() {
  y2() 
  y = 2 
});

$( "#pctCove18" ).click(function() {
  y2() 
  y = 2
});

$( "#pctCov08F" ).click(function() {
  y2() 
  y = 2
});

$( "#pctCove18F" ).click(function() {
  y2() 
  y = 2
});

$( "#lostTrees" ).click(function() {
  y3() 
  y = 3
});

$( "#lostTreesF" ).click(function() {
  y3() 
  y = 3
});

$( "#gainedTrees" ).click(function() {
  y4() 
  y = 4
});

$( "#gainedTreesF" ).click(function() {
  y4() 
  y = 4
});


$( "#NetChange" ).click(function() {
  y5() 
  y = 5
});

$( "#NetChangeF" ).click(function() {
  y5() 
  y = 5
});

$( "#pctLoss" ).click(function() {
  y6() 
  y = 6 
});

$( "#pctLossF" ).click(function() {
  y6()
  y = 6 
});

$( "#pctGain" ).click(function() {
  y7() 
  y = 7 
});

$( "#pctGainF" ).click(function() {
 y7() 
  y = 7 
});

$( "#pctChange" ).click(function() {
  y8() 
  y = 8
});

$( "#pctChangeF" ).click(function() {
  y8() 
  y = 8 
});

let s = 0 

$( "#S1" ).click(function() {
  y9() 
  y = 9
  s =  "50% Decrease in Construction Scenario"; 
});

$( "#S2" ).click(function() {
  y9() ; 
  y = 9; 
  s = "25% Decrease in Construction Scenario"; 
});

$( "#S3" ).click(function() {
  y9() ; 
  y = 9; 
  s = "Current Construction Scenario"; 
});


$( "#S4" ).click(function() {
  y9() 
  y = 9; 
  s = "25% Increase in Construction Scenario"; 
});

$( "#S5" ).click(function() {
  y9() ; 
  y = 9; 
  s =  "50% Increase in Construction Scenario"; 
});

window.onload=function(){
  document.getElementById("myModal").click();
};

var constLegend = function() { 
  if ($('#ADDCheck').prop('checked') == false &  $('#ALTCheck').prop('checked') == false & $('#ALTCheck').prop('checked') == false & $('#DEMCheck').prop('checked') == false 
  & $('#ELCheck').prop('checked') == false  & $('#MCheck').prop('checked') == false  & $('#NCCheck').prop('checked') == false & $('#PCheck').prop('checked') == false ) { 
    $('#ConL').hide();
      $('#legends1').hide();
  }
}


$(function(){

  $("#firstDrop1 li a").click(function(){

    $("#firstDrop:first-child").text($(this).text());
    $("#firstDrop:first-child").val($(this).text());
    $("#secondDrop").html("View Tree Canopy Statistics by Grid Cell");
    $("#thirdDrop").html("View Tree Canopy Construction Scenarios");
 });

});

$(function(){

  $("#secondDrop1 li a").click(function(){

    $("#secondDrop:first-child").text($(this).text());
    $("#secondDrop:first-child").val($(this).text());
    $("#firstDrop").html("View Tree Canopy Statistics by Neighborhood");
    $("#thirdDrop").html("View Tree Canopy Construction Scenarios");

 });

});


$(function(){

  $("#thirdDrop1 li a").click(function(){

    $("#thirdDrop:first-child").text($(this).text());
    $("#thirdDrop:first-child").val($(this).text());
    $("#firstDrop").html("View Tree Canopy Statistics by Neighborhood");
    $("#secondDrop").html("View Tree Canopy Statistics by Grid Cell");

 });

});






