import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get, child, update } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { 
    getStorage, 
    ref as storageRef, 
    uploadBytes, 
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

// إعدادات Firebase الخاصة بالمشروع
const firebaseConfig = {
    apiKey: "AIzaSyBQJd93k9OyQIBzJejjddMLSpWvyj2kXw8",
    authDomain: "mr-salta3.firebaseapp.com",
    databaseURL: "https://mr-salta3-default-rtdb.firebaseio.com",
    projectId: "mr-salta3",
    storageBucket: "mr-salta3.firebasestorage.app",
    messagingSenderId: "183894514268",
    appId: "1:183894514268:web:bf5c69625bd79f2302a499",
    measurementId: "G-53G69D4B37"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// اسم المستخدم للشات ومعرّف الفريد للجهاز/المستخدم
let currentUser = null;
let currentUserName = localStorage.getItem('salta3_username') || '';
let myUserId = localStorage.getItem('salta3_userid');
if (!myUserId) {
    myUserId = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    localStorage.setItem('salta3_userid', myUserId);
}

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                ocean: {
                    dark: '#063b45',
                    DEFAULT: '#087f8c',
                    light: '#38b8c0',
                    bg: '#eaf8f7'
                },
                coral: {
                    DEFAULT: '#ed6659',
                    dark: '#a9443d'
                },
                sand: '#f4d49c'
            }
        }
    }
};

/* ================= TRANSLATIONS ================= */
const i18n = {
    ar: {
        navTimer: "التايمر", navSummaries: "الملخصات", navHabits: "متتبع العادات", navGroups: "المجموعات الخاصة", navContact: "تواصل معنا",
        summariesTitle: "مكتبة الملخصات والملاحظات", addSummaryBtn: "إضافة ملخص جديد", newSummaryHeader: "نشر ملخص دراسي",
        attachFile: "مرفق ملف (اختياري - PDF/صورة):", cancel: "إلغاء", publish: "نشر الملخص", habitsTitle: "متتبع العادات الدراسية",
        addHabit: "إضافة عادة", groupsTitle: "المجموعات الخاصة", joinCodeLabel: "الانضمام بكود المجموعات:", join: "انضمام",
        createGroupBtn: "+ إنشاء مجموعة دراسية جديدة", create: "إنشاء", myGroupsHeader: "مجموعاتي:", selectGroupHint: "اختر مجموعة من القائمة أو انضم برمز للبدء في الدردشة",
        copyInvite: "نسخ رابط الدعوة", send: "إرسال", contactTitle: "تواصل معنا", contactSub: "لديك اقتراح أو واجهتك مشكلة؟ يسعدنا تواصلك مع فريق MR SALTA3",
        contactName: "الاسم الكامل", contactEmail: "البريد الإلكتروني", contactMessage: "الرسالة", contactSend: "إرسال الرسالة"
    },
    en: {
        navTimer: "Timer", navSummaries: "Summaries", navHabits: "Habit Tracker", navGroups: "Private Groups", navContact: "Contact Us",
        summariesTitle: "Summaries & Notes Library", addSummaryBtn: "Add New Summary", newSummaryHeader: "Publish Study Summary",
        attachFile: "Attach File (Optional - PDF/Image):", cancel: "Cancel", publish: "Publish Summary", habitsTitle: "Study Habit Tracker",
        addHabit: "Add Habit", groupsTitle: "Private Groups", joinCodeLabel: "Join by Group Code:", join: "Join",
        createGroupBtn: "+ Create New Study Group", create: "Create", myGroupsHeader: "My Groups:", selectGroupHint: "Select a group or join with a code to start chatting",
        copyInvite: "Copy Invite Link", send: "Send", contactTitle: "Contact Us", contactSub: "Have a suggestion or an issue? Contact MR SALTA3 team.",
        contactName: "Full Name", contactEmail: "Email Address", contactMessage: "Message", contactSend: "Send Message"
    }
};

const timerTranslations = {
    en: {
        study: "STUDY TIME", short: "SHORT BREAK", long: "LONG BREAK",
        ready: "Set your time and press Start.", studying: "Stay focused — you got this!", break: "Break time. Recharge!",
        paused: "Timer paused.", waiting: "Waiting for you to start.", settings: "Timer Settings", studyMinutes: "Study Minutes",
        shortBreak: "Short Break", longBreak: "Long Break", sessions: "Sessions Before Long Break", alarm: "Alarm Repetitions",
        soundSelectLabel: "Alarm Sound", autoBreak: "Auto Break", autoBreakText: "Start breaks automatically",
        autoStudy: "Auto Study", autoStudyText: "Start studying automatically", notifTitle: "Browser Notifications",
        notifText: "Get notified when phase ends", completed: "Sessions Completed", total: "Total Study Time",
        historyTitle: "Today's Sessions", clearHistory: "Clear", exitZen: "✕ Exit Zen Mode", tip: "Set your times and press Start.",
        start: "▶ Start", pause: "⏸ Pause", reset: "↻ Reset",
        notifStudyFinishTitle: "Study Phase Complete! 🎉", notifStudyFinishBody: "Great job! Time for a break.",
        notifBreakFinishTitle: "Break Finished! 💪", notifBreakFinishBody: "Ready to focus again? Let's go!"
    },
    ar: {
        study: "وقت المذاكرة", short: "البريك القصير", long: "اللونج بريك",
        ready: "ظبط الوقت واضغط ابدأ.", studying: "ركز يا بطل — أنت قدها!", break: "وقت البريك — ريّح دماغك!",
        paused: "التايمر متوقف مؤقتًا.", waiting: "مستنيك تبدأ.", settings: "إعدادات التايمر", studyMinutes: "دقائق المذاكرة",
        shortBreak: "البريك القصير", longBreak: "اللونج بريك", sessions: "عدد السيشنز قبل اللونج بريك", alarm: "عدد مرات الرنة",
        soundSelectLabel: "صوت التنبيه", autoBreak: "البريك التلقائي", autoBreakText: "ابدأ البريك تلقائيًا",
        autoStudy: "المذاكرة التلقائية", autoStudyText: "ابدأ المذاكرة تلقائيًا", notifTitle: "إشعارات المتصفح",
        notifText: "تنبيهك عند انتهاء الوقت", completed: "السيشنز المكتملة", total: "إجمالي وقت المذاكرة",
        historyTitle: "جلسات اليوم", clearHistory: "مسح", exitZen: "✕ الخروج من وضع التركيز", tip: "ظبط الأوقات واضغط ابدأ.",
        start: "▶ ابدأ", pause: "⏸ إيقاف", reset: "↻ إعادة ضبط",
        notifStudyFinishTitle: "عاش يا بطل! خلصت السيشن 🎉", notifStudyFinishBody: "وقت البريك جه، ريّح دماغك شوية.",
        notifBreakFinishTitle: "البريك خلص! 💪", notifBreakFinishBody: "جاهز نرجع نركز تاني؟ يلا بينا!"
    }
};

