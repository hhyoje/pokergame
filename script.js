import Deck from "./deck.js"

//Set-up

const cardSlot1 = document.querySelector(".card-slot-1");
const cardSlot2 = document.querySelector(".card-slot-2");
const cardSlot3 = document.querySelector(".card-slot-3");
const cardSlot4 = document.querySelector(".card-slot-4");
const cardSlot5 = document.querySelector(".card-slot-5");
const message = document.querySelector(".message");
const btn = document.querySelector(".button");
const balance_display = document.querySelector(".balance_display");
message.appendChild(getMessage("Bets will be taken now."));

//Instance variables

let hand = [];
let balance = 100;
let bet = 0;



btn.onclick = function () {
    if (this.innerHTML == "Draw"){
        this.innerHTML = "Analyze";
        
        bet = document.getElementById("bet_amount").value;
        if(bet > balance){
            bet = balance;
        }
        balance -= bet;
        
        const deck = new Deck();
        deck.shuffle();
        hand = [deck.cards[0], deck.cards[1], deck.cards[2], deck.cards[3], deck.cards[4]];
        message.removeChild(message.childNodes[0]);
        cardSlot1.appendChild(hand[0].getHTML());
        cardSlot2.appendChild(hand[1].getHTML());
        cardSlot3.appendChild(hand[2].getHTML());
        cardSlot4.appendChild(hand[3].getHTML());
        cardSlot5.appendChild(hand[4].getHTML());
        message.appendChild(getMessage("-" + bet + " credits"));
    } 
    else if (this.innerHTML == "Analyze"){
        this.innerHTML = "Play Again";

        sort();
        balance_display.innerHTML = "Balance: " + balance + " credits";
        message.removeChild(message.childNodes[0]);

        cardSlot1.appendChild(hand[0].getHTML());
        cardSlot2.appendChild(hand[1].getHTML());
        cardSlot3.appendChild(hand[2].getHTML());
        cardSlot4.appendChild(hand[3].getHTML());
        cardSlot5.appendChild(hand[4].getHTML());
        message.appendChild(getMessage(checkHand()));

        cardSlot1.removeChild(cardSlot1.childNodes[0]);
        cardSlot2.removeChild(cardSlot2.childNodes[0]);
        cardSlot3.removeChild(cardSlot3.childNodes[0]);
        cardSlot4.removeChild(cardSlot4.childNodes[0]);
        cardSlot5.removeChild(cardSlot5.childNodes[0]);
    }
    else {
        this.innerHTML = "Draw";
        balance_display.innerHTML = "Balance: " + balance + " credits";
        message.removeChild(message.childNodes[0]);
        cardSlot1.removeChild(cardSlot1.childNodes[0]);
        cardSlot2.removeChild(cardSlot2.childNodes[0]);
        cardSlot3.removeChild(cardSlot3.childNodes[0]);
        cardSlot4.removeChild(cardSlot4.childNodes[0]);
        cardSlot5.removeChild(cardSlot5.childNodes[0]);
        message.appendChild(getMessage("Bets will be taken now."));

        if(balance <= 0){
            btn.onclick = "false";
            message.removeChild(message.childNodes[0]);
            message.appendChild(getMessage("Balance is 0. Game over."));
        }
    }
};


function getMessage(text){
    const cardDiv = document.createElement('div');
    cardDiv.innerText = text;
    return cardDiv;
}

//Hand Analysis Functions

function checkHand(){
    sort();
    if(checkRoyalFlush() == true){
        balance += 250*bet;
        return "Royal Flush!\n +" + 250*bet + " credits";
    }
    if(checkStraightFlush() == true){
        balance += 50*bet;
        return "Straight Flush!\n +" + 50*bet + " credits";
    }
    if(checkXOfKind(4) == true){
        balance += 25*bet;
        return "Four of a Kind!\n +" + 25*bet + " credits";
    }
    if(checkFullHouse() == true){
        balance += 5*bet;
        return "Full House!\n +" + 5*bet + " credits";
    }
    if(checkFlush() == true){
        balance += 5*bet;
        return "Flush!\n +" + 5*bet + " credits";
    }
    if(checkStraight1() == true || checkStraight2() == true){
        balance += 4*bet;
        return "Straight!\n +" + 4*bet + " credits";
    }
    if(checkXOfKind(3) == true){
        balance += 3*bet;
        return "Three of a Kind!\n +" + 3*bet + " credits";
    }
    if(checkXPair() == 2){
        balance += 2*bet;
        return "Two pairs!\n +" + 2*bet + " credits";           
    }
    if(checkXPair() == 1){
        balance += 1*bet;
        return "One pair!\n +" + bet + " credits";
    }
    if(checkXPair() == 0){
        return "No Pair.\n +0 credits";
    }
    return "Error";
}	

function checkRoyalFlush(){
    if(checkFlush() == true && checkStraight2() == true){
        return true;
    }
    else{
        return false;
    }
}

function checkStraightFlush(){
    let check = false;
    if(checkStraight1() == true && checkFlush() == true){
        check = true;
    }
    if(checkStraight2() == true && checkFlush() == true){
        check = true;
    }
    return check;
}

function checkXOfKind(x){
    let check = false, same = 0;
    for(let i = 0; i < 6 - x; i++){
        for(let j = 0; j < 5; j++){
            if(hand[i].rank == hand[j].rank){
                same++;
            }
        }
        if(same == x){
            check = true;
            break;
        }
        else{
            same = 0;
        }
    }
    return check;
}    

function checkFullHouse(){
    if(checkXOfKind(3) == true && checkXPair() == 1){
        return true;
    }
    else{
        return false;
    }
}

function checkFlush(){
    let check = true;
    for(let i = 0; i < 4; i++){
        if(hand[i].suit != hand[i+1].suit){
            check = false;
            break;
        }
    }
    return check;
}

function checkStraight1(){
    let check = true;
    for(let i = 0; i < 4; i++){
        if(hand[i+1].rank != hand[i].rank + 1){
            check = false;
            break;
        }
    }
    return check;       
}

function checkStraight2(){
    let check = true;
    if(hand[0].rank != 1){
        check = false;
    }
    for(let i = 1; i < 5; i++){
        if(hand[i].rank != (i + 9)){
            check = false;
            break;
        }
    }
    return check;
}

function checkXPair(){
    let pair = 0, same = 0;
    for(let i = 0; i < 5; i++){ 
        for(let j = 0; j < 5; j++){
            if(hand[i].rank == hand[j].rank){
                same++;
            }
        }
        if(same == 2){
            pair++;
        }
        else{
            same = 0;
        }
    }
    if(pair == 2){
        return 2;
    }
    if(pair == 1){
        return 1;
    }
    else{
        return 0;
    }
}

function sort(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4-i; j++){
            if(((hand[j].rank == hand[j+1].rank) &&
            hand[j].suit > hand[j+1].suit) ||
            hand[j].rank > hand[j+1].rank){
                let temp = hand[j];
                hand[j] = hand[j+1];
                hand[j+1] = temp;
            }
        }
    }
}
