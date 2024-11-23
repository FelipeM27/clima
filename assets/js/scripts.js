let warnning = document.querySelector("#warnning")
let loading = document.querySelector("#loadingGif")
let climaInfo = document.querySelector("#climaInfo")

document.querySelector("form").addEventListener('submit', async (event) => {
    event.preventDefault()
    const input = document.querySelector("#search").value

    if(input) {
        climaInfo.style.display="none"
        loading.style.display="block"

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=efc346268319e164193880dc0216a1ab&units=metric&lang=pt_br`
        let response = await(await fetch(url)).json()
       
        if(response.cod === 200) {
            document.querySelector("#location").innerHTML=`${response.name}`
            document.querySelector("#country").innerHTML=`${response.sys.country}`

            document.querySelector("#tempInfo strong").innerHTML=`${response.main.temp}`
            document.querySelector("#tempInfo strong").innerHTML=`${response.main.temp}`
            document.querySelector("#tempImg img").setAttribute("src", `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`)

            document.querySelector("#windInfo strong").innerHTML=`${response.wind.speed}`
            document.querySelector("#windIcon").style.transform=`rotate(${response.wind.deg}deg)`
            
            climaInfo.style.display="block"
            loading.style.display="none"
            

        } else {
            showWarnning("Cidade não encontrada")
            climaInfo.style.display="none"
            loading.style.display="none"
            setTimeout(()=> {window.location.reload()}, 2000)
        }

    } else {
        window.location.reload()
    }
})

function showWarnning(msg){
    warnning.innerHTML=msg
    warnning.style.display="block"
}