let currentLanguage = "ar";

// Tab Navigation Logic
document.querySelectorAll('.nav-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
        document.querySelectorAll('.nav-tab').forEach(b => {
            b.classList.remove('active', 'bg-white', 'dark:bg-ocean-dark', 'shadow', 'text-ocean-dark', 'dark:text-white');
            b.classList.add('hover:bg-white/30', 'text-white');
        });
        tabBtn.classList.add('active', 'bg-white', 'dark:bg-ocean-dark', 'shadow', 'text-ocean-dark', 'dark:text-white');
        tabBtn.classList.remove('hover:bg-white/30', 'text-white');

        const targetTab = tabBtn.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
        document.getElementById(`tab-${targetTab}`).classList.remove('hidden');
    });
});

/* ================= AUTH & PROFILE MODULE ================= */
const authModal = document.getElementById('authModal');
const openAuthModalBtn = document.getElementById('openAuthModalBtn');
const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
const signInContainer = document.getElementById('signInContainer');
const signUpContainer = document.getElementById('signUpContainer');
const userProfileContainer = document.getElementById('userProfileContainer');

const goToSignUpBtn = document.getElementById('goToSignUpBtn');
const goToSignInBtn = document.getElementById('goToSignInBtn');

const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const facebookSignInBtn = document.getElementById('facebookSignInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const headerUserName = document.getElementById('headerUserName');
const headerUserAvatar = document.getElementById('headerUserAvatar');
const modalUserName = document.getElementById('modalUserName');
const modalUserEmail = document.getElementById('modalUserEmail');
const modalUserAvatar = document.getElementById('modalUserAvatar');
const avatarFileInput = document.getElementById('avatarFileInput');

// زر إظهار/إخفاء كلمة المرور
const toggleSignInPassword = document.getElementById('toggleSignInPassword');
const signInPassword = document.getElementById('signInPassword');

if (toggleSignInPassword && signInPassword) {
    toggleSignInPassword.addEventListener('click', () => {
        const type = signInPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        signInPassword.setAttribute('type', type);
        toggleSignInPassword.textContent = type === 'password' ? '👁️' : '🙈';
    });
}

const toggleSignUpPassword = document.getElementById('toggleSignUpPassword');
const signUpPassword = document.getElementById('signUpPassword');

if (toggleSignUpPassword && signUpPassword) {
    toggleSignUpPassword.addEventListener('click', () => {
        const type = signUpPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        signUpPassword.setAttribute('type', type);
        toggleSignUpPassword.textContent = type === 'password' ? '👁️' : '🙈';
    });
}

openAuthModalBtn.addEventListener('click', () => authModal.classList.remove('hidden'));
closeAuthModalBtn.addEventListener('click', () => authModal.classList.add('hidden'));

goToSignUpBtn.addEventListener('click', () => {
    signInContainer.classList.add('hidden');
    signUpContainer.classList.remove('hidden');
});

goToSignInBtn.addEventListener('click', () => {
    signUpContainer.classList.add('hidden');
    signInContainer.classList.remove('hidden');
});

// مراقبة حالة تسجيل الدخول في Firebase
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        myUserId = user.uid;
        localStorage.setItem('salta3_userid', myUserId);
        
        // جلب تفاصيل إضافية للبروفايل من Realtime Database
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        let userData = snapshot.val() || {};

        currentUserName = user.displayName || userData.name || user.email.split('@')[0];
        localStorage.setItem('salta3_username', currentUserName);

        const photoURL = user.photoURL || userData.photoURL || '';

        // تحديث الهيدر والـ Popup
        headerUserName.textContent = currentUserName;
        modalUserName.textContent = currentUserName;
        modalUserEmail.textContent = user.email;

        if (photoURL) {
            headerUserAvatar.style.backgroundImage = `url('${photoURL}')`;
            headerUserAvatar.textContent = '';
            modalUserAvatar.style.backgroundImage = `url('${photoURL}')`;
            modalUserAvatar.textContent = '';
        } else {
            headerUserAvatar.style.backgroundImage = '';
            headerUserAvatar.textContent = currentUserName.charAt(0).toUpperCase();
            modalUserAvatar.style.backgroundImage = '';
            modalUserAvatar.textContent = currentUserName.charAt(0).toUpperCase();
        }

        signInContainer.classList.add('hidden');
        signUpContainer.classList.add('hidden');
        userProfileContainer.classList.remove('hidden');

        // مزامنة البيانات السحابية مع الحساب الحالي
        syncUserDataFromCloud();
    } else {
        currentUser = null;
        headerUserName.textContent = 'Sign In';
        headerUserAvatar.style.backgroundImage = '';
        headerUserAvatar.textContent = '👤';

        signInContainer.classList.remove('hidden');
        signUpContainer.classList.add('hidden');
        userProfileContainer.classList.add('hidden');
    }
});

