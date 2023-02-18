
const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';
const openaiApiKey = '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';
const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

const openaiEndpointUrl = `${corsProxyUrl}${openaiEndpoint}`;


const prompt = "your mama so fat";
const maxTokens = 60;
const temperature = 0.7;

const toggleBtn = document.getElementById('toggle-btn');
const container = document.querySelector('.container');

toggleBtn.addEventListener('click', function() {
	container.classList.toggle('dark');
	container.classList.toggle('light');
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


const conflit = ["suck", "idiot", "ugly", "useless", "weak", "shut", "asshole", "fucking"]
const rising = ["not", "oh yeah", "shut", "what the hell is this", "are you kidding me?", "I can't believe"]
let lastsaid = ""
let lastsentence = ""

let history = []
let leadingevents = []
let historyvalue = []
let eventsvalue = []


function agro(){
  if(conflit.includes(lastsaid)){
    history.push(lastsentence)
    const toxicity = Math.floor(Math.random() * 4) + 7;
    historyvalue.push(toxicity)
  }

  if(conflit.splice(-1)=="?"){
    leadingevents.push(lastsentence)
    const toxicity = Math.floor(Math.random() * 7);
    eventsvalue.push(toxicity)
  }

  if(rising.includes(lastsaid)){
    leadingevents.push(lastsentence)
    const toxicity = Math.floor(Math.random() * 7);
    eventsvalue.push(toxicity)
  }

  if(rising.includes(lastsentence)){
    leadingevents.push(lastsentence)
    const toxicity = Math.floor(Math.random() * 7);
    eventsvalue.push(toxicity)
  }
}

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
    console.log(history)
    console.log(historyvalue)
    stopRecording();
  }
});

function stopRecording() {
  recognition.stop();
  recordBtn.querySelector("p").innerHTML = "Start Listening";
  recordBtn.classList.remove("recording");
  recording = false;
}