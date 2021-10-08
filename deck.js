const SUITS = [1, 2, 3, 4]
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export default class Deck {
	constructor (cards = freshDeck()){
        this.cards = cards;
    }	
	
	shuffle(){
        let a, b;
        for(let i = 0; i < 52; i++){
            b = Math.floor(Math.random() * (i+1));
            a = this.cards[i];
            this.cards[i] = this.cards[b];
            this.cards[b] = a;
        }
	}
}

class Card {
	constructor (suit, rank){
		this.suit = suit;
        this.rank = rank;
	}
    
    get color(){
        return this.suit % 2 ? "red" : "black";
    }

    toCard(){
        return this.rankCard() + this.suitCard();
    }

    getHTML(){
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.toCard();
        cardDiv.classList.add("card", this.color);
        return cardDiv;
    }
    
    suitCard(){
        switch(this.suit){
            case 1:
                return '♦';
            case 2:
                return '♣';
            case 3:
                return '♥';
            case 4:
                return '♠';
            default:
                return this.suit;
        }
    }

    rankCard(){
        switch(this.rank){
            case 1:
                return 'A';
            case 11:
                return 'J';
            case 12:
                return 'Q';
            case 13:
                return 'K';
            default:
                return this.rank;
        }
    }
}

function freshDeck(){
    return SUITS.flatMap(suit => {
        return RANKS.map(rank => {
            return new Card(suit, rank)
        })
    })
}