// تسجيل الدخول بالإيميل والباسوورد
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signInEmail').value.trim();
    const password = document.getElementById('signInPassword').value.trim();

    if (!email || !password) {
        alert('متبدأش أي حاجة إلا لما تكتب الجيميل والباسوورد الأول!');
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        authModal.classList.add('hidden');
        signInForm.reset();
    } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            alert('لا يوجد حساب بهذا الاسم/الجيميل');
        } else if (error.code === 'auth/wrong-password') {
            alert('هناك مشكلة في كلمة المرور!');
        } else {
            alert('حدث خطأ أثناء تسجيل الدخول: ' + error.message);
        }
    }
});

// إنشاء حساب جديد
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();

    if (!name || !email || !password) {
        alert('يرجى ملء جميع البيانات لإنشاء الحساب!');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });
        await set(ref(db, `users/${user.uid}`), {
            name: name,
            email: email,
            createdAt: Date.now()
        });

        authModal.classList.add('hidden');
        signUpForm.reset();
    } catch (error) {
        alert('خطأ في إنشاء الحساب: ' + error.message);
    }
});

// تسجيل الدخول بجوجل
googleSignInBtn.addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        await update(ref(db, `users/${user.uid}`), {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL || ''
        });

        authModal.classList.add('hidden');
    } catch (error) {
        alert('تعذر تسجيل الدخول بـ Google: ' + error.message);
    }
});

facebookSignInBtn.addEventListener('click', () => {
    alert('تسجيل الدخول بـ Facebook يتطلب تفعيل التطبيق الرسمى. يمكنك استخدام Google أو البريد الإلكتروني حالياً.');
});

signOutBtn.addEventListener('click', () => {
    signOut(auth);
});

// رفع صورة البروفايل عبر Firebase Storage تلقائياً
avatarFileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file || !currentUser) return;

    try {
        // تغيير شكل الزر أو التنبيه لحين رفع الصورة
        const originalText = modalUserName.textContent;
        modalUserName.textContent = "جاري رفع الصورة...";

        // 1. تحديد مكان الملف داخل Firebase Storage
        const imgRef = storageRef(storage, `avatars/${currentUser.uid}`);

        // 2. رفع الملف إلى Storage
        await uploadBytes(imgRef, file);

        // 3. الحصول على رابط الصورة المباشر القصير
        const photoURL = await getDownloadURL(imgRef);

        // 4. تحديث البروفايل وقاعدة البيانات
        await updateProfile(currentUser, { photoURL });
        await update(ref(db, `users/${currentUser.uid}`), { photoURL });

        // 5. تحديث الشاشة
        headerUserAvatar.style.backgroundImage = `url('${photoURL}')`;
        headerUserAvatar.textContent = '';
        modalUserAvatar.style.backgroundImage = `url('${photoURL}')`;
        modalUserAvatar.textContent = '';
        modalUserName.textContent = originalText;

        alert('تم تحديث صورة البروفايل بنجاح! 🎉');
    } catch (error) {
        console.error("خطأ أثناء رفع الصورة:", error);
        alert('حدث خطأ أثناء رفع الصورة: ' + error.message);
    }
});

/* ================= CLOUD DATA SYNC ================= */
async function syncUserDataFromCloud() {
    if (!myUserId) return;

    // 1. مزامنة العادات
    onValue(ref(db, `userData/${myUserId}/habits`), (snapshot) => {
        const data = snapshot.val();
        habits = data ? Object.values(data) : [];
        localStorage.setItem('salta3_habits', JSON.stringify(habits));
        renderHabits();
    });

    // 2. مزامنة الملخصات
    onValue(ref(db, `userData/${myUserId}/summaries`), (snapshot) => {
        const data = snapshot.val();
        summaries = data ? Object.values(data) : [];
        localStorage.setItem('salta3_summaries', JSON.stringify(summaries));
        renderSummaries();
    });

    // 3. مزامنة المجموعات المنضم إليها
    onValue(ref(db, `userData/${myUserId}/groups`), (snapshot) => {
        const data = snapshot.val();
        myJoinedGroupCodes = data ? Object.values(data) : [];
        localStorage.setItem('salta3_joined_codes', JSON.stringify(myJoinedGroupCodes));
        renderGroups();
    });
}

function pushUserDataToCloud(key, data) {
    if (myUserId) {
        set(ref(db, `userData/${myUserId}/${key}`), data);
    }
}

