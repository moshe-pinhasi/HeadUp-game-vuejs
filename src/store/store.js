import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const LIMIT = 50;
const API = `http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=${LIMIT}&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;

export default new Vuex.Store({
  state: {
    isGameRunning: false,
    wordsList: [],
    wordsInGame: null,
    index: 0,
    isDirty: false
  },
  mutations: {
    'startGame'(state, wordsList) {
      state.isGameRunning = true;
      state.wordsList = wordsList;
      state.wordsInGame = null;
      state.index = 0;
      state.isDirty = true;
    },
    'endGame'(state) {
      state.isGameRunning = false;
      state.wordsInGame = state.wordsList.slice(0, state.index);
    },
    'correctWord'(state) {
      state.wordsList[state.index].correct = true;
      state.index++;
    },
    'skipWord'(state) {
      state.wordsList[state.index].correct = false;
      state.index++;
    }
  },
  actions: {
    startNewGame({commit}) {
      axios.get(API)
      .then(res => {
        commit('startGame', res.data);
      });
    },
    gameOver({commit}) {
      commit('endGame');
    },
    correctWord({commit}) {
      commit('correctWord');
    },
    skipWord({commit}) {
      commit('skipWord');
    }
  },
  getters: {
    isGameRunning: state => state.isGameRunning,
    currentWord: state => {
      if (!state.wordsList[state.index]) {
        return;
      }

      return state.wordsList[state.index].word;
    },
    wordsInGame: state => state.wordsList.slice(0, Math.max(state.index, 1)),
    isDirty: state => state.isDirty
  }
})