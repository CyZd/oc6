export default{
  install: function(Vue) {
    Vue.prototype.apiCall = function(
      url,
      firstParam,
      secondParam,
      thirdParam,
      fourthParam
    ) {
      var requestAlreadyExist = checkResultExists(url);
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
    };
    Vue.createPoint = function(
      data,
      firstParam,
      secondParam,
      thirdParam,
      fourthParam
    ) {
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
    };
    Vue.saveResult = function(url, date, table) {
      queryResults = {};
      queryResults.name = url;
      queryResults.date = date;
      queryResults.points = table;
      queryResults.layer = null;
      globalResults.push(queryResults);
    };
    Vue.checkResultExists = function(url) {
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
    };
    Vue.pushToLayer = function(
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
    };
    Vue.switchData = function(table, url) {
      for (items of table) {
        if (items.options.uniqueID == url) {
          if (items.options.visible == true) {
            items.options.visible = false;
          } else {
            items.options.visible = true;
          }
        }
      }
    };
    Vue.forceToTrue = function(table, url) {
      for (items of table) {
        if (items.options.uniqueID == url) {
          items.options.visible = true;
        }
      }
    };
    Vue.updateMap = function(table) {
      layerGroup.clearLayers();
      update = table.filter(element => element.options.visible == true);
      layerGroup = L.layerGroup(update).addTo(myMap);
    };
    Vue.ajaxGet = function(url, callback) {
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
    };
    Vue.findByName = function(array, key, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][key] == value) {
          return array[i];
        }
      }
      return null;
    };
    Vue.redrawCircleMap = function(distance) {
      circleGroup.clearLayers();
      newCircle = L.circle(currentPos, distance);
      circleGroup = L.layerGroup([newCircle]).addTo(myMap);
      myMap.fitBounds(newCircle.getBounds());
    };
  }

  
}

