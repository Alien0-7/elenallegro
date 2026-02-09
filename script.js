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
  questions: {
    first: {
      text: "Do you like me?",                         // First question
      yesBtn: "Yes",                                   // Yes button text
      noBtn: "No",                                     // No button text
      secretAnswer: "I don't like you, I love you! ❤️" // Hidden message
    },
    second: {
      text: "How much do you love me?",                // Second question
      startText: "This much!",                         // Text before percentage
      nextBtn: "Next ❤️"                               // Next button text
    },
    third: {
      text: "Will you be my Valentine...?",            // Final question
      yesBtn: "Yes!",                                  // Yes button text
      noBtn: "No"                                      // No button text
    }
  },

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

  // ======================
  // Music Settings
  // ======================
  music: {
    enabled: true,                         // Music feature is enabled
    autoplay: true,                        // Try to autoplay
    musicUrl: "YOUR_CLOUDINARY_URL_HERE",  // Music URL
    startText: "🎵 Play Music",            // Start button text
    stopText: "🔇 Stop Music",             // Stop button text
    volume: 0.5                            // Volume (0.0 – 1.0)
  }
};


// -------------------------------------------------------------------------------------

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async () => {
  // Set page title
  document.title = config.pageTitle;

  // Start falling emojis background
  initFallingEmojis();
});


function initFallingEmojis() {
  const container = document.getElementsByClassName("emoji-container")[0];

  const emojis = (config && config.floatingEmojis && config.floatingEmojis.emojis);

  const spawnRate = 250; // ms between spawns
  const maxConcurrent = 50;
  let active = 0;

  const styles = ["fall-center", "fall-left", "fall-right", "fall-spiral"];

  const spawn = () => {
    if (active > maxConcurrent) return;
    active++;
    const e = document.createElement("span");
    e.className = "falling-emoji";
    e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const size = Math.floor(Math.random() * 36) + 18; // 18-54px
    e.style.fontSize = size + "px";
    e.style.left = Math.random() * 100 + "vw";

    // pick a random fall style and optional slow modifier
    const chosen = styles[Math.floor(Math.random() * styles.length)];
    e.classList.add(chosen);
    if (Math.random() < 0.22) e.classList.add('slow');

    let durationNum = Math.random() * 6 + 6; // 6-12s
    if (e.classList.contains('slow')) durationNum *= 1.5;
    e.style.animationDuration = durationNum.toFixed(2) + "s";
    e.style.opacity = (Math.random() * 0.6 + 0.35).toFixed(2);

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