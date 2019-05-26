<template>
  <div class="container">
    <badger-accordion v-if="catOne.length != 0">
      <badger-accordion-item class="message is-info">
        <template slot="header" class="message-header">{{
          catOneName
        }}</template>
        <template slot="content" class="message-body"
          ><div
            v-for="item in catOne"
            class="message-body"
            @mouseover="hoverAlert(item.options.uniqueId, true)"
            @mouseleave="hoverAlert(item.options.uniqueId, false)"
            :class="{ active: hover && itemRef == item.options.uniqueId }"
          >
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="subtitle">{{ item.options.firstParam }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">distance</p>
                  <p class="subtitle">
                    {{ item.options.fourthParam }} mètres de vous
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="subtitle">{{ item.options.thirdParam }}</p>
                </div>
              </div>
            </nav>
          </div>
        </template>
      </badger-accordion-item>
    </badger-accordion>

    <badger-accordion v-if="catTwo.length != 0">
      <badger-accordion-item class="message is-info">
        <template slot="header" class="message-header">{{
          catTwoName
        }}</template>
        <template slot="content" class="message-body"
          ><div
            v-for="item in catTwo"
            class="message-body"
            @mouseover="hoverAlert(item.options.uniqueId, true)"
            @mouseleave="hoverAlert(item.options.uniqueId, false)"
            :class="{ active: hover && itemRef == item.options.uniqueId }"
          >
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="subtitle">{{ item.options.firstParam }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">distance</p>
                  <p class="subtitle">
                    {{ item.options.fourthParam }} mètres de vous
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="subtitle">{{ item.options.thirdParam }}</p>
                </div>
              </div>
            </nav>
          </div>
        </template>
      </badger-accordion-item>
    </badger-accordion>

    <badger-accordion v-if="catThree.length != 0">
      <badger-accordion-item class="message is-info">
        <template slot="header" class="message-header">{{
          catThreeName
        }}</template>
        <template slot="content" class="message-body"
          ><div
            v-for="item in catThree"
            class="message-body"
            @mouseover="hoverAlert(item.options.uniqueId, true)"
            @mouseleave="hoverAlert(item.options.uniqueId, false)"
            :class="{ active: hover && itemRef == item.options.uniqueId }"
          >
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="subtitle">{{ item.options.firstParam }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">distance</p>
                  <p class="subtitle">
                    {{ item.options.fourthParam }} mètres de vous
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="subtitle">{{ item.options.thirdParam }}</p>
                </div>
              </div>
            </nav>
          </div>
        </template>
      </badger-accordion-item>
    </badger-accordion>

    <badger-accordion v-if="catFour.length != 0">
      <badger-accordion-item class="message is-info">
        <template slot="header" class="message-header">{{
          catFourName
        }}</template>
        <template slot="content" class="message-body"
          ><div
            v-for="item in catFour"
            class="message-body"
            @mouseover="hoverAlert(item.options.uniqueId, true)"
            @mouseleave="hoverAlert(item.options.uniqueId, false)"
            :class="{ active: hover && itemRef == item.options.uniqueId }"
          >
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="subtitle">{{ item.options.firstParam }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">distance</p>
                  <p class="subtitle">
                    {{ item.options.fourthParam }} mètres de vous
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="subtitle">{{ item.options.thirdParam }}</p>
                </div>
              </div>
            </nav>
          </div>
        </template>
      </badger-accordion-item>
    </badger-accordion>

    <badger-accordion v-if="catFive.length != 0">
      <badger-accordion-item class="message is-info">
        <template slot="header" class="message-header">{{
          catFiveName
        }}</template>
        <template slot="content" class="message-body"
          ><div
            v-for="item in catFive"
            class="message-body"
            @mouseover="hoverAlert(item.options.uniqueId, true)"
            @mouseleave="hoverAlert(item.options.uniqueId, false)"
            :class="{ active: hover && itemRef == item.options.uniqueId }"
          >
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="subtitle">{{ item.options.firstParam }}</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">distance</p>
                  <p class="subtitle">
                    {{ item.options.fourthParam }} mètres de vous
                  </p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="subtitle">{{ item.options.thirdParam }}</p>
                </div>
              </div>
            </nav>
          </div>
        </template>
      </badger-accordion-item>
    </badger-accordion>
  </div>
</template>

<script>
// const accordion = new BadgerAccordion('.js-badger-accordion');

export default {
  mounted() {
    serverBus.listen("updatePannel", results => {
      this.results = results;
      this.showGroupResults(this.group, this.results);
      this.getCatNames();
    });
    serverBus.listen("changeGroup", group => {
      this.group = group;
      this.showGroupResults(this.group, this.results);
      this.getCatNames();
    });
    serverBus.listen("setToZero", () => {
      this.results = null;
      this.toShow = null;
      this.catOne = [];
      this.catOneName = null;
      this.catTwo = [];
      this.catTwoName = null;
      this.catThree = [];
      this.catThreeName = null;
      this.catFour = [];
      this.catFourName = null;
      this.catFive = [];
      this.catFiveName = null;
    });
  },
  methods: {
    showGroupResults: function(group, results) {
      this.toShow = null;
      if (results != null) {
        switch (group) {
          case 0:
            var filterTheme = results.filter(
              element => element.options.theme == "Transport"
            );
            this.toShow = filterTheme.filter(
              element => element.options.visible == true
            );
            this.catOne = this.toShow.filter(
              element => element.options.optionName == "Stations Velib"
            );
            this.catTwo = this.toShow.filter(
              element => element.options.optionName == "Véhicules électriques"
            );
            this.catThree = this.toShow.filter(
              element => element.options.optionName == "Stationnement"
            );
            this.catFour = this.toShow.filter(
              element => element.options.optionName == "Bus RATP"
            );
            this.getCatNames();
            break;
          case 1:
            var filterTheme = results.filter(
              element => element.options.theme == "Santé"
            );
            this.toShow = filterTheme.filter(
              element => element.options.visible == true
            );
            this.catOne = this.toShow.filter(
              element => element.options.optionName == "Médecins"
            );
            this.catTwo = this.toShow.filter(
              element => element.options.optionName == "Pharmacies"
            );
            this.catThree = this.toShow.filter(
              element => element.options.optionName == "Centres de soin"
            );
            this.getCatNames();
            break;
          case 2:
            var filterTheme = results.filter(
              element => element.options.theme == "Enfance"
            );
            this.toShow = filterTheme.filter(
              element => element.options.visible == true
            );
            this.catOne = this.toShow.filter(
              element => element.options.optionName == "Crèches"
            );
            this.catTwo = this.toShow.filter(
              element => element.options.optionName == "Ecoles"
            );
            this.getCatNames();
            break;
          case 3:
            var filterTheme = results.filter(
              element => element.options.theme == "Quotidien"
            );
            this.toShow = filterTheme.filter(
              element => element.options.visible == true
            );
            this.catOne = this.toShow.filter(
              element =>
                element.options.optionName == "Boulangeries" ||
                element.options.optionName == "Coiffeurs" ||
                element.options.optionName == "Prêt à porter" ||
                element.options.optionName == "Alimentation"
            );
            this.catTwo = this.toShow.filter(
              element => element.options.optionName == "Restaurants"
            );
            this.catThree = this.toShow.filter(
              element => element.options.optionName == "Action sociale"
            );
            this.catFour = this.toShow.filter(
              element => element.options.optionName == "Sport"
            );
            this.catFive = this.toShow.filter(
              element =>
                element.options.optionName == "Bibliothèques" ||
                element.options.optionName == "Etablissements culturels" ||
                element.options.optionName == "Cinémas"
            );
            this.getCatNames();
            break;
        }
      }
    },
    hoverAlert: function(uniqueId, boolean) {
      this.hover = boolean;
      this.itemRef = uniqueId;
      serverBus.fire("hoverAlert", [uniqueId, boolean]);
    },
    getCatNames: function() {
      if (this.catOne.length != 0) {
        if (
          this.catOne[0].options.optionName == "Boulangeries" ||
          this.catOne[0].options.optionName == "Coiffeurs" ||
          this.catOne[0].options.optionName == "Prêt à porter" ||
          this.catOne[0].options.optionName == "Alimentation"
        ) {
          this.catOneName = "Commerces";
        } else {
          this.catOneName = this.catOne[0].options.optionName;
        }
      } else {
        this.catOneName = null;
      }
      this.catTwo.length != 0
        ? (this.catTwoName = this.catTwo[0].options.optionName)
        : null;
      this.catThree.length != 0
        ? (this.catThreeName = this.catThree[0].options.optionName)
        : null;
      this.catFour.length != 0
        ? (this.catFourName = this.catFour[0].options.optionName)
        : null;
      this.catFive.length != 0 ? (this.catFiveName = "Ou sortir?") : null;
    }
  },
  data() {
    return {
      toShow: null,
      results: null,
      group: 0,
      hover: false,
      itemRef: null,
      catOne: [],
      catOneName: null,
      catTwo: [],
      catTwoName: null,
      catThree: [],
      catThreeName: null,
      catFour: [],
      catFourName: null,
      catFive: [],
      catFiveName: null,
      isOpen: true
    };
  }
};
</script>

<style>
.infopannel {
  border-style: solid;
  border-width: 1px;
  margin: 3px !important;
  overflow: hidden !important;
}

.message-body.active {
  background-color: #5db7ec !important;
}

.message-header {
  cursor: pointer;
}

.message-body {
  transition: 0.3s ease all;
}

.div {
  transition: 0.3s ease all;
}

.message.is-primary {
  padding: 1px !important;
}

.message-body {
  padding: 0 !important;
}

.badger-accordion-toggle {
  font-style: bold;
  color: white;
  padding: 1px;
  border: solid white 1px;
}

.badger-toggle-indicator {
  font-style: bold;
  color: white;
  padding: 1px;
}

.subtitle {
  font-size: 0.9rem !important;
}

.badger-accordion-toggle,
.badger-toggle-indicator {
  background-color: #5db7ec !important;
}

.js-badger-accordion-panel-inner {
  max-height: 160px !important;
  overflow: scroll !important;
  overflow-x: hidden !important;
}

.level{
  border: #5db7ec solid 2px;
}
</style>
