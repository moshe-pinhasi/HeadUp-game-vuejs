<template>
  <div>
    <h2>Total {{summary.title}}</h2>
    <ul class="list-group">
        <li class="list-group-item" 
            v-for="wordObj in summary.list" 
            :key="wordObj.id"
            :class="{'correct': wordObj.correct, 'skiped': !wordObj.correct}">
            {{wordObj.word}}
        </li>
    </ul>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    computed: {
        summary() {
            const wordsInGame = this.$store.getters.wordsInGame;
            const correctsCount = wordsInGame.filter( item => item.correct).length;
            return {
                title: `${correctsCount} / ${wordsInGame.length}`,
                list: wordsInGame
            };
        }
    }
}
</script>

<style lang="scss" scoped>

    .list-group-item {
        border: none;
        font-size: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: inherit;
    }

    .skiped {
        color: #f0ad4e;
    }

    .correct {
        color: #5cb85c;
    }
</style>