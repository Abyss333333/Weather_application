



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const location_ = document.querySelector('#Location')
const current= document.querySelector('#Current')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault() // prevent refresh

    const location = searchElement.value

    messageOne.textContent = "Loading.."
    messageTwo.textContent = " "

    fetch ('/weather?address='+ encodeURIComponent(location)).then ((response) =>{
    response.json().then((data)=>{
        if (data.error){
            location_.textContent = ""
            current.textContent = ""
            messageOne.textContent = data.error
            messageTwo.textContent = " "
        }   else{
            location_.textContent = "Location: "
            current.textContent = "Current Forecast: "
            messageOne.textContent = data.location
            messageTwo.textContent =  data.forecast
        }
        
    })
})
})