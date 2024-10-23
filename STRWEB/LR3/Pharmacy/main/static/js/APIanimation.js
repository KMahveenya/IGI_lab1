function showPosition(position)
{
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.textContent = `Добро пожаловать! Ваше местоположение: Широта: ${lat}, Долгота: ${lon}`;
    
    welcomeMessage.classList.remove("hidden");
    welcomeMessage.classList.add("visible");

    const speech = new SpeechSynthesisUtterance(welcomeMessage.textContent);
    speech.lang = "ru-RU";
    window.speechSynthesis.speak(speech);
}

document.getElementById("getLocationButton").addEventListener("click", () => {navigator.geolocation.getCurrentPosition(showPosition, ()=> {alert('error')})});

const obj = document.getElementById("rect");
const frames = [{
    marginLeft: "0px",  
    borderRadius: "0",   
    transform: "rotate(0deg) scale(2)",
    backgroundColor: "green",
    offset: 0    
},{      
    marginLeft: "150px",
    borderRadius: "15%", 
    transform: "rotate(90deg)",
    backgroundColor: "blue",
    offset: 0.3    
},{      
    marginLeft: "300px",   
    borderRadius: "30%",
    transform: "rotate(180deg)",
    backgroundColor: "red",
    offset: 0.6    
},{      
    marginLeft: "500px",
    borderRadius: "50%", 
    transform: "rotate(360deg) scale(2)",  
    backgroundColor: "green", 
    offset: 1    
}];

const config = {    
    duration: 600,          
    easing: "ease-in-out",
    iterations: Infinity,
    direction: "alternate"
};
const animation = obj.animate(frames, config);
 
document.getElementById("pause").addEventListener("click", () => animation.pause());
document.getElementById("play").addEventListener("click", () => animation.play());
document.getElementById("cancel").addEventListener("click", () => animation.cancel());
document.getElementById("faster").addEventListener("click", () => animation.playbackRate *= 2);
document.getElementById("slower").addEventListener("click", () => animation.playbackRate /= 2);