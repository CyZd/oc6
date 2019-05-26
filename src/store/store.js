import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  globalResults: [],
  globalPoints: [],
  layerGroup: null,
  circleGroup: null,
  distance: null,
  currentPos: 1
};
const getters = {
  fixedCurrentPos: state => {
    return state.currentPos;
  }
};
const mutations = {
  fixCurrentPos: (state, payload) => {
    state.currentPos = payload;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations
});
