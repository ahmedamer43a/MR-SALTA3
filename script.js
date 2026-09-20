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


/* TOGGLES */

const autoBreak =
    document.getElementById("autoBreak");

const autoStudy =
    document.getElementById("autoStudy");


/* STATS */

const completedSessions =
    document.getElementById("completedSessions");

const totalStudy =
    document.getElementById("totalStudy");


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


/*
    currentPhase can be:

    "study"
    "short"
    "long"
*/

let currentPhase = "study";


let remainingSeconds =
    25 * 60;


let totalSeconds =
    25 * 60;


let timerInterval =
    null;


let isRunning =
    false;


let completed =
    0;


let totalStudyMinutes =
    0;


let currentSession =
    0;


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

        autoBreak:
            "Auto Break",

        autoBreakText:
            "Start breaks automatically",

        autoStudy:
            "Auto Study",

        autoStudyText:
            "Start studying automatically",

        completed:
            "Sessions Completed",

        total:
            "Total Study Time",

        tip:
            "Set your times and press Start.",

        start:
            "▶ Start",

        pause:
            "⏸ Pause",

        reset:
            "↻ Reset"

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

        autoBreak:
            "البريك التلقائي",

        autoBreakText:
            "ابدأ البريك تلقائيًا",

        autoStudy:
            "المذاكرة التلقائية",

        autoStudyText:
            "ابدأ المذاكرة تلقائيًا",

        completed:
            "السيشنز المكتملة",

        total:
            "إجمالي وقت المذاكرة",

        tip:
            "ظبط الأوقات واضغط ابدأ.",

        start:
            "▶ ابدأ",

        pause:
            "⏸ إيقاف",

        reset:
            "↻ إعادة ضبط"

    }

};


/* =====================================================
   SAFE NUMBER FUNCTION
===================================================== */

function getNumber(input, min, max) {

    let value =
        parseInt(input.value, 10);


    if (Number.isNaN(value)) {

        value = min;

    }


    value =
        Math.max(min, value);


    value =
        Math.min(max, value);


    input.value =
        value;


    return value;
}


/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);


    const secondsLeft =
        seconds % 60;


    return (
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(secondsLeft).padStart(2, "0")
    );
}


/* =====================================================
   GET CURRENT PHASE DURATION
===================================================== */

function getPhaseDuration() {

    if (currentPhase === "study") {

        return (
            getNumber(
                studyInput,
                1,
                180
            ) * 60
        );

    }


    if (currentPhase === "short") {

        return (
            getNumber(
                shortInput,
                1,
                60
            ) * 60
        );

    }


    return (
        getNumber(
            longInput,
            1,
            120
        ) * 60
    );

}


/* =====================================================
   UPDATE SCREEN
===================================================== */

function updateScreen() {

    timerElement.textContent =
        formatTime(remainingSeconds);


    modeElement.textContent =
        translations[currentLanguage][currentPhase];


    completedSessions.textContent =
        completed;


    totalStudy.textContent =
        `${totalStudyMinutes}m`;


    let progress = 0;


    if (totalSeconds > 0) {

        progress =
            (
                (totalSeconds - remainingSeconds)
                /
                totalSeconds
            ) * 100;

    }


    progress =
        Math.max(
            0,
            Math.min(100, progress)
        );


    progressBar.style.width =
        `${progress}%`;

}


/* =====================================================
   LOAD PHASE
===================================================== */

function loadPhase(phase) {

    currentPhase =
        phase;


    totalSeconds =
        getPhaseDuration();


    remainingSeconds =
        totalSeconds;


    updateScreen();

}


/* =====================================================
   ALARM
===================================================== */

function playAlarm() {

    /*
    ============================================
    YOUR SOUND FILE

    Put your sound here:

    MR-SALTA3
        sounds
            alarm.mp3

    ============================================
    */


    const repetitions =
        getNumber(
            alarmInput,
            1,
            20
        );


    /*
        Play the sound multiple times.
    */

    let count = 0;


    function playOnce() {

        if (count >= repetitions) {

            return;

        }


        count++;


        alarmSound.currentTime = 0;


        const playPromise =
            alarmSound.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(
                (error) => {

                    console.log(
                        "Audio playback blocked:",
                        error
                    );

                }
            );

        }


        /*
            Wait for the audio to finish.

            If the audio doesn't have a
            proper duration, wait 1 second.
        */

        let waitTime = 1000;


        if (
            Number.isFinite(
                alarmSound.duration
            )
            &&
            alarmSound.duration > 0
        ) {

            waitTime =
                (
                    alarmSound.duration
                    * 1000
                ) + 250;

        }


        setTimeout(
            playOnce,
            waitTime
        );

    }


    playOnce();

}