/* ================= TIMER SCRIPT ================= */
const timerElement = document.getElementById("timer");
const modeElement = document.getElementById("mode");
const statusElement = document.getElementById("status");
const progressBar = document.getElementById("progressBar");
const crab = document.getElementById("crab");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const zenModeBtn = document.getElementById("zenModeBtn");
const exitZenBtn = document.getElementById("exitZenBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const phaseStudyBtn = document.getElementById("phaseStudyBtn");
const phaseShortBtn = document.getElementById("phaseShortBtn");
const phaseLongBtn = document.getElementById("phaseLongBtn");

const studyInput = document.getElementById("studyInput");
const shortInput = document.getElementById("shortInput");
const longInput = document.getElementById("longInput");
const sessionsInput = document.getElementById("sessionsInput");
const alarmInput = document.getElementById("alarmInput");
const soundSelect = document.getElementById("soundSelect");

const autoBreak = document.getElementById("autoBreak");
const autoStudy = document.getElementById("autoStudy");
const notifToggle = document.getElementById("notifToggle");

const completedSessions = document.getElementById("completedSessions");
const totalStudy = document.getElementById("totalStudy");
const historyList = document.getElementById("historyList");

const enBtn = document.getElementById("enBtn");
const arBtn = document.getElementById("arBtn");
const alarmSound = document.getElementById("alarmSound");

let currentPhase = "study";
let remainingSeconds = 25 * 60;
let totalSeconds = 25 * 60;
let timerInterval = null;
let isRunning = false;
let completed = 0;
let totalStudyMinutes = 0;
let currentSession = 0;
let sessionHistory = [];

function getNumber(input, min, max) {
    let value = parseInt(input.value, 10);
    if (Number.isNaN(value)) value = min;
    value = Math.max(min, Math.min(max, value));
    input.value = value;
    return value;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return String(minutes).padStart(2, "0") + ":" + String(secondsLeft).padStart(2, "0");
}

function getPhaseDuration() {
    if (currentPhase === "study") return getNumber(studyInput, 1, 180) * 60;
    if (currentPhase === "short") return getNumber(shortInput, 1, 60) * 60;
    return getNumber(longInput, 1, 120) * 60;
}

function updateCrabState() {
    crab.classList.remove("state-study", "state-short", "state-long", "state-paused");
    if (!isRunning && remainingSeconds < totalSeconds) {
        crab.classList.add("state-paused");
    } else {
        crab.classList.add(`state-${currentPhase}`);
    }
}

function updateScreen() {
    timerElement.textContent = formatTime(remainingSeconds);
    modeElement.textContent = timerTranslations[currentLanguage][currentPhase];
    completedSessions.textContent = completed;
    totalStudy.textContent = `${totalStudyMinutes}m`;

    let progress = 0;
    if (totalSeconds > 0) {
        progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    }
    progressBar.style.width = `${Math.max(0, Math.min(100, progress))}%`;

    phaseStudyBtn.className = currentPhase === "study" ? "flex-1 py-2 rounded-xl font-bold text-sm bg-ocean-dark text-white transition" : "flex-1 py-2 rounded-xl font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition";
    phaseShortBtn.className = currentPhase === "short" ? "flex-1 py-2 rounded-xl font-bold text-sm bg-ocean-dark text-white transition" : "flex-1 py-2 rounded-xl font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition";
    phaseLongBtn.className = currentPhase === "long" ? "flex-1 py-2 rounded-xl font-bold text-sm bg-ocean-dark text-white transition" : "flex-1 py-2 rounded-xl font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition";

    updateCrabState();
    document.title = `${formatTime(remainingSeconds)} - MR SALTA3`;
}

function loadPhase(phase) {
    if (isRunning) pauseTimer();
    currentPhase = phase;
    totalSeconds = getPhaseDuration();
    remainingSeconds = totalSeconds;
    statusElement.textContent = timerTranslations[currentLanguage].ready;
    updateScreen();
}

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
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1.2);
        }
    } catch (e) {
        console.log("Web Audio API error", e);
    }
}

function playAlarm() {
    const repetitions = getNumber(alarmInput, 1, 20);
    const soundType = soundSelect.value;
    let count = 0;

    function playOnce() {
        if (count >= repetitions) return;
        count++;

        if (soundType === "default") {
            alarmSound.currentTime = 0;
            const playPromise = alarmSound.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => playSynthesizedSound("digital"));
            }
            let waitTime = (alarmSound.duration && Number.isFinite(alarmSound.duration)) ? (alarmSound.duration * 1000) + 250 : 1000;
            setTimeout(playOnce, waitTime);
        } else {
            playSynthesizedSound(soundType);
            setTimeout(playOnce, soundType === "bell" ? 1300 : 400);
        }
    }
    playOnce();
}

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
    if (notifToggle.checked && "Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") notifToggle.checked = false;
        });
    }
});

function celebrateCrab() {
    crab.classList.remove("celebrate");
    void crab.offsetWidth;
    crab.classList.add("celebrate");
}

function addHistoryEntry(minutes) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sessionHistory.unshift({ time: timeString, minutes: minutes, date: now.toLocaleDateString() });
    saveHistory();
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    if (sessionHistory.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "flex justify-center text-gray-400 py-1";
        emptyLi.textContent = currentLanguage === "ar" ? "لا توجد جلسات اليوم" : "No sessions today";
        historyList.appendChild(emptyLi);
        return;
    }

    sessionHistory.forEach(item => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center p-1.5 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700";
        const textSpan = document.createElement("span");
        textSpan.textContent = `${currentLanguage === "ar" ? "جلسة مذاكرة" : "Study Session"} (${item.minutes}m)`;
        const timeSpan = document.createElement("span");
        timeSpan.className = "text-gray-400 font-mono";
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

    pushUserDataToCloud("history", {
        history: sessionHistory,
        completed: completed,
        totalMinutes: totalStudyMinutes
    });
}

