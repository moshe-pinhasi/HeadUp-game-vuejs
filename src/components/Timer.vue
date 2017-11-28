<template>
  
  <h4>{{time}}</h4>
  
</template>

<<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            time: ''
        }
    },
    created() {
        let sec = 60;

        const setTime = () => this.time = "00:" + (sec < 10 ? ("0" + sec) : sec);
        const intervalId = setInterval( () => {
            sec--;
            setTime();

            if (sec <= 0) {
                clearInterval(intervalId);
                this.gameOver();
            }
        }, 1000);

        setTime();
    },
    methods: {
        ...mapActions(['gameOver']),
    }
}
</script>

<style scoped>
    h4 {
        color: #ccc;
        opacity: 0.4;
    }
</style>
