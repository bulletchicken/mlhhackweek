
const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';
const openaiApiKey = '';
const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

const openaiEndpointUrl = `${corsProxyUrl}${openaiEndpoint}`;
/*
const { fstat } = require('fs');
const http = require('http')
const port = 3000


const server = http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'})
  fs.readFile('index.html', function(error, data) {
    if(error){
      res.writeHead(404)
      res.write('Error: File not Found')
    } else{
      res.write(data)
    }
    res.end()
  })
})

server.listen(port, function(error){
  if(error){
    console.log('error')
  } else{
    console.log(port)
  }
})
*/
const prompt = "your mama so fat";
const maxTokens = 60;
const temperature = 0.7;

const toggleBtn = document.getElementById('toggle-btn');
const container = document.querySelector('.container');

const conflit = ["suck", "idiot", "ugly", "useless", "weak", "shut", "up", "asshole", "fucking"]
const rising = ["not", "oh yeah", "what the hell is this", "are you kidding me?", "I can't believe"]
let lastsaid = ""
let lastsentence = ""

let history = []
let leadingevents = []
let historyvalue = []
let eventsvalue = []

let graphsize = 1;


let mode = true;

toggleBtn.addEventListener('click', function() {
  //document.querySelector('.body').classList.toggle('dark')
  container.classList.toggle('dark');
  if(mode){
    document.getElementById('mode').innerHTML = "Roast Defender";
    mode=false;
  }else{
    document.getElementById('mode').innerHTML = "Start Listening";
    mode=true;
  }
  
  
	//container.classList.toggle('dark');
	
});




var xValues = [0];
var yValues = [""];

const myChart = new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    title:{
      display:true,
      text: "toxicity graph"
    },
    tooltips: {
      enabled: true,
      callbacks: {
        title: function(context) {
          return context;
        }
      }
    },
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:10}}],
    }
  }
});

/*
const classificationParameters = {
  model: 'text-davinci-002', // The GPT-3 model to use
  prompt: textToClassify, // The text to classify
  examples: [['Is this a negative statement?', 'Negative']], // Examples for the model to learn from
  search_model: 'ada', // The model used to search for relevant examples
  temperature: 0.5, // The temperature to use when generating responses
  max_examples: 1, // The maximum number of examples to use
  stop: '\n' // The token to use to stop the model from generating more text
};
*/

var angry4 = new Audio('voicelines/University of Toronto - Scarborough 4.m4a')
var angry5 = new Audio('voicelines/University of Toronto - Scarborough 5.m4a')
var angry6 = new Audio('voicelines/University of Toronto - Scarborough 6.m4a')
var angry7 = new Audio('voicelines/University of Toronto - Scarborough 7.m4a')
var angry9 = new Audio('voicelines/University of Toronto - Scarborough 9.m4a')
function call(){
  fetch(openaiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: maxTokens,
      temperature: temperature,
      n: 1,
      stop: '\n'
    })
  })
  .then(response => response.json())
  .then(data => {
    const text = data.choices[0].text.trim();
    console.log(text);
  })
  .catch(error => {
    console.error(error);
  });
}

const recordBtn = document.querySelector(".record"),
  result = document.querySelector(".result"),
  downloadBtn = document.querySelector(".download"),
  inputLanguage = document.querySelector("#language"),
  clearBtn = document.querySelector(".clear");

let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;


let ff = true;


function agro(){
  console.log(xValues);
  ff=false;
  lastsaid = lastsaid.toLowerCase()
  lastsaid.replace(".", "")
  lastsaid = lastsaid.split(".").join("")
  console.log("The last sentence said" + lastsentence)
  console.log(conflit.includes(lastsaid));
  let toxicity = 0;
  if(conflit.includes(lastsaid)){
    history.push(lastsentence)
    toxicity = Math.floor(Math.random() * 4) + 7;
    historyvalue.push(toxicity)
    xValues.push(lastsentence)
    graphsize++;
    yValues.push(toxicity);
    myChart.update();
    console.log('hit');
    ff=true;
  }

  else if(lastsaid.slice(-1)=="?"){
    history.push(lastsentence)
    toxicity = Math.floor(Math.random() * 7);
    eventsvalue.push(toxicity)
    xValues.push(lastsentence)
    graphsize++;
    yValues.push(toxicity);
    myChart.update();
    ff=true;
  }

  else if(rising.includes(lastsaid)){
    history.push(lastsentence)
    toxicity = Math.floor(Math.random() * 7);
    eventsvalue.push(toxicity)
    xValues.push(lastsentence)
    graphsize++;
    yValues.push(toxicity);
    myChart.update();
    ff=true;
  }

  else if(rising.includes(lastsentence)){
    history.push(lastsentence)
    toxicity = Math.floor(Math.random() * 7);
    eventsvalue.push(toxicity)
    xValues.push(lastsentence)
    graphsize++;
    yValues.push(toxicity);
    myChart.update();
    ff=true;
  }

  if(ff&&toxicity>7){
    angry7.play();
  }

  console.log(xValues)
}

/*
const accountSid = 'AC25bd8b77a07f84c7443be0806ad1d857';
const authToken = '1dc47d9a4d08b23b6811a5e2663081c5';

const client = require('twilio')(accountSid, authToken);

sendSMS()

function sendSMS() {
  client.messages
    .create({
       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
       from: '+15017122661',
       to: '+15558675310'
     })
    .then(message => console.log(message.sid));
}
*/


function speechToText() {
  try {
    recognition = new SpeechRecognition();
    recognition.lang = 'en';
    recognition.interimResults = true;
    recordBtn.classList.add("recording");
    recordBtn.querySelector("p").innerHTML = "Listening...";
    recognition.start();



    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      lastsaid = speechResult.split(" ").pop();
      lastsentence = speechResult.split(".").pop();
      agro()


      console.log(event.results[0][0])
      //detect when intrim results
      if (event.results[0].isFinal) {
        result.innerHTML += " " + speechResult;
        result.querySelector("p").remove();
      } else {
        //creative p with class interim if not already there
        if (!document.querySelector(".interim")) {
          const interim = document.createElement("p");
          interim.classList.add("interim");
          result.appendChild(interim);
        }
        //update the interim p with the speech result
        document.querySelector(".interim").innerHTML = " " + speechResult;
      }
    };
    recognition.onspeechend = () => {
      speechToText();
    };
    recognition.onerror = (event) => {
      stopRecording();
      if (event.error === "no-speech") {
        alert("No speech was detected. Stopping...");
      } else if (event.error === "audio-capture") {
        alert(
          "No microphone was found. Ensure that a microphone is installed."
        );
      } else if (event.error === "not-allowed") {
        alert("Permission to use microphone is blocked.");
      } else if (event.error === "aborted") {
        alert("Listening Stopped.");
      } else {
        alert("Error occurred in recognition: " + event.error);
      }
    };
  } catch (error) {
    recording = false;

    console.log(error);
  }
}

recordBtn.addEventListener("click", () => {
  
  if (!recording) {
    //call();
    speechToText();
    recording = true;
  } else {
    stopRecording();
  }
});

function stopRecording() {
  recognition.stop();
  recordBtn.querySelector("p").innerHTML = "Start Listening";
  recordBtn.classList.remove("recording");
  recording = false;
}