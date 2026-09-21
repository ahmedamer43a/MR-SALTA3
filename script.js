/* =====================================================
   MR SALTA3
   STUDY TIMER
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   GET ELEMENTS
===================================================== */

const timerElement =
    document.getElementById("timer");

const modeElement =
    document.getElementById("mode");

const statusElement =
    document.getElementById("status");

const progressBar =
    document.getElementById("progressBar");

const crab =
    document.getElementById("crab");


/* BUTTONS */

const startBtn =
    document.getElementById("startBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const resetBtn =
    document.getElementById("resetBtn");

const themeToggleBtn =
    document.getElementById("themeToggleBtn");

const zenModeBtn =
    document.getElementById("zenModeBtn");

const exitZenBtn =
    document.getElementById("exitZenBtn");

const clearHistoryBtn =
    document.getElementById("clearHistoryBtn");


/* INPUTS */

const studyInput =
    document.getElementById("studyInput");

const shortInput =
    document.getElementById("shortInput");

const longInput =
    document.getElementById("longInput");

const sessionsInput =
    document.getElementById("sessionsInput");

const alarmInput =
    document.getElementById("alarmInput");

const soundSelect =
    document.getElementById("soundSelect");


/* TOGGLES */

const autoBreak =
    document.getElementById("autoBreak");

const autoStudy =
    document.getElementById("autoStudy");

const notifToggle =
    document.getElementById("notifToggle");


/* STATS & HISTORY */

const completedSessions =
    document.getElementById("completedSessions");

const totalStudy =
    document.getElementById("totalStudy");

const historyList =
    document.getElementById("historyList");


/* LANGUAGE */

const enBtn =
    document.getElementById("enBtn");

const arBtn =
    document.getElementById("arBtn");


/* SOUND */

const alarmSound =
    document.getElementById("alarmSound");


/* =====================================================
   TIMER STATE
===================================================== */

let currentPhase = "study";

let remainingSeconds = 25 * 60;

let totalSeconds = 25 * 60;

let timerInterval = null;

let isRunning = false;

let completed = 0;

let totalStudyMinutes = 0;

let currentSession = 0;

let sessionHistory = [];


/* =====================================================
   LANGUAGE
===================================================== */

let currentLanguage = "en";


const translations = {

    en: {

        study:
            "STUDY TIME",

        short:
            "SHORT BREAK",

        long:
            "LONG BREAK",

        ready:
            "Set your time and press Start.",

        studying:
            "Stay focused — you got this!",

        break:
            "Break time. Recharge!",

        finished:
            "Phase complete!",

        paused:
            "Timer paused.",

        waiting:
            "Waiting for you to start.",

        settings:
            "Timer Settings",

        studyMinutes:
            "Study Minutes",

        shortBreak:
            "Short Break",

        longBreak:
            "Long Break",

        sessions:
            "Sessions Before Long Break",

        alarm:
            "Alarm Repetitions",

        soundSelectLabel:
            "Alarm Sound",

        autoBreak:
            "Auto Break",

        autoBreakText:
            "Start breaks automatically",

        autoStudy:
            "Auto Study",

        autoStudyText:
            "Start studying automatically",

        notifTitle:
            "Browser Notifications",

        notifText:
            "Get notified when phase ends",

        completed:
            "Sessions Completed",

        total:
            "Total Study Time",

        historyTitle:
            "Today's Sessions",

        clearHistory:
            "Clear",

        exitZen:
            "✕ Exit Zen Mode",

        tip:
            "Set your times and press Start.",

        start:
            "▶ Start",

        pause:
            "⏸ Pause",

        reset:
            "↻ Reset",

        notifStudyFinishTitle:
            "Study Phase Complete! 🎉",

        notifStudyFinishBody:
            "Great job! Time for a break.",

        notifBreakFinishTitle:
            "Break Finished! 💪",

        notifBreakFinishBody:
            "Ready to focus again? Let's go!"

    },


    ar: {

        study:
            "وقت المذاكرة",

        short:
            "البريك القصير",

        long:
            "اللونج بريك",

        ready:
            "ظبط الوقت واضغط ابدأ.",

        studying:
            "ركز يا بطل — أنت قدها!",

        break:
            "وقت البريك — ريّح دماغك!",

        finished:
            "المرحلة خلصت!",

        paused:
            "التايمر متوقف مؤقتًا.",

        waiting:
            "مستنيك تبدأ.",

        settings:
            "إعدادات التايمر",

        studyMinutes:
            "دقائق المذاكرة",

        shortBreak:
            "البريك القصير",

        longBreak:
            "اللونج بريك",

        sessions:
            "عدد السيشنز قبل اللونج بريك",

        alarm:
            "عدد مرات الرنة",

        soundSelectLabel:
            "صوت التنبيه",

        autoBreak:
            "البريك التلقائي",

        autoBreakText:
            "ابدأ البريك تلقائيًا",

        autoStudy:
            "المذاكرة التلقائية",

        autoStudyText:
            "ابدأ المذاكرة تلقائيًا",

        notifTitle:
            "إشعارات المتصفح",

        notifText:
            "تنبيهك عند انتهاء الوقت",

        completed:
            "السيشنز المكتملة",

        total:
            "إجمالي وقت المذاكرة",

        historyTitle:
            "جلسات اليوم",

        clearHistory:
            "مسح",

        exitZen:
            "✕ الخروج من وضع التركيز",

        tip:
            "ظبط الأوقات واضغط ابدأ.",

        start:
            "▶ ابدأ",

        pause:
            "⏸ إيقاف",

        reset:
            "↻ إعادة ضبط",

        notifStudyFinishTitle:
            "عاش يا بطل! خلصت السيشن 🎉",

        notifStudyFinishBody:
            "وقت البريك جه، ريّح دماغك شوية.",

        notifBreakFinishTitle:
            "البريك خلص! 💪",

        notifBreakFinishBody:
            "جاهز نرجع نركز تاني؟ يلا بينا!"

    }

};


/* =====================================================
   SAFE NUMBER FUNCTION
===================================================== */

function getNumber(input, min, max) {

    let value = parseInt(input.value, 10);

    if (Number.isNaN(value)) {
        value = min;
    }

    value = Math.max(min, value);
    value = Math.min(max, value);

    input.value = value;

    return value;
}


/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secondsLeft).padStart(2, "0")
    );
}


