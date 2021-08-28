function getRandomValue(min ,max){
    return Math.floor(Math.random()*(max-min))+min;
}

const app =Vue.createApp({
    data(){
        return {
            playerHealth:100,
            monsterHealth:100,
            currentRound:0,
            winner:null,
            logMessages:[]
        };
    },
    computed:{
        monsterBarStyles(){
            if(this.monsterHealth<0)
            {
                return{ width:'0%'};
            }
            return {width: this.monsterHealth+'%'};
        },
        playerBarStyles(){
            if(this.playerHealth<0)
            {
                return{ width:'0%'};
            }
            return {width: this.playerHealth+'%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !==0;
        }
    },
    watch:{
        playerHealth(value){
            if(value<=0 && this.monsterHealth<=0)
            {
                //draw
                this.winner='draw';
            }
            else if( value <=0){
                //player value
                this.winner='monster';
            }
        },
        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0)
            {
                //draw
                this.winner='draw';
            }
            else if( value <=0){
                //monster value
                this.winner='player';
            }
        }
    },
    methods: {
        attackMonster(){
            this.currentRound++;
            const attackvalue = getRandomValue(5,12);
           // this.monsterHealth = this.monsterHealth-attackvalue;
           this.monsterHealth -= attackvalue;
           this.addLogMessage('player','attack',attackvalue);
           this.attackPlayer();
        },
        attackPlayer(){
            const attackvalue = getRandomValue(8,15);
            // this.monsterHealth = this.monsterHealth-attackvalue;
            this.playerHealth -= attackvalue;
            this.addLogMessage('Radhe','attack',attackvalue);

        },
        specialAttackMonster(){
            this.currentRound++;
            const attackvalue=getRandomValue(10,25);
            this.monsterHealth-=attackvalue;
            this.addLogMessage('player','attack',attackvalue);

            this.attackPlayer();
        },
        healPlayer(){
            const healValue=getRandomValue(8,20);
            if(this.playerHealth+healValue>100){
                this.playerHealth=100;
            }
            else{
                this.playerHealth+=healValue;
            }
            this.addLogMessage('player','heal',healValue);

            this.attackPlayer();
        },
        startGame(){
            this.playerHealth=100;
            this.monsterHealth=100;
            this.winner=null;
            this.currentRound=0;
            this.logMessages =[];
        },
        surrender(){
            this.winner='monster';
        },
        addLogMessage(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            });
        }
    }
});
app.mount("#game");