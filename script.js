const config = {
  // ======================
  // Basic Information
  // ======================
  valentineName: "Elena",                    // Your Valentine's name
  pageTitle: "💘", // Browser tab title  &#8203;

  // ======================
  // Floating Background Elements
  // ======================
  floatingEmojis: {
    emojis: ["❤️", "💖", "💝", "💗", "💓"] // Heart emojis in background
  },

  // ======================
  // Questions and Buttons
  // ======================
  questions: [
    /*First question*/
    {
      text: "Ti piaccio?",
      buttons: [
        {
          text: "Si",
          type: "submit",
        },
        {
          text: "No",
          type: "submit",
        }
      ],
    },
    /*Second question*/
    {
      text: "Quanto mi ami?",
      buttons: [
        {
          text: "questo",
          type: "range",
        },
        {
          text: "prossima domanda >",
          type: "submit",
        }
      ],
      /*
      text: "How much do you love me?",                // Second question
      startText: "This much!",                         // Text before percentage
      nextBtn: "Next ❤️"                               // Next button text
      */
    },
    /*Third question*/
    {
      text: "Ti piaccio?",
      buttons: [
        {
          text: "Si",
          type: "submit",
        },
        {
          text: "No",
          type: "submit",
        }
      ],
      /*
      text: "Will you be my Valentine...?",            // Final question
      yesBtn: "Yes!",                                  // Yes button text
      noBtn: "No"                                      // No button text
      */
    }
  ],

  // ======================
  // Love Meter Messages
  // ======================
  loveMessages: {
    extreme: "WOOOOW You love me that much?? 🥰🚀💝", // > 5000%
    high: "To infinity and beyond! 🚀💝",             // > 1000%
    normal: "And beyond! 🥰"                          // > 100%
  },

  // ======================
  // Final Celebration
  // ======================
  celebration: {
    title: "Yay! I'm the luckiest person...", // Celebration title
    message: "Now come get your gift...",     // Celebration message
    emojis:  ["🎁","🤗", "❤️", "💖", "💝", "💗", "💓", "💋", "💕", "😘", "😍" ,"🥰"]                  // Celebration emojis
  },

  // ======================
  // Website Colors
  // ======================
  colors: {
    backgroundStart: "#ffafbd",   // Background gradient start
    backgroundEnd: "#ffc3a0",     // Background gradient end
    buttonBackground: "#ff6b6b",  // Button color
    buttonHover: "#ff8787",       // Button hover color
    textColor: "#ff4757"          // Text color
  },

  // ======================
  // Animation Settings
  // ======================
  animations: {
    floatDuration: "15s",   // How long hearts float (10–20s)
    floatDistance: "50px",  // Sideways movement (30–70px)
    bounceSpeed: "0.5s",    // Bounce animation speed (0.3–0.7s)
    heartExplosionSize: 1.5 // Final heart explosion size (1.2–2.0)
  },

};


// -------------------------------------------------------------------------------------

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomInt(min, max, integer = true) {
  let number = Math.random() * (max - min) + min;
  return integer ? Math.floor(number) : number;
}


document.addEventListener("DOMContentLoaded", () => { 
  let currentQst = 0;
  document.title = config.pageTitle;
  
  const form = document.getElementById("question-form");

  renderQuestion(form, currentQst);
  initFallingEmojis();


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    currentQst++;

    if (currentQst < config.questions.length) {
      renderQuestion(form, currentQst);
    } else {
      form.innerHTML = "";
      // fine
    }
  });

      /* Add event listener for button clicks
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        // Handle button actions here (e.g., show next question, update love meter, etc.)
        console.log(`Button clicked: ${btn.text}`);
        
        // For demonstration, let's just move to the next question on any button click
        const nextIndex = index + 1;
        if (nextIndex < config.questions.length) {
          questionElement.textContent = config.questions[nextIndex].text;
          form.innerHTML = "";
          config.questions[nextIndex].buttons.forEach((nextBtn) => {
            const nextButton = document.createElement("button");
            nextButton.type = nextBtn.type === "submit" ? "submit" : "button";
            nextButton.textContent = nextBtn.text;
            nextButton.className = "btn";
            form.appendChild(nextButton);
            
            // Add event listener for next buttons as well
            nextButton.addEventListener("click", (e) => {
              e.preventDefault();
              console.log(`Button clicked: ${nextBtn.text}`);
              // Handle next button actions here
            });
          });
        } else {
          // No more questions, show celebration or final message
          questionElement.textContent = config.celebration.title;
          form.innerHTML = `<p>${config.celebration.message}</p>`;
          // Optionally, trigger a celebration animation here
        }
      });
      */
});





function initFallingEmojis() {
  const container = document.getElementsByClassName("emoji-container")[0];

  const emojis = (config && config.floatingEmojis && config.floatingEmojis.emojis);

  const spawnRate = 150; // ms between spawns
  const maxConcurrent = 60;
  let active = 0;

  const styles = ["fall-center", "fall-left", "fall-right", "fall-spiral"];

  const spawn = () => {
    if (active > maxConcurrent) return;
    
    active++;
    // emoji
    const e = document.createElement("span");
    e.className = "falling-emoji";
    e.textContent = emojis[randomInt(0, emojis.length - 1)];
    const size = randomInt(15, 55);
    e.style.fontSize = size + "px";
    e.style.left = randomInt(0, 100) + "vw"; // offset

    // pick a random fall style and optional slow modifier
    const chosen = styles[randomInt(0, styles.length - 1)];
    e.classList.add(chosen);
    if (randomInt(0, 5) > 4) e.classList.add('slow');

    let durationNum = randomInt(6, 12, false); // 6-12s
    if (e.classList.contains('slow')) durationNum *= 1.5;
    e.style.animationDuration = durationNum.toFixed(2) + "s";
    e.style.opacity = randomInt(0.35, 0.95, false).toFixed(2);

    container.appendChild(e);

    e.addEventListener(
      "animationend",
      () => {
        try { e.remove(); } catch (err) {}
        active = Math.max(0, active - 1);
      },
      { once: true }
    );
  };

  const intervalId = setInterval(spawn, spawnRate);
  container.dataset.emojiInterval = String(intervalId);
}


function renderQuestion(form, currentQst) {
  const qst = config.questions[currentQst];

  let qstElem = document.createElement("h3");
  qstElem.id = "question";
  qstElem.textContent = qst.text;

  form.innerHTML = ""; // clear buttons

  Array.from(form.children).forEach(child => {
    if (child.id !== "question") child.remove();
  });
  form.appendChild(qstElem);


  qst.buttons.forEach(btn => {
      if (btn.type === "submit") {
        const button = document.createElement("button");
        button.type = "submit";
        button.textContent = btn.text;
        button.className = "btn";
        form.appendChild(button);
      } else {
        const input = document.createElement("input");
        input.type = btn.type;
        input.value = btn.text;
        form.appendChild(input);
      }
    
    console.log(`Rendered button: ${btn.text} (type: ${btn.type})`);
  });

}