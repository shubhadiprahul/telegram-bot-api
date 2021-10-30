const express = require('express');
const app = express();
const TelegramBot = require("node-telegram-bot-api");
const token = "2068958444:AAFeZ4dUtkmWmXp8XFK91J7Uwx0qoud1wTA";
const bot = new TelegramBot(token, { polling: true });

const PORT = process.env.PORT ||2021;
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send({"Success": "Welcome! welcome ............Home page"});
})

var calculator = (number_text)=>{
    var user = number_text
        var ListOfElement = [];
        var number = '';
        var opration = '';
        var True = false;
        var ListOfElementop=['**','/','*','-','+']
        var i = 0;
        while (i<user.length){
            if (user[i] == '*' && user[i+1] == '*'){
                opration += user[i];
            }else if ((user[i] == '-' || user[i] == '+' || user[i] == '*' || user[i] == '/') && True){
                opration += user[i]
                ListOfElement.push(parseInt(number));
                ListOfElement.push(opration);
                number ='';
                opration ='';
                True = false;
            }else{
                number += user[i];
                True = true;
            }
            i++
        }
        
        ListOfElement.push(parseInt(number))
        var OprationConditions = false;
        var NewNumber
        while (true){
            if (ListOfElement.length==1){
                break
            }

            var j=0
            while (j < ListOfElementop.length){
                i=0
                while(i<ListOfElement.length){
                    if (ListOfElement[i]== ListOfElementop[j]){
                        break
                    }
                    i++      
                }
                if(i<ListOfElement.length){
                break
                }
                j++;
            }
            var oprator = (ListOfElement[i])
            if(oprator == '/'){
                NewNumber = (ListOfElement[i-1]) / (ListOfElement[i+1])
                OprationConditions = true;
            }else if (oprator == '*' ){
                NewNumber = (ListOfElement[i-1]) * (ListOfElement[i+1])
                OprationConditions = true;
            }else if (oprator == '-' ){
                NewNumber = (ListOfElement[i-1]) - (ListOfElement[i+1])
                OprationConditions = true;
            }else if(oprator == '+' ){
                NewNumber = (ListOfElement[i-1]) + (ListOfElement[i+1])
                OprationConditions = true;
            }
            if (OprationConditions){
                    ListOfElement.splice(i-1,3,Number(NewNumber))
                    OprationConditions = false;
                }
            }
        return ListOfElement[0]
}

number_text_checker = (num) =>{
    let checker_string = "1234567890*-+/"
    let condition = true
    for (let i of num){
        if (!(checker_string.includes(i))){
            condition = false
            break
        }
    }
    return condition
}

const init = (bot) =>{
    bot.on('message', (msg) => {
        let message = msg.text.toString()
        let condition = number_text_checker(message)
        if (condition){
            answer = calculator(message)
            if (isNaN(answer)){
                bot.sendMessage(msg.from.id,"Please send a valid Questions")
            }else{
                bot.sendMessage(msg.from.id, "Your answer is " + answer);
            }

        }else{
            bot.sendMessage(msg.from.id,"enter valid opration")
        }
    })
}
init(bot)

app.listen(PORT, () => {
    console.log(`Server is runnig on PORT ${PORT}: http://localhost:2021/`);
})
