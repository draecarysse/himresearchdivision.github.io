/*
 * HEAVENLY IRREGULARITY MONITORING
 * Terminal boot sequence + password gate logic
 */

document.addEventListener("DOMContentLoaded", function () {

  var audioControl = document.querySelector(".audio-control");
  var audioToggle = document.querySelector(".audio-toggle");
  var audioStatus = document.querySelector(".audio-status");
  var audioContext = null;
  var ambientTrack = null;
  var soundEnabled = false;
  var lastKeySound = 0;

  function setAudioStatus(message) {
    if (audioStatus) audioStatus.textContent = message;
  }

  function getAudioContext() {
    if (!audioContext) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioContext = new AudioContextClass();
    }
    return audioContext;
  }

  function playTone(frequency, duration, type, volume) {
    var context = getAudioContext();
    if (!context || !soundEnabled) return;

    var oscillator = context.createOscillator();
    var gain = context.createGain();
    var startTime = context.currentTime;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }

  function playAccessTone() {
    playTone(440, 0.12, "square", 0.035);
    window.setTimeout(function () {
      playTone(660, 0.18, "square", 0.035);
    }, 90);
  }

  function enableAudio() {
    var context = getAudioContext();
    if (context && context.state === "suspended") context.resume();

    soundEnabled = true;
    if (audioToggle) {
      audioToggle.textContent = "AUDIO: ON";
      audioToggle.setAttribute("aria-pressed", "true");
    }

    if (!ambientTrack && audioControl) {
      ambientTrack = new Audio(audioControl.getAttribute("data-audio-track"));
      ambientTrack.loop = true;
      ambientTrack.volume = 0.12;
      ambientTrack.addEventListener("error", function () {
        setAudioStatus("EFFECTS ON // AMBIENT TRACK UNAVAILABLE");
      });
    }

    if (ambientTrack) {
      ambientTrack.play().then(function () {
        setAudioStatus("AMBIENT AUDIO ON");
      }).catch(function () {
        setAudioStatus("EFFECTS ON // AUDIO BLOCKED");
      });
    }

    playTone(330, 0.08, "square", 0.025);
  }

  function disableAudio() {
    soundEnabled = false;
    if (ambientTrack) ambientTrack.pause();
    if (audioToggle) {
      audioToggle.textContent = "AUDIO: OFF";
      audioToggle.setAttribute("aria-pressed", "false");
    }
    setAudioStatus("SOUND SYSTEM STANDBY");
  }

  if (audioToggle) {
    audioToggle.addEventListener("click", function () {
      if (soundEnabled) disableAudio();
      else enableAudio();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!soundEnabled || event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    var now = Date.now();
    if (now - lastKeySound < 35) return;
    lastKeySound = now;
    playTone(event.key === "Enter" ? 260 : 180, 0.035, "square", 0.018);
  });

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!(target instanceof Element) || !soundEnabled || target.closest(".audio-toggle")) return;
    if (target.closest("button, a")) playTone(220, 0.045, "square", 0.02);
  });

  /* =====================================================
     BOOT SEQUENCE (only on pages with boot elements)
     ===================================================== */

  var bootSequence = document.getElementById("boot-sequence");
  var archiveInterface = document.getElementById("archive-interface");

  var typingSpeed = 45;
  var pauseAfterLine = 700;
  var pauseAfterBoot = 1200;

  function typeLine(element, text) {
    return new Promise(function (resolve) {
      var index = 0;
      element.classList.add("active");

      var cursor = document.createElement("span");
      cursor.className = "typing-cursor";
      cursor.textContent = "\u2588";
      element.appendChild(cursor);

      function typeCharacter() {
        if (index < text.length) {
          cursor.insertAdjacentText("beforebegin", text.charAt(index));
          index++;
          var variation = Math.floor(Math.random() * 30);
          setTimeout(typeCharacter, typingSpeed + variation);
        } else {
          cursor.remove();
          setTimeout(resolve, pauseAfterLine);
        }
      }

      typeCharacter();
    });
  }

  if (bootSequence && archiveInterface) {
    var terminalLines = bootSequence.querySelectorAll(".terminal-line");

    async function startBootSequence() {
      terminalLines.forEach(function (line) {
        line.textContent = "";
        line.classList.remove("active");
      });

      for (var i = 0; i < terminalLines.length; i++) {
        var text = terminalLines[i].getAttribute("data-text");
        await typeLine(terminalLines[i], text);
      }

      await new Promise(function (resolve) {
        setTimeout(resolve, pauseAfterBoot);
      });

      bootSequence.classList.add("boot-complete");
      archiveInterface.classList.remove("hidden");
      archiveInterface.classList.add("interface-loaded");

      setTimeout(function () {
        archiveInterface.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }

    startBootSequence();
  }

  /* =====================================================
     PASSWORD GATE 1 — Home page
     Answer: MORNINGSTAR
     On success → redirect to morning-star file
     ===================================================== */

  var gate1 = document.getElementById("password-gate-1");
  if (gate1) {
    var input1 = gate1.querySelector(".password-gate__input");
    var btn1 = gate1.querySelector(".password-gate__btn");
    var msg1 = gate1.querySelector(".password-gate__msg");

    function check1() {
      var val = (input1.value || "").trim().toLowerCase().replace(/\s+/g, "");
      if (val === "morningstar") {
        playAccessTone();
        msg1.textContent = "> ACCESS GRANTED. REDIRECTING TO ARCHIVE 01...";
        msg1.className = "password-gate__msg password-gate__msg--ok";
        setTimeout(function () {
          window.location.href = btn1.getAttribute("data-redirect") ||
            "files/morning-star.html";
        }, 2500);
      } else {
        msg1.textContent = "> ACCESS DENIED. INVALID CREDENTIALS.";
        msg1.className = "password-gate__msg password-gate__msg--err";
      }
    }

    btn1.addEventListener("click", check1);
    input1.addEventListener("keydown", function (e) {
      if (e.key === "Enter") check1();
    });
  }

  /* =====================================================
     PASSWORD GATE 2 — Morning Star page
     Answer: ACENTIPEDEANGEL
     On success → reveal gate 3
     ===================================================== */

  var gate2 = document.getElementById("password-gate-2");
  if (gate2) {
    var input2 = gate2.querySelector(".password-gate__input");
    var btn2 = gate2.querySelector(".password-gate__btn");
    var msg2 = gate2.querySelector(".password-gate__msg");
    var gate3 = document.getElementById("gate-3-reveal");

    function check2() {
      var val = (input2.value || "").trim().toLowerCase();
      if (val === "acentipedeangel") {
        playAccessTone();
        msg2.textContent = "> ACCESS GRANTED. DECRYPTION LAYER 2 UNLOCKED.";
        msg2.className = "password-gate__msg password-gate__msg--ok";
        if (gate3) {
          gate3.classList.add("is-visible");
          gate3.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        msg2.textContent = "> ACCESS DENIED. INVALID CIPHER KEY.";
        msg2.className = "password-gate__msg password-gate__msg--err";
        if (gate3) gate3.classList.remove("is-visible");
      }
    }

    btn2.addEventListener("click", check2);
    input2.addEventListener("keydown", function (e) {
      if (e.key === "Enter") check2();
    });
  }

  /* =====================================================
     PASSWORD GATE 3 — Morning Star page (final)
     Answer: 15102026
     On success → reveal Twitter unlock link
     ===================================================== */

  var gate3form = document.getElementById("password-gate-3");
  if (gate3form) {
    var input3 = gate3form.querySelector(".password-gate__input");
    var btn3 = gate3form.querySelector(".password-gate__btn");
    var msg3 = gate3form.querySelector(".password-gate__msg");
    var unlock3 = document.getElementById("twitter-unlock");

    function check3() {
      var val = (input3.value || "").trim().toLowerCase();
      if (val === "15102026") {
        playAccessTone();
        msg3.textContent = "> ACCESS GRANTED. FINAL DECRYPTION COMPLETE.";
        msg3.className = "password-gate__msg password-gate__msg--ok";
        if (unlock3) {
          unlock3.classList.add("is-visible");
          unlock3.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        msg3.textContent = "> ACCESS DENIED. FINAL KEY REJECTED.";
        msg3.className = "password-gate__msg password-gate__msg--err";
        if (unlock3) unlock3.classList.remove("is-visible");
      }
    }

    btn3.addEventListener("click", check3);
    input3.addEventListener("keydown", function (e) {
      if (e.key === "Enter") check3();
    });
  }

});
