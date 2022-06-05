const getRandomVal = ( min, max ) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data () {
        return {
            playerHP: 200,
            monsterHP: 200
        }
    },
    methods: {
        attackMonster () {
            const attackPoints = getRandomVal(5, 12);
            this.monsterHP -= attackPoints;
            this.attackPlayer();
        },
        attackPlayer () {
            const attackPoints = getRandomVal(8, 15);
            this.playerHP -= attackPoints;
        }
    },
    computed: {
        monsterHealthBarStyle () {
            return { width: (this.monsterHP / 2) + "%" };
        },
        playerHealthBarStyle () {
            return { width: (this.playerHP / 2) + "%" };
        }
    }
})

app.mount("#game")