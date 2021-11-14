class Game {
    constructor() {
        this.currentText = "";

        this.coins = 0;
        this.see = false;
        this.plug = false;
        this.admire = false;
        this.sell = false;
        this.talkToasterSell = false;
        this.tooBadSell = false;
        this.tooTooBadSell = false;
        this.tooTooTooBadSell = false;
        this.goBackToHouseMoney = 0;
        this.goBackToHouseWeep = 0;
        this.sorry = false;

        this.update();
        this.changedValue = "none";
        this.admirationPoints = 0;
        this.stage = false;
        this.yum = 0;
        this.rpgStage = 0;
        this.monsters = ["Goblin", "Toaster-thief", "Archer", "Knight", "Mummy", "Zombie", "Big Rat", "Vampire"];
        this.equipment = 0;
        this.level = [1, 1];
        this.currentMonster = {};
        this.coinGain = 0;
        this.kingStage = 0;
    }
    input(inp) {
        window.clickables.deleteAll();this.changedValue = inp;
        switch (inp) {
            case "plug": 
                this.plug = 1;
                this.see = 1;
                break;
            case "sell":
                this.sell = 1;
                this.see = 1;
            case "admire":
                this.admire = 1;
                this.see = 1;
                this.stage = false;
                break;
            case "unplug":
                this.plug = 0;
                break;
            case "goBack":
                this.see = 0;
                this.sorry = 0;
                this.stage = false;
                break;
            case "toast":
                this.stage = "toast"; // stage
                break;
            case "talkToasterSell":
                this.talkToasterSell = 1;
                break;
            case "tooBadSell":
                this.tooBadSell = 1;
                this.coins += 1;
                break;
            case "tooTooBadSell":
                this.tooTooBadSell = 1;
                break;
            case "tooTooTooBadSell":
                this.tooTooTooBadSell = 1;
                break;
            case "goBackToHouseMoney":
                this.goBackToHouseMoney += 1;
                break;
            case "goBackToHouseMoney":
                this.goBackToHouseMoney += 1;
                break;
            case "goBackToHouse":
                break;
            case "sorry":
                this.sorry = 1;
                break;
            case "sellToasterReal":
                this.coins += 1;
                break;
            case "toasterKing":
                this.stage = "toasterKing";this.kingStage = 0;
                break
            case "yum":
                this.yum += 1;
                break;
            case "RPG":
                this.stage = "RPG"; // stage
                break;
            case "rpgHandler":
                this.rpgHandler();
                break;
            case "upgradeSword": 
                if (this.coins >= 4) {
                    this.coins -= 4;
                    this.level[0] += 1;
                }
                this.rpgHandler();
                break;
            case "upgradeShield": 
                if (this.coins >= 4) {
                    this.coins -= 4;
                    this.level[1] += 1;
                }
                this.rpgHandler();
                break;
            case "noUp":
                this.rpgHandler();
                break;
            case "toasterGod1":
                this.kingStage = 1;
                break;
            case "toasterGod2":
                this.kingStage = 2;
                break;
            case "HappyEnding":
                if (this.coins >= 200) {
                    this.kingStage = 4;
                    this.coins -= 200;
                } else {
                    this.kingStage = 3
                }
                break;
            case "SadEnding":
                this.kingStage = 5;
                break;
        }
        this.update();
    }
    clickMinigame() {
        this.admirationPoints++;
        if (this.admirationPoints == 2) {
            this.input("RPG");
            this.rpgStage = 0;
            this.admirationPoints = 0;
        } else {
            this.update();
        }
    }
    rpgHandler() {
        if (this.rpgStage == 0) {
            this.currentMonster = {name:"Big Rat", level: 1, turns: 4};
            this.rpgStage = 1;
        } else if (this.rpgStage == 1) {
            this.currentMonster.turns -= 1;
            if (this.currentMonster.turns == 0) {this.rpgStage = 2;this.coinGain = Math.abs(Math.floor(Math.random()*10)*(this.currentMonster.level));
                this.coins += this.coinGain;}
        } else if (this.rpgStage == 2) {
            this.currentMonster = {
                name:this.monsters[Math.floor(Math.random()*this.monsters.length)], 
                level: this.level[0]-this.level[1]+this.level[1]+this.level[0]+1, 
                turns: (this.level[0]-this.level[1]+this.level[1]+this.level[0]+1)*2+2
            }
            this.rpgStage = 1;
            if (this.coins > 200) this.rpgStage = 99;
        }
    }
    update() {
        if (!this.see && !this.stage) {
            this.currentText = "You see a toaster.";
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Plug it in", function(){window.Game.input("plug")}
            );
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                120, "Sell the toaster", function(){window.Game.input("sell")}
            );
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*4.5/6, window.canvas.width/3-25, 
                120, "Admire your prized toaster", function(){window.Game.input("admire")}
            );
        } else if (this.changedValue == "plug" && this.plug == 1) {
            this.currentText = "You reach out and plug the toaster in.";
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Toast some bread", function(){window.Game.input("toast")}
            );
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                120, "Unplug it", function(){window.Game.input("unplug")}
            );
        } else if (this.changedValue == "sell" && this.sell == 1) {
            this.currentText = '"Sell me? How outrageous."';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "The toaster can talk.", function(){window.Game.input("talkToasterSell")}
            );
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                120, "Too bad. Sell it.", function(){window.Game.input("tooBadSell")}
            );
        } else if (this.changedValue == "admire" && this.admire == 1) {
            this.currentText = "You admire the toaster. It's a good toaster.";
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/2, 
                120, "Click! "+this.admirationPoints+" clicks", function(){window.Game.clickMinigame()}
            );
        } else if (this.changedValue == "unplug" && this.plug == 0) {
            this.currentText = "You unplug the toaster and put it away. You hear a noise.";
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Turn around", function(){window.Game.input("goBack")}
            );
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                120, "Meh", function(){window.Game.input("goBack")}
            );
        } else if (this.talkToasterSell == 1 && this.changedValue == "talkToasterSell") {
            this.currentText = '"I am projecting my thoughts loud enough so you can hear."';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "I don't want to sell this unique toaster", function(){window.Game.input("goBack")}
            );
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                120, "Sell anyways", function(){window.Game.input("tooTooBadSell")}
            );
        } else if (this.tooBadSell == 1 && this.changedValue == "tooBadSell") {
            this.currentText = 'You sold the toaster for 1 coin. It\'s a special coin.';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Return Home", function(){window.Game.input("goBackToHouse")}
            );
        } else if (this.tooTooBadSell == 1 && this.changedValue == "tooTooBadSell") {
            this.currentText = '"Don\'t you want to hear me out first?"';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Sure", function(){window.Game.input("sorry")}
            );
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                120, "Nope, bye", function(){window.Game.input("tooTooTooBadSell")}
            );
        } else if (this.tooTooTooBadSell == 1 && this.changedValue == "tooTooTooBadSell") {
            this.currentText = '"Ok then. Bye" - The toaster ran away.';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Aw, my money", function(){window.Game.input("goBackToHouseMoney")}
            );
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                120, "Weep", function(){window.Game.input("goBackToHouseWeep")}
            );
        } else if (this.changedValue == "goBackToHouseMoney" && this.goBackToHouseMoney > 4) {
            this.currentText = 'You feel something strange...';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "you feel queasy", function(){window.Game.input("toasterKing")}
            );
        } else if (this.changedValue == "goBackToHouseMoney") {
            this.currentText = 'You go back into your house.';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Next", function(){window.Game.input("goBack")}
            );
        } else if (this.changedValue == "goBackToHouseWeep") {
            this.currentText = 'You go back into your house. You cry.';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Next", function(){window.Game.input("goBack")}
            );
        } else if (this.changedValue == "goBackToHouse") {
            this.currentText = 'You return home. You hear a noise.';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Turn around", function(){window.Game.input("goBack")}
            );
        } else if (this.changedValue == "sellToasterReal") {
            this.currentText = 'You return home. You hear a noise.';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Turn around", function(){window.Game.input("goBack")}
            );
        } else if (this.changedValue == "sorry" && this.sorry == 1) {
            this.currentText = 'You talk with the toaster.';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Ok time to sell", function(){window.Game.input("sellToasterReal")}
            );
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                120, "No sell", function(){window.Game.input("goBack")}
            );
        }
        if (this.stage == "toast" && this.yum <= 1) {
            this.currentText = this.changedValue == "yum" ? 'You toast more bread.' : 'You toast some bread.';
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Yum", function(){window.Game.input("yum")}
            );
        } else if (this.stage == "toast" && this.yum >= 2 && this.yum <= 8) {
            this.currentText = "You toast more bread x" + this.yum;
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Yum", function(){window.Game.input("yum")}
            );
        } else if (this.stage == "toast" && this.yum > 8) {
            this.currentText = "You are very full. Why not sell the toaster?";
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                120, "Sure", function(){window.Game.input("goBack")}
            );
            window.clickables.create(
                window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                120, "No", function(){window.Game.input("admire")}
            );
        } else if (this.stage == "RPG") {
            if (this.rpgStage == 0) {
                this.currentText = "You go out hunting with your toaster.";
                window.clickables.create(
                    window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                    120, "Attack a rat", function(){window.Game.input("rpgHandler")}
                );
            } else
            if (this.rpgStage == 1) {
                this.currentText = "There's a "+this.currentMonster.name + " [HP: "+this.currentMonster.turns+", Lvl: "+this.currentMonster.level+"]";
                window.clickables.create(
                    window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                    120, "Attack", function(){window.Game.input("rpgHandler")}
                );
            } else
            if (this.rpgStage == 2) {
                this.currentText = "You got "+this.coinGain+" coins.";
                if (this.coins >= 4) window.clickables.create(
                    window.canvas.width/2, window.canvas.height*2.5/6, window.canvas.width/3-25, 
                    120, "Upgrade Shield (cost 4 coins)", function(){window.Game.input("upgradeShield")}
                );
                if (this.coins >= 4) window.clickables.create(
                    window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                    120, "Upgrade Sword (cost 4 coins)", function(){window.Game.input("upgradeShield")}
                );
                window.clickables.create(
                    window.canvas.width/2, window.canvas.height*4.5/6, window.canvas.width/3-25, 
                    120, "Don't upgrade", function(){window.Game.input("noUp")}
                );
            } else
            if (this.rpgStage == 99) {
                this.currentText = "You lived happily ever after with your toaster.";
                window.clickables.create(
                    window.canvas.width/2, window.canvas.height*4.5/6, window.canvas.width/3-25, 
                    120, "Go back home", function(){window.Game.input("goBack")}
                );
            }
        } else if (this.stage == "toasterKing") {
            if (this.kingStage == 0) {
                this.currentText = "The earth rumbles around you...";
                window.clickables.create(
                    window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                    120, "Oh no, it's the toaster god.", function(){window.Game.input("toasterGod1")}
                );
            } else if (this.kingStage == 1) {
                this.currentText = "You have been a greedy person...";
                window.clickables.create(
                    window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                    120, "What do you want?", function(){window.Game.input("toasterGod2")}
                );
            } else if (this.kingStage == 2) {
                this.currentText = "The toaster god makes you an offer...";
                window.clickables.create(
                    window.canvas.width/2, window.canvas.height*3.5/6, window.canvas.width/3-25, 
                    120, "Pay 200 coins", function(){window.Game.input("HappyEnding")}
                );
                window.clickables.create(
                    window.canvas.width/2, window.canvas.height*4.5/6, window.canvas.width/3-25, 
                    120, "Go to heckTown.", function(){window.Game.input("SadEnding")}
                );
            } else if (this.kingStage == 3) {
                this.currentText = "You don't have 200 coins!";
                window.clickables.create(
                    window.canvas.width/2, window.canvas.height*4.5/6, window.canvas.width/3-25, 
                    120, "Go to heckTown.", function(){window.Game.input("SadEnding")}
                );
            } else if (this.kingStage == 4) {
                this.currentText = "The toaster god departs with peace.";
            } else if (this.kingStage == 5) {
                this.currentText = "You have lied to the toaster god and will explode.";
            }
        }
    }
    draw() {
        window.drawText(this.currentText, window.innerWidth/2, window.innerHeight*1/6, "#AAAAAA", 35, "center");
        if (this.coins > 0) window.drawText("Coins: "+this.coins, window.innerWidth*1/5, window.innerHeight*1/8, "#888888", 35, "left");
        window.clickables.drawButtons();
    }
}

var state = 0;
// 0: in middle of questioning
// 1: in middle of animation
// 2: final stage - boss fight
// 3: click until 100

window.Game = new Game();
