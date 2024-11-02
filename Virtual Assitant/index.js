let box = document.querySelector(".box");
let btn = document.querySelector(".button");

const speakFunc = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.rate = 1;
    speakInput.pitch = 1;
    speakInput.volume = 1;    
    speakInput.lang = 'en-IN'; 
    window.speechSynthesis.speak(speakInput);
}

window.onload = () => {
    speakFunc("Hello");
    greetingFunc();
}

const greetingFunc = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour < 12) {
        speakFunc("Good morning sir,.. I am your buddy,...., How can I help you!");
    } else if (hour >= 12 && hour < 16) {
        speakFunc("Good afternoon sir,.. I am your buddy,...., How can I help you!");
    } else {
        speakFunc("Good evening sir,.. I am your buddy,.... How can I help you!");
    }
}

let recognition;

const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (e) => {
            console.log('Recognition results:', e.results);
            let spokenText = e.results[0][0].transcript;
            console.log('Spoken text:', spokenText);
            handleCommands(spokenText.toLowerCase());
            box.classList.add("btn-box");
            btn.innerHTML = '<i class="fa-solid fa-microphone-lines-slash"></i>';
            recognition.stop(); // Stop recognition after processing the command
        };

        recognition.onerror = (e) => {
            console.error('Recognition error:', e);
            speakFunc("Sorry, I didn't catch that. Please try again.");
            recognition.stop(); // Stop on error
        };

        recognition.onend = () => {
            console.log('Recognition ended');
            btn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>'; // Reset button
        };

        recognition.start(); // Start listening
    } else {
        alert("Your browser does not support voice input!");
    }
}

btn.onclick = () => {
    box.classList.add("btn-box");
    btn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>';
    startVoiceInput(); // Start voice input when button is clicked
}

const handleCommands = (command) => {
    if (command.includes("hello") || command.includes("hey") || command.includes("hi")) {
        speakFunc("Hello Sir, How can I help you!");
    } else if (command.includes("who are you") || command.includes("developer")) {
        speakFunc("I am a Virtual Assistant, Developed By Suraj Semwal.");
    } else if (command.includes("open google")) {
        speakFunc("Opening Google...");
        window.open("https://www.google.com");
    } else if (command.includes("open instagram")) {
        speakFunc("Opening Instagram...");
        window.open("https://www.instagram.com");
    } else if (command.includes("open facebook")) {
        speakFunc("Opening Facebook...");
        window.open("https://www.facebook.com");
    } else if (command.includes("open youtube")) {
        speakFunc("Opening YouTube...");
        window.open("https://www.youtube.com");
    } else if (command.includes("open chandigarh university")) {
        speakFunc("Opening Chandigarh University...");
        window.open("https://www.cuchd.in");
    } else if (command.includes("tell me about sneha")) {
        speakFunc("She is a very lovable person, but she can be a bit mental. Otherwise, she could be even more beautiful.");
    } else if (command.includes("tell me about muskan mam") || command.includes("muskan mam")) {
        speakFunc("Ohh! Ms. Muskan is your teacher, and she teaches us the subject of web programming. Currently, she is teaching about JavaScript, and she is a lovable person. Now she is listening to me.");
    } else if (command.includes("sing a song")) {
        speakFunc("Sure! Here's a little song for you: 🎵 Twinkle, twinkle, little star, how I wonder what you are! 🎵");
    } else {
        speakFunc(`This is what I found on the internet regarding ${command}.`);
        window.open(`https://www.google.com/search?q=${command}`);
    }
}
