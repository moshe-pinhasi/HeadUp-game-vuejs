<template>
  <div id="app">
    
    <div class="container text-center">

      <div class="row">
        <div class="title">Heads Up!</div>  
      </div>
      
      <br>

      <transition name="slide" mode="out-in">
        <div class="row" v-if="isGameRunning">
          <app-game></app-game>
        </div>
      </transition>

      <transition name="slide" mode="out-in">
        <div class="row summary-container" v-if="!isGameRunning">
            <game-summary v-if="isDirty"></game-summary>
        </div>
      </transition>

      <div class="row" v-if="!isGameRunning">
        <button @click="startGame" class="btn btn-success">Start New Game</button>
      </div>
    </div>

  </div>
</template>

<script>
import Game from './components/Game';
import Summary from './components/Summary'
import {mapActions} from 'vuex';

export default {
  name: 'app',
  components: {
    appGame: Game,
    gameSummary: Summary
  },
  computed: {
      isGameRunning() {
          return this.$store.getters.isGameRunning;
      },
      isDirty () {
        return this.$store.getters.isDirty;
      }
  },
  methods: {
      ...mapActions(['startNewGame']),
      startGame() {
          this.startNewGame();
      }
  }
  
}
</script>

<style lang="scss">

  body {
    font-family: 'Gloria Hallelujah', cursive;
    background: #337ab7;
  }

  .btn {
    min-width: 100px;
    min-height: 50px;
    font-size: 20px;
  }

  .title {
    font-size: 60px;
    margin: 40px 0 0 0;
  }

  .summary-container {
    min-height: 100px;
  }

  .slide-enter-active {
      animation: slide-in 200ms ease-out forwards;
  }

  .slide-leave-active {
      animation: slide-out 200ms ease-out forwards;
  }

  @keyframes slide-in {
      from {
          transform: translateY(-30px);
          opacity: 0;
      }
      to {
          transform: translateY(0);
          opacity: 1;
      }
  }

  @keyframes slide-out {
      from {
          transform: translateY(0);
          opacity: 1;
      }
      to {
          transform: translateY(-30px);
          opacity: 0;
      }
  }
</style>