function loadHistory() {
    const savedHistory = localStorage.getItem("salta3_history");
    const savedCompleted = localStorage.getItem("salta3_completed");
    const savedTotal = localStorage.getItem("salta3_totalMinutes");
    if (savedHistory) sessionHistory = JSON.parse(savedHistory);
    if (savedCompleted) completed = parseInt(savedCompleted, 10);
    if (savedTotal) totalStudyMinutes = parseInt(savedTotal, 10);
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

function finishPhase() {
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;

    playAlarm();
    celebrateCrab();

    if (currentPhase === "study") {
        completed++;
        currentSession++;
        const studyMins = getNumber(studyInput, 1, 180);
        totalStudyMinutes += studyMins;
        addHistoryEntry(studyMins);

        const sessionsBeforeLong = getNumber(sessionsInput, 1, 20);
        showNotification(timerTranslations[currentLanguage].notifStudyFinishTitle, timerTranslations[currentLanguage].notifStudyFinishBody);

        if (currentSession >= sessionsBeforeLong) {
            currentSession = 0;
            loadPhase("long");
        } else {
            loadPhase("short");
        }

        if (autoBreak.checked) {
            statusElement.textContent = timerTranslations[currentLanguage].break;
            startTimer();
        } else {
            statusElement.textContent = timerTranslations[currentLanguage].waiting;
        }
        return;
    }

    showNotification(timerTranslations[currentLanguage].notifBreakFinishTitle, timerTranslations[currentLanguage].notifBreakFinishBody);
    loadPhase("study");

    if (autoStudy.checked) {
        statusElement.textContent = timerTranslations[currentLanguage].studying;
        startTimer();
    } else {
        statusElement.textContent = timerTranslations[currentLanguage].waiting;
    }
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    statusElement.textContent = currentPhase === "study" 
        ? timerTranslations[currentLanguage].studying 
        : timerTranslations[currentLanguage].break;

    updateCrabState();

    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateScreen();
        } else {
            finishPhase();
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    statusElement.textContent = timerTranslations[currentLanguage].paused;
    updateCrabState();
}

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
    statusElement.textContent = timerTranslations[currentLanguage].ready;
    updateScreen();
}

function settingsChanged() {
    if (isRunning) return;
    totalSeconds = getPhaseDuration();
    remainingSeconds = totalSeconds;
    updateScreen();
}

themeToggleBtn.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("salta3_theme", isDark ? "dark" : "light");
});

function loadTheme() {
    if (localStorage.getItem("salta3_theme") === "dark") {
        document.documentElement.classList.add("dark");
        themeToggleBtn.textContent = "☀️";
    }
}

// Zen Mode Controls - Global Handling
zenModeBtn.addEventListener("click", () => {
    document.body.classList.add("zen-mode");
    exitZenBtn.classList.remove("hidden");
});

exitZenBtn.addEventListener("click", () => {
    document.body.classList.remove("zen-mode");
    exitZenBtn.classList.add("hidden");
});

document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA") return;
    if (e.code === "Space") {
        e.preventDefault();
        isRunning ? pauseTimer() : startTimer();
    } else if (e.code === "KeyR") {
        resetTimer();
    }
});

function updateLanguage() {
    const t = timerTranslations[currentLanguage];
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

    if (!isRunning) statusElement.textContent = t.ready;

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

    if (currentLanguage === "ar") {
        arBtn.className = "px-3 py-1 text-sm font-bold rounded-full bg-white text-ocean-dark transition";
        enBtn.className = "px-3 py-1 text-sm font-bold rounded-full text-white hover:bg-white/10 transition";
    } else {
        enBtn.className = "px-3 py-1 text-sm font-bold rounded-full bg-white text-ocean-dark transition";
        arBtn.className = "px-3 py-1 text-sm font-bold rounded-full text-white hover:bg-white/10 transition";
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLanguage][key]) {
            el.textContent = i18n[currentLanguage][key];
        }
    });

    renderHistory();
    updateScreen();
}

enBtn.addEventListener("click", () => { currentLanguage = "en"; updateLanguage(); });
arBtn.addEventListener("click", () => { currentLanguage = "ar"; updateLanguage(); });

phaseStudyBtn.addEventListener("click", () => loadPhase("study"));
phaseShortBtn.addEventListener("click", () => loadPhase("short"));
phaseLongBtn.addEventListener("click", () => loadPhase("long"));

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
studyInput.addEventListener("input", settingsChanged);
shortInput.addEventListener("input", settingsChanged);
longInput.addEventListener("input", settingsChanged);
sessionsInput.addEventListener("input", settingsChanged);
alarmInput.addEventListener("input", () => getNumber(alarmInput, 1, 20));

/* ================= SUMMARIES MODULE ================= */
let summaries = JSON.parse(localStorage.getItem('salta3_summaries') || '[]');

const openUploadSummaryBtn = document.getElementById('openUploadSummaryBtn');
const summaryFormCard = document.getElementById('summaryFormCard');
const cancelSummaryBtn = document.getElementById('cancelSummaryBtn');
const saveSummaryBtn = document.getElementById('saveSummaryBtn');
const summariesList = document.getElementById('summariesList');

