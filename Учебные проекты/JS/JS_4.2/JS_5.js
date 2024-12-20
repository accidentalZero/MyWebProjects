function getRandom(min, max){
    return Math.round(Math.random() * (max - min + 1)) + min;
}

function getCard(){
    let cards = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return cards[getRandom(0, cards.length - 1)];  
}

function getSum(player) {
    let sum = 0;
    let hand = Array.from(Object.values(player));
    let length = hand.length;
    for (let i=0; i < length; i++){
        let card = hand[i];
        if (card!='A'){
            if (card=='J' || card=='Q' || card=='K'){
                sum = sum+10;
            } else {
                sum = sum + parseInt(card);
            }
        }
    }
    for (let i=0; i<hand.lenght;i++){
        let card = hand[i];
        if (card == 'A'){
            if (sum>10){
                sum++;
            } else{
                sum=sum+11;
            }
        }
    }
    return sum;
}

var sum = 0;
var dealer = [getCard()];
const player = [getCard(), getCard()];
var answer = '';

function getStatus() {
    return 'Дилер: ' + dealer.join(' ') + ' Игрок ' + player.join(' ') + '.';
}

do {
    answer = prompt(getStatus()+'Хотите еще карту? 1-да, иначе-нет');
    if (answer =='1'){
        player.push(getCard());
        sum = getSum(player);
        if (sum>21){
            console.log('Перебор' + getStatus());
            break;
        } else if (sum==21) {
            console.log('BlackJack!' + getStatus());
            break;
        }
    }
    console.log(getStatus() + ' Сумма ' + getSum(player));
} while(answer == '1');


console.log('Текущая сумма карт у игрока: ' + getSum(player));

