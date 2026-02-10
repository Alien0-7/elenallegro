const config = {
  // ======================
  // Basic Information
  // ======================
  valentineName: "Elena",                    // Your Valentine's name
  pageTitle: "💘",                          // Browser tab title  

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
      textQuestionColor: "#e6081a",
      textQuestionSize: "100px",
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
      textQuestionColor: "#e6081a",
      textQuestionSize: "90px",
      buttons: [
        {
          text: "questo",
          type: "range",
          min: 0,
          max: 10000,
          step: 1,
        },
        {
          text: "prossima domanda",
          type: "submit",
        }
      ],

    },
    /*Third question*/
    {
      text: "Vuoi essere il mio San Valentino?",
      textQuestionColor: "#e6081a",
      textQuestionSize: "80px",
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
    }
  ],

  celebration: {
    emojis:  ["🎁","🤗", "❤️", "💖", "💝", "💗", "💓", "💋", "💕", "😘", "😍" ,"🥰"]
  },


  colors: {
    textCelebrationColor: "#be0010",
    backgroundStart: "#ff96b8",   // Background gradient start
    backgroundEnd: "#f8a1bc",     // Background gradient end
    buttonBackground: "#ff6b6b",  // Button color
    buttonHover: "#ff8787",       // Button hover color
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

// pagina inattiva
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "\u200B";
  } else {
    document.title = config.pageTitle;
  }
});

const answers = [];


document.addEventListener("DOMContentLoaded", () => { 
  let currentQst = 0;
  const form = document.getElementById("question-form");

  // page title
  document.title = config.pageTitle;

  // color background
  document.body.style.background = `linear-gradient(135deg, ${config.colors.backgroundStart}, ${config.colors.backgroundEnd})`;

  renderQuestion(form, currentQst);
  initFallingEmojis(config.floatingEmojis.emojis);


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const answer = confirm("Sicura della risposta?");
    if (!answer) return;

    // salva le risposte
    const valueRange = form.querySelector("p[id='range-value']");
    if (valueRange) {
      answers[currentQst] = valueRange.textContent;
    } else {
      const clicked = document.activeElement;
      if (clicked && clicked.tagName === "BUTTON") {
        answers[currentQst] = clicked.textContent;
      }
    }

    currentQst++;

    if (currentQst < config.questions.length) {
      renderQuestion(form, currentQst);
    } else {
      form.innerHTML = "";

      const emojis = (config.celebration.emojis);
      initFallingEmojis(emojis);

      const title = document.createElement("h3");
      title.textContent = "Complimenti! 🎉";
      title.id = "question";
      title.style.fontSize = "80px";
      title.style.color = config.colors.textCelebrationColor;
      title.style.textShadow = `
        0 0 2px #fff,
        0 0 4px #fff,
        0 0 6px #fff
      `;


      const message = document.createElement("p");
      message.style.fontSize = "22px";
      message.style.fontWeight = "bold";
      message.style.textShadow = `
        0 0 2px #fff,
        0 0 4px #fff,
        0 0 6px #fff
      `;

      message.textContent = "Hai completato tutte le domande! Ora puoi mandare un'email per confermare le risposte date!";
      message.style.color = config.colors.textCelebrationColor;
      form.appendChild(title);
      form.appendChild(message);

      button = document.createElement("button");
      button.textContent = "Invia email";
      button.style.backgroundColor = config.colors.buttonBackground;
      button.style.marginTop = "5%";
      button.className = "btn";
      button.type = "button";

      button.addEventListener("click", (e) => {
        const email = "eliamorari07@gmail.com";
        const subject = encodeURIComponent("Conferma delle risposte al questionario di San Valentino");
        const body = encodeURIComponent(
          "Gentile Elia Morari,\n" +
          "Le scrivo per confermare che ho completato il questionario dal sito in modo sincero e veritiero. ❤️\n" +
          "Di seguito troverà le mie risposte alle domande:\n\n" +
          "Prima domanda:\nTi piaccio?\nLa tua risposta: \"" + answers[0] + "\"\n" +
          "Seconda domanda:\nQuanto mi ami?\nLa tua risposta: \"" + answers[1] + "\"\n" +
          "Terza domanda:\nVuoi essere il mio San Valentino?\nLa tua risposta: \"" + answers[2] + "\"\n\n" +
          "Resto a disposizione per eventuali chiarimenti e non vedo l'ora di celebrare insieme questo San Valentino. 🎉\n" +
          "Con cordiali saluti,\n" +
          "Il Suo San Valentino.\n" +
          "[AGGIUNGI QUI LA TUA FIRMA PRIMA DI INVIARE]"
        );


        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`,
          "_blank"
        );
      });

      form.appendChild(button);

    }
  });

});



function initFallingEmojis(emojis) {
  const container = document.getElementsByClassName("emoji-container")[0];

  const spawnRate = 150; // ms between spawns
  const maxConcurrent = 60;
  let active = 0;

  const styles = ["fall-center-left", "fall-center-right", "fall-left", "fall-right", "fall-spiral"];

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
  
  let buttonsContainer = document.createElement("div");
  let qstElem = document.createElement("h3");
  qstElem.id = "question";
  qstElem.textContent = qst.text;
  qstElem.style.color = qst.textQuestionColor;
  qstElem.style.fontSize = qst.textQuestionSize;

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
        button.style.backgroundColor = config.colors.buttonBackground;
        button.className = "btn";
        buttonsContainer.appendChild(button);
      } else {
        const input = document.createElement("input");
        input.type = btn.type;
        if (btn.type === "range") input.className = "range-input";
        input.value = btn.text;
        if (btn.min !== undefined) input.min = btn.min;
        if (btn.max !== undefined) input.max = btn.max;
        if (btn.step !== undefined) input.step = btn.step;
        if (btn.min !== undefined) {
          input.value = btn.min;

          const value = document.createElement("p");
          value.textContent = input.value;
          value.style.color = config.textQuestionColor;
          value.id = "range-value";
          value.style.transition = "transform 0.2s";
          buttonsContainer.appendChild(value);

          input.addEventListener("input", async (event) => {
            if (Number(event.target.value) < Number(input.max)) {
              console.log(`Range input: ${event.target.value} < ${input.max}`);
              value.textContent = event.target.value;
              value.className = "";
            } else {
              console.log(`Range input: ${event.target.value} >= ${input.max}`);
              value.textContent = "∞ ❤️";
              value.className = "maxed";
              return;
            }
            const t = event.target.value / input.max;

            const maxScale = 1 + t * 0.8;
            const minScale = 1 - t * 0.2;

            for (let i = 0; i < 3; i++) {
              value.style.transform = `scale(${maxScale})`;
              await wait(150);

              value.style.transform = `scale(${minScale})`;
              await wait(150);

              value.style.transform = "scale(1)";
              await wait(150);
            }
          });
        }
        buttonsContainer.appendChild(input);
      }


    
    console.log(`Rendered button: ${btn.text} (type: ${btn.type})`);
  });
  form.appendChild(buttonsContainer);
}