openUploadSummaryBtn.addEventListener('click', () => summaryFormCard.classList.remove('hidden'));
cancelSummaryBtn.addEventListener('click', () => summaryFormCard.classList.add('hidden'));

saveSummaryBtn.addEventListener('click', () => {
    const title = document.getElementById('sumTitle').value.trim();
    const subject = document.getElementById('sumSubject').value.trim();
    const content = document.getElementById('sumContent').value.trim();
    const fileInput = document.getElementById('sumFile');

    if (!title || !subject) return;

    const newSummary = {
        id: Date.now(),
        title,
        subject,
        content,
        rating: 5,
        ratingsCount: 1,
        date: new Date().toLocaleDateString(),
        fileName: fileInput.files[0] ? fileInput.files[0].name : null
    };

    summaries.unshift(newSummary);
    localStorage.setItem('salta3_summaries', JSON.stringify(summaries));
    pushUserDataToCloud('summaries', summaries);
    renderSummaries();

    document.getElementById('sumTitle').value = '';
    document.getElementById('sumSubject').value = '';
    document.getElementById('sumContent').value = '';
    fileInput.value = '';
    summaryFormCard.classList.add('hidden');
});

function renderSummaries() {
    summariesList.innerHTML = '';
    if (summaries.length === 0) {
        summariesList.innerHTML = `<div class="col-span-2 text-center text-gray-400 py-8 font-semibold">لا توجد ملخصات مرفوعة بعد. كن أول من يشارك!</div>`;
        return;
    }

    summaries.forEach(s => {
        const card = document.createElement('div');
        card.className = "bg-slate-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between relative group";
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <span class="px-2.5 py-1 bg-ocean/20 text-ocean dark:text-ocean-light rounded-lg text-xs font-bold">${s.subject}</span>
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-400">${s.date}</span>
                        <button data-delete-summary-id="${s.id}" class="delete-summary-btn text-coral hover:text-coral-dark text-xs font-bold bg-red-100 dark:bg-red-950/40 px-2 py-0.5 rounded-md transition" title="حذف الملخص">🗑️ مسح</button>
                    </div>
                </div>
                <h3 class="font-bold text-ocean-dark dark:text-white text-base mb-1">${s.title}</h3>
                <p class="text-xs text-gray-600 dark:text-gray-300 mb-3">${s.content}</p>
                ${s.fileName ? `<div class="text-xs text-ocean font-bold flex items-center gap-1 mb-3">📄 ${s.fileName}</div>` : ''}
            </div>
            <div class="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-2 text-xs">
                <div class="flex items-center gap-1">
                    <span class="text-amber-400 font-bold">★ ${s.rating.toFixed(1)}</span>
                    <span class="text-gray-400">(${s.ratingsCount})</span>
                </div>
                <button data-rate-id="${s.id}" class="rate-summary-btn text-ocean hover:underline font-bold">قيم هذا الملخص</button>
            </div>
        `;
        summariesList.appendChild(card);
    });

    document.querySelectorAll('.rate-summary-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-rate-id'), 10);
            rateSummary(id);
        });
    });

    document.querySelectorAll('.delete-summary-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-delete-summary-id'), 10);
            deleteSummary(id);
        });
    });
}

function deleteSummary(id) {
    if (confirm(currentLanguage === 'ar' ? 'هل أنت تأكد من مسح هذا الملخص؟' : 'Are you sure you want to delete this summary?')) {
        summaries = summaries.filter(s => s.id !== id);
        localStorage.setItem('salta3_summaries', JSON.stringify(summaries));
        pushUserDataToCloud('summaries', summaries);
        renderSummaries();
    }
}

function rateSummary(id) {
    const summary = summaries.find(item => item.id === id);
    if (summary) {
        summary.ratingsCount++;
        summary.rating = Math.min(5, summary.rating + 0.1);
        localStorage.setItem('salta3_summaries', JSON.stringify(summaries));
        pushUserDataToCloud('summaries', summaries);
        renderSummaries();
    }
}

/* ================= HABITS MODULE ================= */
let habits = JSON.parse(localStorage.getItem('salta3_habits') || '[]');

const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitsList = document.getElementById('habitsList');

addHabitBtn.addEventListener('click', () => {
    const name = habitInput.value.trim();
    if (!name) return;
    habits.push({ id: Date.now(), name, done: false });
    localStorage.setItem('salta3_habits', JSON.stringify(habits));
    pushUserDataToCloud('habits', habits);
    habitInput.value = '';
    renderHabits();
});

function renderHabits() {
    habitsList.innerHTML = '';
    if (habits.length === 0) {
        habitsList.innerHTML = `<div class="text-center text-gray-400 py-6 font-semibold">لم تقم بإضافة أي عادات بعد.</div>`;
        return;
    }

    habits.forEach(h => {
        const item = document.createElement('div');
        item.className = "flex items-center justify-between p-3.5 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700";
        item.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" ${h.done ? 'checked' : ''} data-habit-id="${h.id}" class="toggle-habit-chk w-5 h-5 accent-ocean rounded cursor-pointer">
                <span class="font-bold text-sm ${h.done ? 'line-through text-gray-400' : 'text-ocean-dark dark:text-white'}">${h.name}</span>
            </div>
            <button data-delete-id="${h.id}" class="delete-habit-btn text-coral hover:text-coral-dark text-xs font-bold">حذف</button>
        `;
        habitsList.appendChild(item);
    });

    document.querySelectorAll('.toggle-habit-chk').forEach(chk => {
        chk.addEventListener('change', (e) => {
            const id = parseInt(e.target.getAttribute('data-habit-id'), 10);
            toggleHabit(id);
        });
    });

    document.querySelectorAll('.delete-habit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-delete-id'), 10);
            deleteHabit(id);
        });
    });
}

