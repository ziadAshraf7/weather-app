  //"https://api.github.com/users/OsamaElzero/repos"


  // wether app
 //const code = '0ebf0e29926cc939f557a936228e1129';
   const code = '3c4b55d494cc8c577a80d5229feaadf0'


fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=55&lon=40&exclude=alerts&appid=${code}`)
.then((res) => console.log(res.json()))


function getweatherdata(){
   
    navigator.geolocation.getCurrentPosition((response)=>{
       

      let   lat =   response.coords.latitude
      let   lon  =  response.coords.longitude
        fetchURL(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&appid=${code}`) 
        getCurrentcity(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${code}`)    
        }
        ,(error) =>{
            document.body.classList.add("scale")
            document.querySelector(".search-result .close-icon").remove()
        })
}


function fetchURL(url){
    return fetch(url).then(
        (res) => res.json()
    ).then(
     (res) => { 
    document.querySelector(".date-time .currentTime").innerHTML = window.moment(res.current.dt * 1000).format("h:mm")
    document.querySelector(".date").innerHTML  = window.moment(res.current.dt * 1000).format('a')
    document.querySelector(".date-time .timezone").innerHTML = res.timezone       
    document.querySelector(".weather-temp .icon img").src = `icons/${res.current.weather[0].icon}.png`
    document.querySelector(".weather-temp .temp h1").innerHTML = Math.floor(res.current.temp - 273) + "<sup>o</sup> <sub>c</sub>"
    document.querySelector(".weather-prob .weather-description span").innerHTML = res.current.weather[0].description    
    document.querySelector(".weather-prob .min-temp span").innerHTML = Math.floor(res.daily[0].temp.min - 273) + "<sup>o</sup>"
    document.querySelector(".weather-prob .max-temp span").innerHTML = Math.floor(res.daily[0].temp.max - 273) + "<sup>o</sup>"    
    document.querySelector(".weather-prob .sunrise span").innerHTML = window.moment(res.daily[0].sunrise * 1000).format('h:mm a')
    document.querySelector(".weather-prob .sunset span").innerHTML = window.moment(res.daily[0].sunset * 1000).format('h:mm a')
    document.querySelector(".weather-prob .visibility span").innerHTML = res.current.visibility
    document.querySelector(".weather-prob .humidity span").innerHTML = res.current.humidity
    document.querySelector(".weather-prob .wind span").innerHTML = res.current.wind_speed
    document.querySelector(".weather-prob .pressure span").innerHTML = res.current.pressure
    coverpic(document.querySelector(".weather-temp .icon img").src)
    for(let i = 0 ; i<= 7 ; i++){
document.querySelectorAll(".slider .wrapper .content > h1")[i].innerHTML = window.moment(res.daily[i].dt * 1000).format("dddd")   
document.querySelectorAll(".slider .wrapper .content > h3")[i].innerHTML = window.moment(res.daily[i].dt * 1000).format("MMM Do YY")   
document.querySelectorAll('.slider .icon img')[i].innerHTML = `icons/${res.daily[i].weather[0].icon}.png`
document.querySelectorAll('.slider .description span')[i].innerHTML = res.daily[i].weather[0].description
document.querySelectorAll('.day span')[i].innerHTML = Math.floor(res.daily[i].temp.day -273) + "<sup>o</sup>"
document.querySelectorAll('.morning span')[i].innerHTML = Math.floor(res.daily[i].temp.morn -273) + "<sup>o</sup>"
document.querySelectorAll('.evening span')[i].innerHTML = Math.floor(res.daily[i].temp.eve -273) + "<sup>o</sup>"
document.querySelectorAll('.night span')[i].innerHTML =Math.floor(res.daily[i].temp.night -273) + "<sup>o</sup>"
}

  for(let i = 0 ; i<=24 ; i++){
      let elem = document.createElement("div")
      elem.classList.add("temp-data")
      document.querySelector(".hourly-forcast .content-wrapper").append(elem)
      elem.innerHTML += `
      <div class=time>${window.moment(res.hourly[i].dt * 1000).format('h:mm a')}</div>
       <div>:</div>
       <div class=temp>${Math.floor(res.hourly[i].temp - 273)} <sup>o</sup></div>
      `
  }

}
     )
}

getweatherdata()


function getCurrentcity(url){

    return fetch(url).then(
        (res) => res.json()
    ).then((res) => {document.querySelector('.weather-temp .place .city').innerHTML = res.name
    document.querySelector('.weather-temp .place .country').innerHTML = res.sys.country
})

}


function coverpic(path){
    if(path.includes("01n") || path.includes("02n") || path.includes("03n") || path.includes("04n") || path.includes("09n") || path.includes("10n") || path.includes("13n")){
        document.querySelector(".cover-img img").src = "img/kym-mackinnon-HmzdWOgWVYE-unsplash.jpg"
        document.body.classList.add("change")
    }

    if(path.includes("01d") || path.includes("02d") || path.includes("03d") || path.includes("04d") || path.includes("09d") || path.includes("10d") || path.includes("13d")){
        document.querySelector(".cover-img img").src = "img/dallas-reedy-NEJFAS1Okho-unsplash.jpg"
    }
}


fetch(`http://api.openweathermap.org/data/2.5/weather?q=banha&appid=${code}`)
.then(
    (res) => console.log(res.json()))


function getweatherbyregion(){
 let city =  document.querySelector(".search-bar input").value

if(!city){
    return null
}

 fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${code}`)
 .then(
     (res) => res.json()
 ).then(
     (res) =>{
        document.querySelector(".search-result .content-wrapper .timezone .current").innerHTML = window.moment(res.dt * 1000).format("h:mm a")
        document.querySelector(".search-result   .city").innerHTML = res.name + "/"      
        document.querySelector(".search-result   .country").innerHTML = res.sys.country 
        document.querySelector(".search-result .place  .city").innerHTML = res.name       
        document.querySelector(".search-result .place  .country").innerHTML = res.sys.country       
        document.querySelector(".search-result .weather .icon img").src = `icons/${res.weather[0].icon}.png`
        document.querySelector(".search-result .weather .temp h1").innerHTML = Math.floor(res.main.temp - 273) + "<sup>o</sup> <sub>c</sub>"
        document.querySelector(".search-result .weather-description span").innerHTML = res.weather[0].description    
        document.querySelector(".search-result .min-temp span").innerHTML = Math.floor(res.main.temp_min - 273) + "<sup>o</sup>"
        document.querySelector(".search-result .max-temp span").innerHTML = Math.floor(res.main.temp_max - 273) + "<sup>o</sup>"    
        document.querySelector(".search-result .sunrise span").innerHTML = window.moment(res.sys.sunrise * 1000).format('h:mm a')
        document.querySelector(".search-result .sunset span").innerHTML = window.moment(res.sys.sunset * 1000).format('h:mm a')
        document.querySelector(".search-result .visibility span").innerHTML = res.visibility
        document.querySelector(".search-result .humidity span").innerHTML = res.main.humidity
        document.querySelector(".search-result .wind span").innerHTML = res.wind.speed
        document.querySelector(".search-result .pressure span").innerHTML = res.main.pressure
     }
 ).catch((error) => {
     alert("please enter a valid city name")
 })
}
    

document.querySelector(".search-bar input").addEventListener("change" , function(){
    getweatherbyregion()
})

// end weather app


// perfomace

let closeBtn = document.querySelector('.search-result .close-icon')
let searchBtn = document.querySelector(".btn input")

searchBtn.addEventListener("click" ,function(){
   document.body.classList.add("scale")
})
closeBtn.addEventListener("click" ,function(){
    document.body.classList.remove("scale")
})

// end


// slider



let rightBtn = document.querySelector(" .right-btn")
let leftBtn = document.querySelector(" .left-btn")
let slider = document.querySelector(".slider .wrapper")
let card = document.querySelector(".slider .wrapper .content")

    let position = 0 
    function right(){
        
        if(position >= 1096){
           return false
        }else{
        position += document.querySelector(".slider .wrapper .content").clientWidth + 10 
        slider.style.marginLeft = -position + "px"  
        }
    }

   rightBtn.onclick = function(){
       return right()
   }

   leftBtn.onclick = function(){
    return left()
}

    function left(){
        if(position <= 0){
           return false
        }else{
            position -= document.querySelector(".slider .wrapper .content").clientWidth + 10
        slider.style.marginLeft = -position + "px"
        
        }
    }   

//end

let codee = '-Ss6mTNuKu5oXBJANUOVDiuGqBMx0u36GpAcZAlJ8mo'