/* =====================================================
   GET CURRENT PHASE DURATION
===================================================== */

function getPhaseDuration() {

    if (currentPhase === "study") {
        return getNumber(studyInput, 1, 180) * 60;
    }

    if (currentPhase === "short") {
        return getNumber(shortInput, 1, 60) * 60;
    }

    return getNumber(longInput, 1, 120) * 60;
}


/* =====================================================
   UPDATE SCREEN
===================================================== */

function updateScreen() {

    timerElement.textContent = formatTime(remainingSeconds);

    modeElement.textContent = translations[currentLanguage][currentPhase];

    completedSessions.textContent = completed;

    totalStudy.textContent = `${totalStudyMinutes}m`;

    let progress = 0;

    if (totalSeconds > 0) {
        progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    }

    progress = Math.max(0, Math.min(100, progress));

    progressBar.style.width = `${progress}%`;

    // Update document title with timer
    document.title = `${formatTime(remainingSeconds)} - MR SALTA3`;
}


/* =====================================================
   LOAD PHASE
===================================================== */

function loadPhase(phase) {

    currentPhase = phase;

    totalSeconds = getPhaseDuration();

    remainingSeconds = totalSeconds;

    updateScreen();
}


/* =====================================================
   SYNTHESIZED SOUND GENERATOR (Fallback Sounds)
===================================================== */

function playSynthesizedSound(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        
        if (type === "digital") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } else if (type === "bell") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1.2);
        }
    } catch (e) {
        console.log("Web Audio API not supported", e);
    }
}


/* =====================================================
   ALARM
===================================================== */

function playAlarm() {

    const repetitions = getNumber(alarmInput, 1, 20);
    const soundType = soundSelect.value;

    let count = 0;

    function playOnce() {

        if (count >= repetitions) {
            return;
        }

        count++;

        if (soundType === "default") {
            alarmSound.currentTime = 0;
            const playPromise = alarmSound.play();

            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log("Audio playback blocked:", error);
                    // Fallback to digital sound if file blocked
                    playSynthesizedSound("digital");
                });
            }

            let waitTime = 1000;
            if (Number.isFinite(alarmSound.duration) && alarmSound.duration > 0) {
                waitTime = (alarmSound.duration * 1000) + 250;
            }

            setTimeout(playOnce, waitTime);
        } else {
            playSynthesizedSound(soundType);
            setTimeout(playOnce, soundType === "bell" ? 1300 : 400);
        }
    }

    playOnce();
}


/* =====================================================
   BROWSER NOTIFICATIONS
===================================================== */

function showNotification(title, body) {
    if (!notifToggle.checked) return;

    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(title, {
            body: body,
            icon: "https://cdn-icons-png.flaticon.com/512/3073/3073992.png"
        });
    }
}