/* =====================================================
   CRAB CELEBRATION
===================================================== */

function celebrateCrab() {

    crab.classList.remove(
        "celebrate"
    );


    /*
        Force browser to restart animation.
    */

    void crab.offsetWidth;


    crab.classList.add(
        "celebrate"
    );

}


/* =====================================================
   FINISH CURRENT PHASE
===================================================== */

function finishPhase() {

    /*
        Stop current interval first.
    */

    isRunning = false;


    clearInterval(
        timerInterval
    );


    timerInterval = null;


    /* Play alarm */

    playAlarm();


    /* Crab animation */

    celebrateCrab();


    /* =================================================
       STUDY FINISHED
    ================================================= */

    if (
        currentPhase === "study"
    ) {

        completed++;

        currentSession++;


        totalStudyMinutes +=
            getNumber(
                studyInput,
                1,
                180
            );


        const sessionsBeforeLong =
            getNumber(
                sessionsInput,
                1,
                20
            );


        /*
            Decide whether next break
            is short or long.
        */

        if (
            currentSession >=
            sessionsBeforeLong
        ) {

            currentSession = 0;


            loadPhase(
                "long"
            );

        }

        else {

            loadPhase(
                "short"
            );

        }


        /*
            AUTO BREAK ON

            Start break automatically.

            AUTO BREAK OFF

            Wait for user to press Start.
        */

        if (
            autoBreak.checked
        ) {

            statusElement.textContent =
                translations[currentLanguage].break;


            startTimer();

        }

        else {

            statusElement.textContent =
                translations[currentLanguage].waiting;

        }


        return;

    }


    /* =================================================
       BREAK FINISHED
    ================================================= */

    /*
        Break finished.

        Go back to study.
    */

    loadPhase(
        "study"
    );


    /*
        AUTO STUDY ON

        Start study automatically.

        AUTO STUDY OFF

        Wait for user.
    */

    if (
        autoStudy.checked
    ) {

        statusElement.textContent =
            translations[currentLanguage].studying;


        startTimer();

    }

    else {

        statusElement.textContent =
            translations[currentLanguage].waiting;

    }

}


/* =====================================================
   START TIMER
===================================================== */

function startTimer() {

    /*
        Don't create multiple intervals.
    */

    if (
        isRunning
    ) {

        return;

    }


    isRunning = true;


    /*
        Status message.
    */

    if (
        currentPhase === "study"
    ) {

        statusElement.textContent =
            translations[currentLanguage].studying;

    }

    else {

        statusElement.textContent =
            translations[currentLanguage].break;

    }


    /*
        Main timer loop.
    */

    timerInterval =
        setInterval(
            () => {


                /*
                    Timer still running.
                */

                if (
                    remainingSeconds > 0
                ) {

                    remainingSeconds--;

                    updateScreen();

                }


                /*
                    Timer reached zero.
                */

                else {

                    finishPhase();

                }

            },
            1000
        );

}


/* =====================================================
   PAUSE TIMER
===================================================== */

function pauseTimer() {

    if (
        !isRunning
    ) {

        return;

    }


    isRunning = false;


    clearInterval(
        timerInterval
    );


    timerInterval = null;


    statusElement.textContent =
        translations[currentLanguage].paused;

}


/* =====================================================
   RESET TIMER
===================================================== */

function resetTimer() {

    /*
        Stop timer.
    */

    isRunning = false;


    clearInterval(
        timerInterval
    );


    timerInterval = null;


    /*
        Reset everything.
    */

    currentPhase =
        "study";


    currentSession =
        0;


    completed =
        0;


    totalStudyMinutes =
        0;


    /*
        Reload study duration.
    */

    totalSeconds =
        getPhaseDuration();


    remainingSeconds =
        totalSeconds;


    /*
        Reset progress.
    */

    progressBar.style.width =
        "0%";


    /*
        Remove crab animation.
    */

    crab.classList.remove(
        "celebrate"
    );


    /*
        Status.
    */

    statusElement.textContent =
        translations[currentLanguage].ready;


    updateScreen();

}


