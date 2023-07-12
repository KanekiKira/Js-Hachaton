//registration
let db = [];

//users logic
let inSystem = '';

function changeInSystemUser(userName = ''){
    inSystem = userName;
    let h3 = document.querySelector('h3');
    inSystem ? h3.innerText = `User: ${inSystem} in system`: h3.innerText = 'No online';
}




function checkUsername(userName){
    return db.some(item => item.name === userName);
}
function checkPassword(pass,passConfirmation){
    return pass === passConfirmation;
}

function createUser(){
    let userName = prompt('Enter username');
    if(checkUsername(userName)){
        alert('User alrady exists');
        return;
    };
    let pass = prompt('Enter password');
    let passConfirm = prompt('Enter password confirmation');
    if(!checkPassword(pass,passConfirm)) {
        alert('Passwords don\'t match!');
        return;
    }
    let age = +prompt('Enter age');
    let userObj = {
        name:userName,
        password:pass,
        age:age,
        isLogin:false,
        sendMessages:[],
        getMessages:[]
    }
    db.push(userObj);
    console.log(db);
}



// LogIn
function getUserObj(userName){
    return db.find(item => item.name === userName);
}

function checkUserPassword(userName,pass){
    let user = getUserObj(userName);
    return user.password === pass;
}

function loginUser(){
    let userName = prompt('Enter username');
    if(!checkUsername(userName)){
        alert('User not found');
        return;
    }
    let pass = prompt('Enter password');
    if(!checkUserPassword(userName,pass)){
        alert('Incorrect Password');
        return;
    }
    let user = getUserObj(userName);
    user.isLogin = true;
    changeInSystemUser(userName);
    console.log(db)
}


//deleting user
function passConfirming(confirmPass,inSystem){
    let user = getUserObj(inSystem);
    return user.password === confirmPass;
}


function deleteUser(){
    if(!inSystem){
        alert('Only authorized users can delete');
        return;
    }
    let desicison = confirm('You really want to delete Accaunt?');
    if(!desicison === true){
        console.log('Thats right my friend');
        return
    }
    let pass = prompt('Confirm password');
    if(!passConfirming(pass,inSystem)){
        alert("Incorrect password");
        return;
    }
    db = db.filter(item => item.password !== pass);
    changeInSystemUser();
    console.log(db);
}



//Send Message 



function messageFunc(){
    if(!inSystem){
        alert('Only authorized users can send message');
        return;
    }
    let user1 = prompt('To whom you want to send a message?');
    if(!checkUsername(user1)){
        alert('User not found');
        return;
    }
    let id = Date.now();

    let message = prompt('Write your message');

    let user = getUserObj(user1);

    let sendUser = getUserObj(inSystem);

    sendUser.sendMessages.push({id:id,title:message,to:user1});
    user.getMessages.push({id:id,title:message,from:inSystem});

    


    console.log(db);
}


//Я не смог додуматься как реализовать код в которым и получатель и отправитель может удалять сделал только это
function deleteMessage() {
    if (!inSystem) {
      alert('Only authorized users can delete messages');
      return;
    }
    let messageId = +prompt('Enter id of deleting message');
    let user = getUserObj(inSystem);
    const sentMessageIndex = user.sendMessages.findIndex(message => message.id === messageId);
    if (sentMessageIndex !== -1){
      user.sendMessages.splice(sentMessageIndex, 1);
      console.log('Sent message deleted');
      console.log(db);
      return;
    }
}
