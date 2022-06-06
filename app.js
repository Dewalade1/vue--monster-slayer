const getRandomVal = ( min, max ) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data () {
        return {
            playerHP: 200,
            monsterHP: 200,
            currentRound: 0,
            winner: null,
        }
    },
    methods: {
        attackMonster () {
            this.currentRound++
            const attackPoints = getRandomVal(5, 12);
            this.monsterHP -= attackPoints;
            this.attackPlayer();
        },
        attackPlayer () {
            const attackPoints = getRandomVal(8, 15);
            this.playerHP -= attackPoints;
        },
        specialAttackMonster () {
            this.currentRound++
            const attackPoints = getRandomVal(10, 25);
            this.monsterHP -= attackPoints;
            this.attackPlayer();
        },
        healPlayer () {
            this.currentRound++;
            const healValue = getRandomVal(8, 20)
            if (this.playerHP + healValue > 200) {
                this.playerHP = 200;
            } else {
                this.playerHP += healValue;
            }
            
            this.attackPlayer();
        }
    },
    computed: {
        monsterHealthBarStyle () {
            return { width: (this.monsterHP / 2) + "%" };
        },
        playerHealthBarStyle () {
            return { width: (this.playerHP / 2) + "%" };
        },
        specialAttackAvailable () {
            return this.currentRound % 3 !== 0 || this.winner
        },
    },
    watch: {
        playerHP (value) {
            if (value <= 0 && this.monsterHP <= 0) {
                this.winner = "draw"
            } else if (value <= 0 ) {
                this.winner = "monster"
            }
        },
        monsterHP (value) {
            if (value <= 0 && this.playerHP <= 0) {
                this.winner = "draw"
            } else if (value <= 0) {
                this.winner = "player"
            }
        }
    }
})

app.mount("#game")