/* =====================================================
   SETTINGS CHANGE
===================================================== */

function settingsChanged() {

    /*
        Don't change timer duration
        while timer is running.
    */

    if (
        isRunning
    ) {

        return;

    }


    /*
        If we're on study phase,
        update immediately.
    */

    if (
        currentPhase === "study"
    ) {

        totalSeconds =
            getPhaseDuration();


        remainingSeconds =
            totalSeconds;

    }


    updateScreen();

}


/* =====================================================
   UPDATE LANGUAGE
===================================================== */

function updateLanguage() {

    const t =
        translations[currentLanguage];


    document.getElementById(
        "settingsTitle"
    ).textContent =
        t.settings;


    document.getElementById(
        "studyLabel"
    ).textContent =
        t.studyMinutes;


    document.getElementById(
        "shortLabel"
    ).textContent =
        t.shortBreak;


    document.getElementById(
        "longLabel"
    ).textContent =
        t.longBreak;


    document.getElementById(
        "sessionsLabel"
    ).textContent =
        t.sessions;


    document.getElementById(
        "alarmLabel"
    ).textContent =
        t.alarm;


    document.getElementById(
        "autoBreakTitle"
    ).textContent =
        t.autoBreak;


    document.getElementById(
        "autoBreakText"
    ).textContent =
        t.autoBreakText;


    document.getElementById(
        "autoStudyTitle"
    ).textContent =
        t.autoStudy;


    document.getElementById(
        "autoStudyText"
    ).textContent =
        t.autoStudyText;


    document.getElementById(
        "sessionsText"
    ).textContent =
        t.completed;


    document.getElementById(
        "totalText"
    ).textContent =
        t.total;


    document.getElementById(
        "tipText"
    ).textContent =
        t.tip;


    startBtn.textContent =
        t.start;


    pauseBtn.textContent =
        t.pause;


    resetBtn.textContent =
        t.reset;


    /*
        Update status only if
        timer isn't currently running.
    */

    if (
        !isRunning
    ) {

        statusElement.textContent =
            t.ready;

    }


    /*
        Arabic / English direction.
    */

    document.documentElement.lang =
        currentLanguage;


    document.documentElement.dir =
        currentLanguage === "ar"
            ? "rtl"
            : "ltr";


    /*
        Active language button.
    */

    enBtn.classList.toggle(
        "active",
        currentLanguage === "en"
    );


    arBtn.classList.toggle(
        "active",
        currentLanguage === "ar"
    );


    updateScreen();

}


/* =====================================================
   LANGUAGE BUTTONS
===================================================== */

enBtn.addEventListener(
    "click",
    function () {

        currentLanguage =
            "en";

        updateLanguage();

    }
);


arBtn.addEventListener(
    "click",
    function () {

        currentLanguage =
            "ar";

        updateLanguage();

    }
);


/* =====================================================
   TIMER BUTTONS
===================================================== */

startBtn.addEventListener(
    "click",
    function () {

        startTimer();

    }
);


pauseBtn.addEventListener(
    "click",
    function () {

        pauseTimer();

    }
);


resetBtn.addEventListener(
    "click",
    function () {

        resetTimer();

    }
);


/* =====================================================
   INPUT EVENTS
===================================================== */

studyInput.addEventListener(
    "input",
    settingsChanged
);


shortInput.addEventListener(
    "input",
    settingsChanged
);


longInput.addEventListener(
    "input",
    settingsChanged
);


sessionsInput.addEventListener(
    "input",
    settingsChanged
);


alarmInput.addEventListener(
    "input",
    function () {

        getNumber(
            alarmInput,
            1,
            20
        );

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

function initialize() {

    /*
        Load initial study time.
    */

    totalSeconds =
        getPhaseDuration();


    remainingSeconds =
        totalSeconds;


    updateLanguage();


    updateScreen();

}


/* =====================================================
   START APP
===================================================== */

initialize();