function toggleHabit(id) {
    const h = habits.find(item => item.id === id);
    if (h) {
        h.done = !h.done;
        localStorage.setItem('salta3_habits', JSON.stringify(habits));
        pushUserDataToCloud('habits', habits);
        renderHabits();
    }
}

function deleteHabit(id) {
    habits = habits.filter(item => item.id !== id);
    localStorage.setItem('salta3_habits', JSON.stringify(habits));
    pushUserDataToCloud('habits', habits);
    renderHabits();
}

/* ================= PRIVATE GROUPS MODULE ================= */
let myJoinedGroupCodes = JSON.parse(localStorage.getItem('salta3_joined_codes') || '[]');
let activeGroupCode = null;
let currentGroupData = null;

const openCreateGroupBtn = document.getElementById('openCreateGroupBtn');
const createGroupCard = document.getElementById('createGroupCard');
const cancelCreateGroupBtn = document.getElementById('cancelCreateGroupBtn');
const saveCreateGroupBtn = document.getElementById('saveCreateGroupBtn');
const joinGroupBtn = document.getElementById('joinGroupBtn');
const joinCodeInput = document.getElementById('joinCodeInput');
const myGroupsList = document.getElementById('myGroupsList');

const noGroupSelected = document.getElementById('noGroupSelected');
const activeGroupContent = document.getElementById('activeGroupContent');
const chatGroupName = document.getElementById('chatGroupName');
const chatGroupCode = document.getElementById('chatGroupCode');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const leaveGroupBtn = document.getElementById('leaveGroupBtn');
const adminMuteBtn = document.getElementById('adminMuteBtn');
const chatMutedNotice = document.getElementById('chatMutedNotice');

openCreateGroupBtn.addEventListener('click', () => createGroupCard.classList.remove('hidden'));
cancelCreateGroupBtn.addEventListener('click', () => createGroupCard.classList.add('hidden'));

function getUserName() {
    if (!currentUserName) {
        currentUserName = prompt(currentLanguage === 'ar' ? 'أدخل اسمك للظهور في الدردشة:' : 'Enter your name for the chat:') || 'طالب';
        localStorage.setItem('salta3_username', currentUserName);
    }
    return currentUserName;
}

saveCreateGroupBtn.addEventListener('click', async () => {
    const name = document.getElementById('newGroupName').value.trim();
    if (!name) return;

    const code = 'SALTA3-' + Math.floor(1000 + Math.random() * 9000);
    const groupRef = ref(db, 'groups/' + code);

    const initialMsgKey = Date.now();
    const newGroupData = {
        name: name,
        code: code,
        createdBy: myUserId,
        isMuted: false,
        messages: {
            [initialMsgKey]: {
                sender: 'MR SALTA3 Bot',
                text: `مرحباً بكم في مجموعة ${name}! 🎉`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        }
    };

    await set(groupRef, newGroupData);

    if (!myJoinedGroupCodes.includes(code)) {
        myJoinedGroupCodes.push(code);
        localStorage.setItem('salta3_joined_codes', JSON.stringify(myJoinedGroupCodes));
        pushUserDataToCloud('groups', myJoinedGroupCodes);
    }

    document.getElementById('newGroupName').value = '';
    createGroupCard.classList.add('hidden');
    renderGroups();
    selectGroup(code);
});

joinGroupBtn.addEventListener('click', async () => {
    const code = joinCodeInput.value.trim().toUpperCase();
    if (!code) return;

    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `groups/${code}`));

    if (snapshot.exists()) {
        if (!myJoinedGroupCodes.includes(code)) {
            myJoinedGroupCodes.push(code);
            localStorage.setItem('salta3_joined_codes', JSON.stringify(myJoinedGroupCodes));
            pushUserDataToCloud('groups', myJoinedGroupCodes);
        }
        joinCodeInput.value = '';
        renderGroups();
        selectGroup(code);
    } else {
        alert(currentLanguage === 'ar' ? 'رمز المجموعة غير صحيح!' : 'Invalid Group Code!');
    }
});

function renderGroups() {
    myGroupsList.innerHTML = '';
    if (myJoinedGroupCodes.length === 0) {
        myGroupsList.innerHTML = `<div class="text-xs text-gray-400 py-2">لا تنتمي لأي مجموعة حالياً.</div>`;
        return;
    }

    myJoinedGroupCodes.forEach(code => {
        const groupRef = ref(db, 'groups/' + code);
        onValue(groupRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let existingBtn = document.getElementById(`group-btn-${code}`);
                if (!existingBtn) {
                    existingBtn = document.createElement('button');
                    existingBtn.id = `group-btn-${code}`;
                    myGroupsList.appendChild(existingBtn);
                }
                existingBtn.className = `w-full text-right p-2.5 rounded-xl text-xs font-bold flex justify-between items-center transition ${activeGroupCode === code ? 'bg-ocean text-white' : 'bg-slate-100 dark:bg-gray-800 text-ocean-dark dark:text-white hover:bg-slate-200'}`;
                existingBtn.innerHTML = `<span>${data.name}</span><span class="font-mono text-[10px] opacity-70">${data.code}</span>`;
                existingBtn.onclick = () => selectGroup(code);
            }
        });
    });
}