notifToggle.addEventListener("change", function () {
    if (notifToggle.checked) {
        if ("Notification" in window) {
            Notification.requestPermission().then(permission => {
                if (permission !== "granted") {
                    notifToggle.checked = false;
                }
            });
        } else {
            notifToggle.checked = false;
        }
    }
});


/* =====================================================
   CRAB CELEBRATION
===================================================== */

function celebrateCrab() {

    crab.classList.remove("celebrate");

    void crab.offsetWidth; // Force reflow

    crab.classList.add("celebrate");
}


/* =====================================================
   HISTORY MANAGEMENT
===================================================== */

function addHistoryEntry(minutes) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const entry = {
        time: timeString,
        minutes: minutes,
        date: now.toLocaleDateString()
    };

    sessionHistory.unshift(entry);
    saveHistory();
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";

    if (sessionHistory.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "history-item";
        emptyLi.style.justifyContent = "center";
        emptyLi.style.opacity = "0.6";
        emptyLi.textContent = currentLanguage === "ar" ? "لا توجد جلسات اليوم" : "No sessions today";
        historyList.appendChild(emptyLi);
        return;
    }

    sessionHistory.forEach(item => {
        const li = document.createElement("li");
        li.className = "history-item";

        const textSpan = document.createElement("span");
        textSpan.textContent = `${currentLanguage === "ar" ? "جلسة مذاكرة" : "Study Session"} (${item.minutes}m)`;

        const timeSpan = document.createElement("span");
        timeSpan.className = "history-item-time";
        timeSpan.textContent = item.time;

        li.appendChild(textSpan);
        li.appendChild(timeSpan);
        historyList.appendChild(li);
    });
}

function saveHistory() {
    localStorage.setItem("salta3_history", JSON.stringify(sessionHistory));
    localStorage.setItem("salta3_completed", completed);
    localStorage.setItem("salta3_totalMinutes", totalStudyMinutes);
}

function loadHistory() {
    const savedHistory = localStorage.getItem("salta3_history");
    const savedCompleted = localStorage.getItem("salta3_completed");
    const savedTotal = localStorage.getItem("salta3_totalMinutes");

    if (savedHistory) {
        sessionHistory = JSON.parse(savedHistory);
    }
    if (savedCompleted) {
        completed = parseInt(savedCompleted, 10);
    }
    if (savedTotal) {
        totalStudyMinutes = parseInt(savedTotal, 10);
    }

    renderHistory();
}

clearHistoryBtn.addEventListener("click", function () {
    sessionHistory = [];
    completed = 0;
    totalStudyMinutes = 0;
    saveHistory();
    renderHistory();
    updateScreen();
});


/* =====================================================
   FINISH CURRENT PHASE
===================================================== */

function finishPhase() {

    isRunning = false;

    clearInterval(timerInterval);

    timerInterval = null;


    /* Play alarm */
    playAlarm();


    /* Crab animation */
    celebrateCrab();


    /* ================= STUDY FINISHED ================= */

    if (currentPhase === "study") {

        completed++;
        currentSession++;

        const studyMins = getNumber(studyInput, 1, 180);
        totalStudyMinutes += studyMins;

        addHistoryEntry(studyMins);

        const sessionsBeforeLong = getNumber(sessionsInput, 1, 20);

        showNotification(
            translations[currentLanguage].notifStudyFinishTitle,
            translations[currentLanguage].notifStudyFinishBody
        );

        if (currentSession >= sessionsBeforeLong) {
            currentSession = 0;
            loadPhase("long");
        } else {
            loadPhase("short");
        }

        if (autoBreak.checked) {
            statusElement.textContent = translations[currentLanguage].break;
            startTimer();
        } else {
            statusElement.textContent = translations[currentLanguage].waiting;
        }

        return;
    }


    /* ================= BREAK FINISHED ================= */

    showNotification(
        translations[currentLanguage].notifBreakFinishTitle,
        translations[currentLanguage].notifBreakFinishBody
    );

    loadPhase("study");

    if (autoStudy.checked) {
        statusElement.textContent = translations[currentLanguage].studying;
        startTimer();
    } else {
        statusElement.textContent = translations[currentLanguage].waiting;
    }
}


/* =====================================================
   START TIMER
===================================================== */

function startTimer() {

    if (isRunning) return;

    isRunning = true;

    if (currentPhase === "study") {
        statusElement.textContent = translations[currentLanguage].studying;
    } else {
        statusElement.textContent = translations[currentLanguage].break;
    }

    timerInterval = setInterval(() => {

        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateScreen();
        } else {
            finishPhase();
        }

    }, 1000);
}


/* =====================================================
   PAUSE TIMER
===================================================== */

