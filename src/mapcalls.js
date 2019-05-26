var globalResults = [];
var globalPoints = [];
var layerGroup = L.layerGroup();
var circleGroup = L.layerGroup();

var distance = 0;

function changeDistance(distance) {
  this.distance = distance;
  redrawCircleMap(distance);
  updateMap(globalPoints);
}

function apiCall(url, firstParam, secondParam, thirdParam, fourthParam) {
  requestAlreadyExist = checkResultExists(url);
  if (requestAlreadyExist) {
    switchData(globalPoints, url);
    updateMap(globalPoints);
  } else {
    console.log("calling API");
    ajaxGet(url, function(response) {
      console.log("API responded");
      //turn the response in a json object
      var results = JSON.parse(response);
      if (results.nhits == 0) {
        console.log("no result found for " + url);
        //send event
      }
      pointsTable = [];
      for (keys of results.records) {
        newPoint = createPoint(
          keys.fields,
          firstParam,
          secondParam,
          thirdParam,
          fourthParam
        );
        pointsTable.push(newPoint);
      }
      saveResult(url, Date.now(), pointsTable);
      pushToLayer(
        globalResults,
        url,
        firstParam,
        secondParam,
        thirdParam,
        fourthParam
      );
      updateMap(globalPoints);
    });
  }
}

function createPoint(data, firstParam, secondParam, thirdParam, fourthParam) {
  newPoint = {};
  if (data.hasOwnProperty(firstParam)) {
    newPoint[firstParam] = data[firstParam];
  }
  if (data.hasOwnProperty(secondParam)) {
    newPoint[secondParam] = data[secondParam];
  }
  if (data.hasOwnProperty(thirdParam)) {
    newPoint[thirdParam] = data[thirdParam];
  }
  if (data.hasOwnProperty(fourthParam)) {
    newPoint[fourthParam] = data[fourthParam];
  }
  return newPoint;
}

function saveResult(url, date, table) {
  queryResults = {};
  queryResults.name = url;
  queryResults.date = date;
  queryResults.points = table;
  queryResults.layer = null;
  globalResults.push(queryResults);
}

function checkResultExists(url) {
  var result = findByName(globalResults, "name", url);
  if (result == null) {
    console.log("request never made.");
    return false;
  } else if ((Date.now() - result.date) / 1000 / 3600 > 6) {
    console.log("request is too old.");
    return false;
  } else {
    console.log("request already made.");
    return true;
  }
}

function pushToLayer(
  globalResults,
  url,
  firstParam,
  secondParam,
  thirdParam,
  fourthParam
) {
  result = findByName(globalResults, "name", url);
  for (point of result.points) {
    globalPoints.push(
      L.marker(point[firstParam], { uniqueID: url, visible: true }).bindPopup(
        point[secondParam] +
          "<br>" +
          point[thirdParam] +
          "<br>" +
          point[fourthParam] +
          " mètres de vous"
      )
    );
  }
  console.log("global points are:");
  console.log(globalPoints);
}

function switchData(table, url) {
  for (items of table) {
    if (items.options.uniqueID == url) {
      if (items.options.visible == true) {
        items.options.visible = false;
      } else {
        items.options.visible = true;
      }
    }
  }
}

function forceToTrue(table, url) {
  for (items of table) {
    if (items.options.uniqueID == url) {
      items.options.visible = true;
    }
  }
}

function updateMap(table) {
  layerGroup.clearLayers();
  update = table.filter(element => element.options.visible == true);
  layerGroup = L.layerGroup(update).addTo(myMap);
}

function ajaxGet(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", function() {
    if (request.status >= 200 && request.status < 400) {
      callback(request.responseText);
    } else {
      console.error(request.status + " " + request.statusText + " " + url);
    }
  });
  request.addEventListener("error", function() {
    console.error("Erreur de connexion à cette adresse:" + URLSearchParams);
  });
  request.send(null);
}

function findByName(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] == value) {
      return array[i];
    }
  }
  return null;
}

function redrawCircleMap(distance) {
  circleGroup.clearLayers();
  newCircle = L.circle(currentPos, distance);
  circleGroup = L.layerGroup([newCircle]).addTo(myMap);
  myMap.fitBounds(newCircle.getBounds());
}
