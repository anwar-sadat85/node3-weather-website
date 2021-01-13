
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = ''
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }else{
            console.log(data);
            messageOne.textContent = `You searched for ${data.location}`
            messageTwo.textContent = `The temperature is ${data.temperature}  and it feels like ${data.feelslike}`
        }
    })
})
})