const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.on("ReceiveMessage", (user, message) => {
    var myDate = new Date();
    var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    var fullDate = myDate.getDate() + " " + months[myDate.getMonth()] +
        " " + myDate.getFullYear() + ", " + days[myDate.getDay()];
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();

    const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const encodedMsg = fullDate + " "+ hour +
        ":" + minute + ":" + second+" "+ user + " -  написал  : " + msg;
    const li = document.createElement("li");
    //localStorage.setItem("message", encodedMsg)
    li.textContent = /*localStorage.getItem("message")*/encodedMsg;  /*проверял хранение на стороне клиента*/
    document.getElementById("messagesList").appendChild(li);
});

connection.start().catch(err => console.error(err.toString()));

document.getElementById("sendButton").addEventListener("click", event => {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
    event.preventDefault();
});