function pauseTimer() {

    if (!isRunning) return;

    isRunning = false;

    clearInterval(timerInterval);

    timerInterval = null;

    statusElement.textContent = translations[currentLanguage].paused;
}


/* =====================================================
   RESET TIMER
===================================================== */

function resetTimer() {

    isRunning = false;

    clearInterval(timerInterval);

    timerInterval = null;

    currentPhase = "study";

    currentSession = 0;

    totalSeconds = getPhaseDuration();

    remainingSeconds = totalSeconds;

    progressBar.style.width = "0%";

    crab.classList.remove("celebrate");

    statusElement.textContent = translations[currentLanguage].ready;

    updateScreen();
}


/* =====================================================
   SETTINGS CHANGE
===================================================== */

function settingsChanged() {

    if (isRunning) return;

    if (currentPhase === "study") {
        totalSeconds = getPhaseDuration();
        remainingSeconds = totalSeconds;
    }

    updateScreen();
}


/* =====================================================
   THEME TOGGLE (Dark / Light Mode)
===================================================== */

themeToggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("salta3_theme", isDark ? "dark" : "light");
});

function loadTheme() {
    const savedTheme = localStorage.getItem("salta3_theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggleBtn.textContent = "☀️";
    }
}


/* =====================================================
   ZEN MODE (Full Screen Mode)
===================================================== */

zenModeBtn.addEventListener("click", function () {
    document.body.classList.add("zen-mode");
});

exitZenBtn.addEventListener("click", function () {
    document.body.classList.remove("zen-mode");
});


/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */

document.addEventListener("keydown", function (e) {
    // Ignore keypresses if typing in input fields
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;

    if (e.code === "Space") {
        e.preventDefault();
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    } else if (e.code === "KeyR") {
        resetTimer();
    }
});


/* =====================================================
   UPDATE LANGUAGE
===================================================== */

function updateLanguage() {

    const t = translations[currentLanguage];

    document.getElementById("settingsTitle").textContent = t.settings;

    document.getElementById("studyLabel").textContent = t.studyMinutes;

    document.getElementById("shortLabel").textContent = t.shortBreak;

    document.getElementById("longLabel").textContent = t.longBreak;

    document.getElementById("sessionsLabel").textContent = t.sessions;

    document.getElementById("alarmLabel").textContent = t.alarm;

    document.getElementById("soundSelectLabel").textContent = t.soundSelectLabel;

    document.getElementById("autoBreakTitle").textContent = t.autoBreak;

    document.getElementById("autoBreakText").textContent = t.autoBreakText;

    document.getElementById("autoStudyTitle").textContent = t.autoStudy;

    document.getElementById("autoStudyText").textContent = t.autoStudyText;

    document.getElementById("notifTitle").textContent = t.notifTitle;

    document.getElementById("notifText").textContent = t.notifText;

    document.getElementById("sessionsText").textContent = t.completed;

    document.getElementById("totalText").textContent = t.total;

    document.getElementById("historyTitle").textContent = t.historyTitle;

    document.getElementById("clearHistoryBtn").textContent = t.clearHistory;

    document.getElementById("exitZenBtn").textContent = t.exitZen;

    document.getElementById("tipText").textContent = t.tip;

    startBtn.textContent = t.start;

    pauseBtn.textContent = t.pause;

    resetBtn.textContent = t.reset;

    if (!isRunning) {
        statusElement.textContent = t.ready;
    }

    document.documentElement.lang = currentLanguage;

    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

    enBtn.classList.toggle("active", currentLanguage === "en");

    arBtn.classList.toggle("active", currentLanguage === "ar");

    renderHistory();

    updateScreen();
}


/* =====================================================
   LANGUAGE BUTTONS
===================================================== */

enBtn.addEventListener("click", function () {
    currentLanguage = "en";
    updateLanguage();
});

arBtn.addEventListener("click", function () {
    currentLanguage = "ar";
    updateLanguage();
});


/* =====================================================
   TIMER BUTTONS & INPUT EVENTS
===================================================== */

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);

studyInput.addEventListener("input", settingsChanged);

shortInput.addEventListener("input", settingsChanged);

longInput.addEventListener("input", settingsChanged);

sessionsInput.addEventListener("input", settingsChanged);

alarmInput.addEventListener("input", function () {
    getNumber(alarmInput, 1, 20);
});


/* =====================================================
   INITIALIZE
===================================================== */

function initialize() {

    totalSeconds = getPhaseDuration();

    remainingSeconds = totalSeconds;

    loadTheme();

    loadHistory();

    updateLanguage();

    updateScreen();
}


/* =====================================================
   START APP
===================================================== */

initialize();