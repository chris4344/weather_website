console.log('hello world')


const input = document.querySelector('form')
const search = document.querySelector('input')
var loc = document.querySelector('#location')
var forecast = document.querySelector('#forecast')
input.addEventListener('submit', (e) => {
    e.preventDefault()
    loc.style.color = 'black'
    loc.textContent = 'loading ...'
    forecast.textContent = ''

    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                loc.style.color = 'red'
                loc.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                loc.textContent = data.location
                forecast.textContent = data.forecast
            }
        })
    })

})