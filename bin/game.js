var app = require('../app');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

var X1X1 = 6961; // type of equip just 3x3 grid

var ARR_NULL_STATE = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
var ARR_LED = [0,1,2,3,4,5,6,7,8];
var TURN_ON = 1;
var TURN_OFF = 0;
"use strict";
class PLAYER{
    constructor(playerId, type, devices) {
        this.playerId = playerId || 'player';
        // type of equip
        this.type = type || X1X1;
        this.devices = devices || [];
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

class GAME {
    constructor(type) {
        this.name = 'game class';
        this.type = type;
        this.players = [];
        this.maxPlayer=1;
        this.minPlayer=1;
        this.gameId = null;
    }
    // send to 1 equip
    send2AEquip(iPlayer,iDevice, iLed, state){
        var msg = { "deviceId":this.players[iPlayer].devices[iDevice], 
                    "iLed":iLed,
                    "state":state}; 
        console.log(iPlayer, "send2AEquip");
        //update device
        io.sockets.emit('send2AEquip', JSON.stringify(msg));
    }
    sendAll2AEquip(iPlayer,iDevice, arrLed, arrState){
        var msg = { "deviceId":this.players[iPlayer].devices[iDevice], 
                    "arrLed":arrLed,
                    "arrState":arrState}; 
        console.log(iPlayer, "sendAll2AEquip");
        //update device
        io.sockets.emit('sendAll2AEquip', JSON.stringify(msg));
    }
    addPlayer(player){
        if (player.type == this.type && this.players.length < this.maxPlayer){
            // check already in player list
            for (var iPlayer=0; iPlayer < this.players.length;++iPlayer){
                if (player.playerId == this.players[iPlayer].playerId){
                    return false;
                }
            }
            this.players.push(player);
            return true;
        }
        return false;
    }
    checkCanPlay(){
        if (this.players.length >= this.minPlayer){
            //turn off all led on devices of all player
            for (var iPlayer=0;iPlayer<this.players.length;++iPlayer){
                for (var iDevice=0;iDevice<this.players[iPlayer].devices.length;++iDevice){
                    this.sendAll2AEquip(iPlayer, iDevice, ARR_LED, ARR_NULL_STATE);
                }
            }
            return true;
        }else{
            return false;
        }
    }
}
class TICTACTOE extends GAME {
    constructor(gameId) {
        super(X1X1);
        this.name = 'tictactoe class';
        this.grid = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
        this.maxPlayer = 2;
        this.minPlayer = 2;
        this.turn = -1;
        this.gameId = gameId || "asdasd";
    }

    reset(){
        this.grid = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
        this.turn = -1;
    } 
    
    checkWin(socket){
        var arr = this.grid;
        if (  arr[0]==arr[1] && arr[1]==arr[2] && arr[1]!=-1
            || arr[3]==arr[4] && arr[4]==arr[5] && arr[4]!=-1
            ||  arr[6]==arr[7] && arr[7]==arr[8] && arr[7]!=-1
            ||  arr[0]==arr[3] && arr[3]==arr[6] && arr[3]!=-1
            ||  arr[1]==arr[4] && arr[4]==arr[7] && arr[4]!=-1
            ||  arr[2]==arr[5] && arr[5]==arr[8] && arr[5]!=-1
            ||  arr[0]==arr[4] && arr[4]==arr[8] && arr[4]!=-1
            ||  arr[2]==arr[4] && arr[4]==arr[6] && arr[4]!=-1){
                //send to web client
                console.log("checkwin", this.players[this.turn].playerId)
                socket.broadcast.to(this.gameId).emit('winner', this.players[this.turn].playerId);
                return true;
            }
        else{
            return false;
        }
    }

    getIdPlayer(player){
        if (player.playerId){ // is obj
            for (var iPlayer=0;iPlayer<this.players.length;++iPlayer){
                if (player.playerId == this.players[iPlayer].playerId){
                    return iPlayer;
                }
            }
            return -1;
        }
        else{   // is playerId
            for (var iPlayer=0;iPlayer<this.players.length;++iPlayer){
                if (player == this.players[iPlayer].playerId){
                    return iPlayer;
                }
            }
            return -1;
        }
    }
    
    move(iPlayer, iLoc, socket, msg){
        if (this.turn == -1){
            this.turn = iPlayer;
        }
        if (iPlayer == this.turn){
            this.grid[iLoc] = iPlayer
            // send to devices
            //this.send2AEquip(iPlayer, this.players[iPlayer].devices[0],iLoc,TURN_ON);
            //send to web client
            socket.broadcast.to(msg.roomId).emit('move', msg);
            this.checkWin(socket);
            console.log(this.grid)
            this.turn = ++this.turn>1?0:1;
        }
        else{
            console.log('wrong turn')
        }
    }

    moveDevices(iLoc, socket){
    var USER1 = 1;
    if (this.turn == -1){
            this.turn = USER1;
        }
        if (USER1 == this.turn){
            this.grid[iLoc] = USER1
            // send to devices
            //this.send2AEquip(USER1, this.players[USER1].devices[0],iLoc,TURN_ON);
            this.turn = ++this.turn>1?0:1;
            //send to web client
            socket.broadcast.to("asdasd").emit('move', {"playerId": "user1", "iLoc": iLoc, "roomId": "asdasd"});
            this.checkWin(socket);
            console.log(this.grid)
        }
        else{
            console.log('wrong turn')
        }
    }
}

// player1 = new PLAYER('user1');
// player2 = new PLAYER('user2');
// tictactoe = new TICTACTOE();
// tictactoe.addPlayer(player1);
// tictactoe.addPlayer(player2);
// console.log('can play ? ' + tictactoe.checkCanPlay());

// tictactoe.move(tictactoe.getIdPlayer(player1),0);
// console.log(tictactoe.turn);
// console.log('win ? ',tictactoe.checkWin())

// tictactoe.move(tictactoe.getIdPlayer(player2),3);
// console.log(tictactoe.turn);
// console.log('win ? ',tictactoe.checkWin())

// tictactoe.move(tictactoe.getIdPlayer(player1),1);
// console.log(tictactoe.turn);
// console.log('win ? ',tictactoe.checkWin())

// tictactoe.move(tictactoe.getIdPlayer(player2),4);
// console.log(tictactoe.turn);
// console.log('win ? ',tictactoe.checkWin())

// tictactoe.move(tictactoe.getIdPlayer(player1),2);
// console.log(tictactoe.turn);
// console.log('win ? ',tictactoe.checkWin())

// console.log(tictactoe.grid);

module.exports = {
    PLAYER : PLAYER,
    TICTACTOE : TICTACTOE
}