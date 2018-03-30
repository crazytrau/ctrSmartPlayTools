var X1X1 = 6961; // type of equip just 3x3 grid
"use strict";
class player{
    constructor(playerId, type, devices) {
        this.playerId = playerId || 'player';
        // type of equip
        this.type = type || X1X1;
        this.devices = devices || ['ctr_1'];
    }
    getPlayerId(){
        return this.payerId;
    }
    getPlayerType(){
        return this.type;
    } 
    getPlayerDevices(){
        return this.devices;
    }
}

class game {
    constructor(type, arr) {
        this.name = 'game';
        this.type = type;
        this.players = {};
    }
    // send to 1 equip
    send2AEquip(iPlayer,iDevice, iLed, state){
        var msg = { "deviceId":this.players[iPlayer].devices[iDevice], 
                    "iLed":iLed,
                    "state":state}; 
        //update device
        io.sockets.emit('send2AEquip', JSON.stringify(msg));
    }
    send2AllEquip(iPlayer,iDevice, arrLed, arrState){
        var msg = { "deviceId":this.players[iPlayer].devices[iDevice], 
                    "arrLed":arrLed,
                    "arrState":arrState}; 
        //update device
        io.sockets.emit('send2AllEquip', JSON.stringify(msg));
    }
    
    addPlayer(player){
        if (player.type == this.type){
            this.players.push(player);
            return True;
        }
        return False;
    }
}
class clickButton extends game {
  constructor() {
    super(X1X1, length);
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }

  set area(value) {
    this.area = value;
  }

  asd(a){
    console.log(a)
  }
}

player = new player('user1')
console.log(player)