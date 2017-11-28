<template>
  <div>
    <div v-if="isGameRunning">

        <div class="row word-container">
            <h1 class="current-word">{{currentWord}}</h1>
            <app-timer></app-timer>
        </div>

        <div class="row">
            <button @click="skip" class="btn btn-warning">Skip</button>
            <button @click="correct" class="btn btn-success">Correct</button>
        </div>
    </div>
  </div>
</template>

<script>
import Timer from './Timer'
import {mapActions} from 'vuex';

export default {
    components: {
        appTimer: Timer
    },
    computed: {
        currentWord() {
            return this.$store.getters.currentWord;
        },
        isGameRunning() {
            return this.$store.getters.isGameRunning;
        }
    },
    methods: {
        ...mapActions(['correctWord', 'skipWord']),
        correct() {
            this.correctWord();
        },
        skip() {
            this.skipWord();       
        }
    }
}
</script>

<style lang="scss" scoped>

    .btn {
        min-width: 100px;
        min-height: 50px;
        font-size: 20px;
    }

    .word-container {
        font-family: 'Source Sans Pro', sans-serif;
        margin: 0 0 20px 0;
    }

    .current-word {
        color: #fff;  
    }
</style>