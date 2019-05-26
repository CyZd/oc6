<template>
  <div>
    <div class="container is-fluid" id="myMap" ref="map"></div>
  </div>
</template>

<script>
// import { serverBus } from '../main.js';
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import VueFlashMessage from "vue-flash-message";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";

export default {
  mounted() {
    this.initMap();
    this.initLayers();
    this.getPos();
    this.launchAdress();
    serverBus.listen("changeCircleRange", distance => {
      this.redrawCircleMap(distance);
    });
    serverBus.listen("showTransportVelib", () => {
      this.apiCall(
        "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-emplacement-des-stations&rows=" +
          20 +
          "&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "xy",
        "name",
        "capacity",
        "dist",
        "Transport",
        "Stations Velib"
      );
    });
    serverBus.listen("showTransportElectriccar", () => {
      this.apiCall(
        "https://opendata.paris.fr/api/records/1.0/search/?dataset=bornes-de-recharge-pour-vehicules-electriques&rows=" +
          20 +
          "&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geo_point_2d",
        "adresse_rue",
        "tarif_general",
        "dist",
        "Transport",
        "Véhicules électriques"
      );
    });
    serverBus.listen("showTransportParking", () => {
      this.apiCall(
        "https://opendata.paris.fr/api/records/1.0/search/?dataset=stationnement-voie-publique-emplacements&facet=regpri&facet=regpar&facet=typsta&facet=arrond&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geo_point_2d",
        "nomvoie",
        "tar",
        "dist",
        "Transport",
        "Stationnement"
      );
    });
    serverBus.listen("showTransportMetro", () => {
      this.apiCall(
        "https://dataratp.opendatasoft.com/api/records/1.0/search/?dataset=positions-geographiques-des-stations-du-reseau-ratp&facet=stop_name&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "stop_coordinates",
        "stop_name",
        "stop_desc",
        "dist",
        "Transport",
        "Bus RATP"
      );
    });
    serverBus.listen("showMedicMedecin", () => {
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=base-sirene-v3-ss&facet=etablissementsiege&facet=libellecommuneetablissement&facet=etatadministratifetablissement&facet=nomenclatureactiviteprincipaleetablissement&facet=caractereemployeuretablissement&facet=departementetablissement&facet=regionetablissement&facet=sectionetablissement&facet=classeetablissement&facet=statutdiffusionunitelegale&facet=unitepurgeeunitelegale&facet=sexeunitelegale&facet=categorieentreprise&facet=sectionunitelegale&facet=classeunitelegale&facet=naturejuridiqueunitelegale&refine.classeunitelegale=Activite+des+medecins+generalistes&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geolocetablissement",
        "prenomusuelunitelegale",
        "nomunitelegale",
        "dist",
        "Santé",
        "Medecins"
      );
    });
    serverBus.listen("showMedicPharmacies", () => {
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=carte-des-pharmacies-dile-de-france&facet=libdepartement&facet=commune&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "wgs84",
        "rs",
        "telephone",
        "dist",
        "Santé",
        "Pharmacies"
      );
    });
    serverBus.listen("showMedicCentresSante", () => {
      this.apiCall(
        "https://opendata.paris.fr/api/records/1.0/search/?dataset=consultations_des_centres_de_sante&facet=nom_de_lactivite&facet=specialite&facet=adresse_code_postal&facet=adresse_ville&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geo_point_2d",
        "c_rs",
        "c_adresse",
        "dist",
        "Santé",
        "Centres de soin"
      );
    });
    serverBus.listen("showKidsCreches", () => {
      this.apiCall(
        "https://public.opendatasoft.com/api/records/1.0/search/?dataset=equipement-ponctuel-petite-enfance&facet=l_ep_maj&facet=l_ep_min&facet=c_suf1&facet=c_liaison&facet=l_voie&facet=b_public&facet=d_annee_cr&facet=lib_ql1&facet=val_qn1&facet=n_sq_ee&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geo_point_2d",
        "l_ep_maj",
        "",
        "dist",
        "Enfance",
        "Crèches"
      );
    });
    serverBus.listen("showKidsSchool", () => {
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=annuaire-de-leducation&facet=identifiant_de_l_etablissement&facet=nom_etablissement&facet=type_etablissement&facet=statut_public_prive&facet=code_postal&facet=code_commune&facet=nom_commune&facet=code_departement&facet=code_academie&facet=code_region&facet=ecole_maternelle&facet=ecole_elementaire&facet=voie_generale&facet=voie_technologique&facet=voie_professionnelle&facet=restauration&facet=hebergement&facet=ulis&facet=apprentissage&facet=segpa&facet=section_arts&facet=section_cinema&facet=section_theatre&facet=section_sport&facet=section_internationale&facet=section_europeenne&facet=lycee_agricole&facet=lycee_militaire&facet=lycee_des_metiers&facet=post_bac&facet=appartenance_education_prioritaire&facet=greta&facet=type_contrat_prive&facet=libelle_departement&facet=libelle_academie&facet=libelle_region&facet=nom_circonscription&facet=ministere_tutelle&facet=multi_uai&facet=rpi_concentre&facet=rpi_disperse&facet=code_nature&facet=libelle_nature&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "position",
        "nom_etablissement",
        "adresse_1",
        "dist",
        "Enfance",
        "Ecoles"
      );
    });
    serverBus.listen("showCommerce", () => {
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=base-sirene-v3-ss&facet=etablissementsiege&facet=libellecommuneetablissement&facet=etatadministratifetablissement&facet=nomenclatureactiviteprincipaleetablissement&facet=caractereemployeuretablissement&facet=departementetablissement&facet=regionetablissement&facet=sectionetablissement&facet=classeetablissement&facet=statutdiffusionunitelegale&facet=unitepurgeeunitelegale&facet=sexeunitelegale&facet=categorieentreprise&facet=sectionunitelegale&facet=classeunitelegale&facet=naturejuridiqueunitelegale&refine.classeetablissement=Boulangerie+et+boulangerie-patisserie&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geolocetablissement",
        "denominationusuelleetablissement",
        "classeetablissement",
        "dist",
        "Quotidien",
        "Boulangeries"
      );
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=base-sirene-v3-ss&facet=etablissementsiege&facet=libellecommuneetablissement&facet=etatadministratifetablissement&facet=nomenclatureactiviteprincipaleetablissement&facet=caractereemployeuretablissement&facet=departementetablissement&facet=regionetablissement&facet=sectionetablissement&facet=classeetablissement&facet=statutdiffusionunitelegale&facet=unitepurgeeunitelegale&facet=sexeunitelegale&facet=categorieentreprise&facet=sectionunitelegale&facet=classeunitelegale&facet=naturejuridiqueunitelegale&refine.classeetablissement=Coiffure&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geolocetablissement",
        "denominationusuelleetablissement",
        "classeetablissement",
        "dist",
        "Quotidien",
        "Coiffeurs"
      );
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=base-sirene-v3-ss&facet=etablissementsiege&facet=libellecommuneetablissement&facet=etatadministratifetablissement&facet=nomenclatureactiviteprincipaleetablissement&facet=caractereemployeuretablissement&facet=departementetablissement&facet=regionetablissement&facet=sectionetablissement&facet=classeetablissement&facet=statutdiffusionunitelegale&facet=unitepurgeeunitelegale&facet=sexeunitelegale&facet=categorieentreprise&facet=sectionunitelegale&facet=classeunitelegale&facet=naturejuridiqueunitelegale&refine.classeetablissement=Commerce+de+detail+d%27habillement+en+magasin+specialise&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geolocetablissement",
        "denominationusuelleetablissement",
        "classeetablissement",
        "dist",
        "Quotidien",
        "Prêt à porter"
      );
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=base-sirene-v3-ss&facet=etablissementsiege&facet=libellecommuneetablissement&facet=etatadministratifetablissement&facet=nomenclatureactiviteprincipaleetablissement&facet=caractereemployeuretablissement&facet=departementetablissement&facet=regionetablissement&facet=sectionetablissement&facet=classeetablissement&facet=statutdiffusionunitelegale&facet=unitepurgeeunitelegale&facet=sexeunitelegale&facet=categorieentreprise&facet=sectionunitelegale&facet=classeunitelegale&facet=naturejuridiqueunitelegale&refine.classeetablissement=Commerce+d%27alimentation+generale&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geolocetablissement",
        "enseigne1etablissement",
        "classeetablissement",
        "dist",
        "Quotidien",
        "Alimentation"
      );
    });
    serverBus.listen("showRestaurant", () => {
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=base-sirene-v3-ss&facet=etablissementsiege&facet=libellecommuneetablissement&facet=etatadministratifetablissement&facet=nomenclatureactiviteprincipaleetablissement&facet=caractereemployeuretablissement&facet=departementetablissement&facet=regionetablissement&facet=sectionetablissement&facet=classeetablissement&facet=statutdiffusionunitelegale&facet=unitepurgeeunitelegale&facet=sexeunitelegale&facet=categorieentreprise&facet=sectionunitelegale&facet=classeunitelegale&facet=naturejuridiqueunitelegale&refine.classeunitelegale=Restauration+traditionnelle&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geolocetablissement",
        "denominationunitelegale",
        "soussectionunitelegale",
        "dist",
        "Quotidien",
        "Restaurants"
      );
    });
    serverBus.listen("showSocialAction", () => {
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=finess&facet=libdepartement&facet=libcategetab&exclude.libcategetab=Pharmacie+d%27Officine&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "geo",
        "rslongue",
        "adresse",
        "dist",
        "Quotidien",
        "Action sociale"
      );
    });
    serverBus.listen("showSport", () => {
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=20170419_res_fichesequipementsactivites&facet=deplib&facet=actlib&facet=actnivlib&facet=equipementtypelib&facet=naturesollib&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "equgpsy_x",
        "insnom",
        "equipementtypelib",
        "dist",
        "Quotidien",
        "Sport"
      );
    });
    serverBus.listen("showCulture", () => {
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=carte-des-bibliotheques&facet=departement&facet=ville&facet=annee_s_subvention_region&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "wgs84",
        "nom_structure",
        "adresse",
        "dist",
        "Quotidien",
        "Bibliothèques"
      );
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=liste_des_etablissements_publics_culture&facet=ville&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "wgs84",
        "structure",
        "adresse",
        "dist",
        "Quotidien",
        "Etablissements culturels"
      );
      this.apiCall(
        "https://data.iledefrance.fr/api/records/1.0/search/?dataset=les_salles_de_cinemas_en_ile-de-france&facet=dep&facet=adrcommune&geofilter.distance=" +
          this.currentPos.lat +
          "%2C" +
          this.currentPos.lng +
          "%2C" +
          1500,
        "wgs84",
        "enseigne",
        "adr",
        "dist",
        "Quotidien",
        "Cinémas"
      );
    });
    serverBus.listen("treatResult", data => {
      var pointsTable = [];
      var filtered = [];
      for (var keys of data[0]) {
        var newPoint = this.createPoint(
          keys.fields,
          data[1],
          data[2],
          data[3],
          data[4],
          data[5],
          data[6],
          data[7]
        );
        pointsTable.push(newPoint);
      }

      filtered.push(pointsTable[0]);
      for (var i = 1; i < pointsTable.length; i++) {
        if (pointsTable[i].dist != pointsTable[i - 1].dist) {
          filtered.push(pointsTable[i]);
        }
      }

      // this.saveResult(data[5], Date.now(),pointsTable,data[6],data[7]);
      this.saveResult(data[5], Date.now(), filtered, data[6], data[7]);
      this.pushToLayer(
        this.globalResults,
        data[5],
        data[1],
        data[2],
        data[3],
        data[4],
        data[6],
        data[7]
      );
      serverBus.fire("updateMap", this.globalPoints);
      serverBus.fire("updatePannel", this.globalPoints);
    });
    serverBus.listen("updateMap", table => {
      this.layerGroup.clearLayers();
      var update = table.filter(element => element.options.visible == true);
      this.layerGroup = L.layerGroup(update).addTo(this.myMap);
    });
    serverBus.listen("hoverAlert", data => {
      for (var items of this.globalPoints) {
        if (items.options.uniqueId == data[0] && data[1] == true) {
          //must change color before going live
          items.setOpacity(1);
          items.openPopup();
        } else if (items.options.uniqueId == data[0] && data[1] == false) {
          items.setOpacity(0.6);
          items.closePopup();
        }
      }
    });
    serverBus.listen("switchLocation", data => {
      this.GPS = data;
      if (this.GPS == true) {
        this.activeGPS();
        this.myMap.removeControl(this.searchControl);
      } else {
        this.launchAdress();
      }
    });
    serverBus.listen("addUserMarker", coords => {
      if (coords == null || coords == undefined) {
        coords = this.currentPos;
      }
      L.marker(coords).addTo(this.myMap);
    });
    serverBus.listen("setCurrentPos", e => {
      this.currentPos.lat = e.location.bounds[0][0];
      this.currentPos.lng = e.location.bounds[0][1];
    });
  },
  created() {
    serverBus.listen("changeCircleRange", distance => {
      this.redrawCircleMap(distance);
    });
    window.addEventListener("scroll", this.scrollMapEvent);
    this.offset = window.pageOffset;
  },
  methods: {
    initMap() {
      let lat = 48.852969,
        long = 2.349903;
      // const myMap=L.map('myMap');
      this.myMap = L.map("myMap").setView([lat, long], 13);
      // myMap.locate({setView: true, maxZoom: 16});

      // this.myMap.dragging.disable();
      this.myMap.touchZoom.disable();
      this.myMap.doubleClickZoom.disable();
      this.myMap.scrollWheelZoom.disable();
      this.myMap.boxZoom.disable();
      this.myMap.keyboard.disable();
      if (this.myMap.tap) this.myMap.tap.disable();
      //map data old:"https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
      //attribution old: 'données <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
        {
          // data origin
          attribution:
            'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
          minZoom: 1,
          maxZoom: 20
        }
      ).addTo(this.myMap);
      L.control.scale().addTo(this.myMap);

      this.myMap.on("locationfound", function(e) {
        this.currentPos = e.latlng;
        console.log("Position fixed");
        serverBus.fire("locationFound", e.latlng);
        serverBus.fire("changeCircleRange", 250);
        // L.marker(e.latlng).addTo(this.myMap);
        serverBus.fire("addUserMarker", e.latlng);
      });
      this.myMap.on("onLocationError", function(e) {
        serverBus.fire("alertMessage", ["Nous ne pouvons pas vous localiser"]);
      });
      this.myMap.on("geosearch/showlocation", function(e) {
        serverBus.fire("setCurrentPos", e);
        // L.marker(this.currentPos).addTo(this.myMap);
        serverBus.fire("addUserMarker", this.currentPos);
        serverBus.fire("changeCircleRange", 250);
      });
    },
    getPos() {
      serverBus.listen("locationFound", coordinates => {
        this.currentPos = coordinates;
      });
    },
    initLayers() {
      this.layerGroup = L.layerGroup();
      this.circleGroup = L.layerGroup();
    },
    activeGPS() {
      this.myMap.locate({ setView: true, maxZoom: 16 });
      this.myMap.on("locationfound", function(e) {
        this.currentPos = e.latlng;
        console.log("Position fixed");
        serverBus.fire("locationFound", e.latlng);
        serverBus.fire("changeCircleRange", 250);
        serverBus.fire("alertMessage", [
          "Vous êtes localisé aux coordonnées: ",
          e.latlng
        ]);
        // L.marker(e.latlng).addTo(this.myMap);
        serverBus.fire("addUserMarker", e.latlng);
      });
      this.myMap.on("onLocationError", function(e) {
        serverBus.fire("alertMessage", ["Nous ne pouvons pas vous localiser"]);
      });
      this.myMap.on("geosearch/showlocation", function(e) {
        serverBus.fire("setCurrentPos", e);
        // L.marker(this.currentPos).addTo(this.myMap);
        serverBus.fire("addUserMarker", this.currentPos);
        serverBus.fire("changeCircleRange", 250);
      });
      serverBus.fire("setToZero");
    },
    launchAdress() {
      this.searchControl = new GeoSearchControl({
        provider: this.provider,
        showMarker: false,
        retainZoomLevel: true,
        autoClose: true,
        keepResult: true,
        searchLabel: "Entez une adresse"
      });

      this.myMap.addControl(this.searchControl);
      var adressBar = this.$refs.map.querySelector(".glass");
      adressBar.classList.add("input");
      serverBus.fire("setToZero");
    },
    apiCall(
      url,
      firstParam,
      secondParam,
      thirdParam,
      fourthParam,
      themeName,
      optionName
    ) {
      var requestAlreadyExist = this.checkResultExists(url);
      var pointsAlreadyDrawn = this.checkPointsDrawn(this.globalPoints, url);
      if (requestAlreadyExist && pointsAlreadyDrawn) {
        console.log("point exists and drawn");
        this.switchData(this.globalPoints, url, false);
        this.updateMap(this.globalPoints);
        serverBus.fire("updatePannel", this.globalPoints);
      } else if (requestAlreadyExist) {
        console.log("points exist but not shown");
        this.switchData(this.globalPoints, url, true);
        this.updateMap(this.globalPoints);
        serverBus.fire("updatePannel", this.globalPoints);
      } else {
        this.ajaxGet(url, function(response) {
          console.log("API responded");
          //turn the response in a json object
          var results = JSON.parse(response);
          if (results.nhits == 0) {
            serverBus.fire("alertMessage", [
              "Aucun résultat pour la recherche: ",
              optionName
            ]);
            serverBus.fire("buttonOff", [themeName, optionName]);
            return;
          } else {
            serverBus.firePoints(
              "treatResult",
              results.records,
              firstParam,
              secondParam,
              thirdParam,
              fourthParam,
              url,
              themeName,
              optionName
            );
          }
        });
      }
    },
    checkResultExists(url, position) {
      var result = this.findByName(this.globalResults, "name", url);
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
    },
    checkPointsDrawn(table, url) {
      for (var items of table) {
        if (items.options.request == url && items.options.visible == true) {
          return true;
        }
      }
    },
    switchData(table, url, boolChoice) {
      for (var items of table) {
        if (items.options.request == url) {
          items.options.visible = boolChoice;
        }
      }
    },
    findByName(array, key, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][key] == value) {
          return array[i];
        }
      }
      return null;
    },
    ajaxGet(url, callback) {
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
        serverBus.fire("alertMessage", [
          "Erreur de connexion à l'API: ",
          URLSearchParams
        ]);
      });
      request.send(null);
    },
    saveResult(url, date, table, themeName, optionName) {
      var queryResults = {};
      queryResults.name = url;
      queryResults.themeName = themeName;
      queryResults.optionName = optionName;
      queryResults.date = date;
      queryResults.points = table;
      queryResults.layer = null;
      this.globalResults.push(queryResults);
    },
    pushToLayer(
      globalResults,
      url,
      firstParam,
      secondParam,
      thirdParam,
      fourthParam,
      fithParam,
      sixthParam
    ) {
      var result = this.findByName(this.globalResults, "name", url);
      for (var point of result.points) {
        var uniqueId = Math.floor(Math.random() * 1000000000);
        var propertyName = Object.getOwnPropertyNames(point);
        var iconColor = this.attributeColorMarker(fithParam);
        this.globalPoints.push(
          L.marker(point[firstParam], {
            icon: iconColor,
            request: url,
            properties: propertyName,
            firstParam: point[secondParam],
            secondParam: point[secondParam],
            thirdParam: point[thirdParam],
            fourthParam: point[fourthParam],
            uniqueId: uniqueId,
            visible: true,
            theme: point[fithParam],
            optionName: point[sixthParam]
          }).bindPopup(
            point[secondParam] + "<br>" + point[fourthParam] + " mètres"
          )
        );
      }
      for (var i = 0; i < this.globalPoints.length; i++) {
        //must be replaced with set icons when going live
        this.globalPoints[i].setOpacity(0.6);
      }
    },
    attributeColorMarker(themeName) {
      var greenIcon = new L.Icon({
        iconUrl:
          "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      var redIcon = new L.Icon({
        iconUrl:
          "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      var yellowIcon = new L.Icon({
        iconUrl:
          "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      var violetIcon = new L.Icon({
        iconUrl:
          "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      var blueIcon = new L.Icon({
        iconUrl:
          "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      switch (themeName) {
        case "Transport":
          return blueIcon;
          break;
        case "Santé":
          return greenIcon;
          break;
        case "Enfance":
          return violetIcon;
          break;
        case "Quotidien":
          return redIcon;
          break;
        default:
          return blueIcon;
          break;
      }
    },
    updateMap(table) {
      this.layerGroup.clearLayers();
      var update = table.filter(element => element.options.visible == true);
      this.layerGroup = L.layerGroup(update).addTo(this.myMap);
    },
    redrawCircleMap: function(distance) {
      this.circleGroup.clearLayers();
      var newCircle = L.circle(this.currentPos, distance);
      this.circleGroup = L.layerGroup([newCircle]).addTo(this.myMap);
      this.myMap.fitBounds(newCircle.getBounds());
    },
    createPoint(
      data,
      firstParam,
      secondParam,
      thirdParam,
      fourthParam,
      fithParam,
      sixthParam,
      seventhParam
    ) {
      var newPoint = {};
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
      if (data.hasOwnProperty(fithParam)) {
        newPoint[fithParam] = data[fithParam];
      }
      newPoint[sixthParam] = sixthParam;
      newPoint[seventhParam] = seventhParam;

      // if(data.hasOwnProperty(fithParam)){
      //     newPoint[fithParam]=data[fithParam]
      // };
      // if(data.hasOwnProperty(sixthParam)){
      //     newPoint[sixthParam]=data[sixthParam]
      // };
      return newPoint;
    }
  },
  data() {
    return {
      globalResults: [],
      globalPoints: [],
      layerGroup: null,
      circleGroup: null,
      distance: null,
      currentPos: {
        lat: 0,
        lng: 0
      },
      provider: new OpenStreetMapProvider({ params: { countrycodes: "FR" } }),
      GPS: false,
      myMap: null,
      searchControl: null
    };
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  }
};
</script>

<style>
#myMap {
  height: 70vh;
  margin-top: 5px;
  position: sticky !important;

}

.sticky {
  position: fixed !important;
  top: 0 !important;
}

.leaflet-control-geosearch {
  background-color: white !important;
}

.geosearch {
  position: absolute !important;
  min-width: 350px !important;
  left: 100% !important;
}

.control {
  margin-left: auto !important;
  margin-right: auto !important;
  width: 90% !important;
}

@media screen and (max-width: 800px) {
  #myMap {
    height: 70vh!important;
    margin-top: 0px;
  }
  
  .vue-js-switch{
    transform:scale(0.8);
  }

  .geosearch {
    transform:scale(0.6)!important;
    left: 1% !important;
    }
}

@media screen and (max-width: 400px) {
  .geosearch {
    width: 300px !important;
  }

  form {
    max-width: 300px !important;
  }

}

@media screen and (max-width: 250px) {
  .geosearch {
    width: 220px !important;
    transform:scale(0.5)!important;
  }

  form {
    max-width: 220px !important;

  }
}
</style>