function selectGroup(code) {
    activeGroupCode = code;
    renderGroups();

    const groupRef = ref(db, 'groups/' + code);

    onValue(groupRef, (snapshot) => {
        const g = snapshot.val();
        if (!g) return;
        currentGroupData = g;

        noGroupSelected.classList.add('hidden');
        activeGroupContent.classList.remove('hidden');

        chatGroupName.textContent = g.name;
        chatGroupCode.textContent = `رمز الانضمام: ${g.code}`;

        const isAdmin = (g.createdBy === myUserId);
        if (isAdmin) {
            adminMuteBtn.classList.remove('hidden');
            adminMuteBtn.textContent = g.isMuted ? '🔊 إلغاء الكتم' : '🔇 كتم الدردشة';
        } else {
            adminMuteBtn.classList.add('hidden');
        }

        if (g.isMuted) {
            chatInput.disabled = true;
            sendChatBtn.disabled = true;
            sendChatBtn.classList.add('opacity-50', 'cursor-not-allowed');
            chatMutedNotice.classList.remove('hidden');
        } else {
            chatInput.disabled = false;
            sendChatBtn.disabled = false;
            sendChatBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            chatMutedNotice.classList.add('hidden');
        }

        renderMessages(g.messages);
    });
}

leaveGroupBtn.addEventListener('click', () => {
    if (!activeGroupCode) return;
    if (confirm(currentLanguage === 'ar' ? 'هل أنت تأكد من مغادرة ومسح هذه المجموعة من قائمتك؟' : 'Are you sure you want to leave and remove this group from your list?')) {
        myJoinedGroupCodes = myJoinedGroupCodes.filter(c => c !== activeGroupCode);
        localStorage.setItem('salta3_joined_codes', JSON.stringify(myJoinedGroupCodes));
        pushUserDataToCloud('groups', myJoinedGroupCodes);

        activeGroupCode = null;
        currentGroupData = null;
        
        activeGroupContent.classList.add('hidden');
        noGroupSelected.classList.remove('hidden');
        
        renderGroups();
    }
});

adminMuteBtn.addEventListener('click', async () => {
    if (!activeGroupCode || !currentGroupData) return;
    const isCurrentlyMuted = currentGroupData.isMuted || false;
    const groupRef = ref(db, 'groups/' + activeGroupCode);
    await update(groupRef, { isMuted: !isCurrentlyMuted });
});

function renderMessages(messagesObj) {
    chatMessages.innerHTML = '';
    if (!messagesObj) return;

    const messagesArray = Object.values(messagesObj);

    messagesArray.forEach(m => {
        const msgDiv = document.createElement('div');
        msgDiv.className = "bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 max-w-[85%]";
        msgDiv.innerHTML = `
            <div class="flex justify-between items-center gap-4 mb-1">
                <strong class="text-[11px] text-ocean dark:text-ocean-light">${m.sender}</strong>
                <span class="text-[9px] text-gray-400">${m.time}</span>
            </div>
            <p class="text-xs text-gray-700 dark:text-gray-200">${m.text}</p>
        `;
        chatMessages.appendChild(msgDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendChatBtn.addEventListener('click', () => {
    if (currentGroupData && currentGroupData.isMuted) return;
    const text = chatInput.value.trim();
    if (!text || !activeGroupCode) return;

    const userName = getUserName();
    const messagesRef = ref(db, `groups/${activeGroupCode}/messages`);
    push(messagesRef, {
        sender: userName,
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    chatInput.value = '';
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatBtn.click();
    }
});

document.getElementById('copyInviteLinkBtn').addEventListener('click', () => {
    if (activeGroupCode) {
        navigator.clipboard.writeText(activeGroupCode).then(() => {
            alert(currentLanguage === 'ar' ? 'تم نسخ رمز المجموعة للحافظة!' : 'Group code copied to clipboard!');
        }).catch(() => {
            const dummy = document.createElement("input");
            document.body.appendChild(dummy);
            dummy.value = activeGroupCode;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert(currentLanguage === 'ar' ? 'تم نسخ رمز المجموعة للحافظة!' : 'Group code copied to clipboard!');
        });
    }
});

/* ================= CONTACT FORM MODULE ================= */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'جاري الإرسال...';
    submitBtn.disabled = true;

    const templateParams = {
        from_name: document.getElementById('cName').value,
        reply_to: document.getElementById('cEmail').value,
        message: document.getElementById('cMessage').value
    };

    emailjs.send('service_xh7i5tn', 'template_sc7urvf', templateParams)
        .then(() => {
            document.getElementById('contactSuccessMsg').classList.remove('hidden');
            submitBtn.textContent = 'إرسال الرسالة';
            submitBtn.disabled = false;
            this.reset();

            setTimeout(() => {
                document.getElementById('contactSuccessMsg').classList.add('hidden');
            }, 4000);
        }, (error) => {
            alert('حدث خطأ أثناء الإرسال، يرجى التأكد من البيانات والمحاولة مجدداً.');
            console.error('EmailJS Error Details:', error);
            submitBtn.textContent = 'إرسال الرسالة';
            submitBtn.disabled = false;
        });
});

/* INITIALIZE ALL COMPONENTS */
function initializeAppMain() {
    totalSeconds = getPhaseDuration();
    remainingSeconds = totalSeconds;
    loadTheme();
    loadHistory();
    renderSummaries();
    renderHabits();
    renderGroups();
    updateLanguage();
    updateScreen();
}

initializeAppMain();