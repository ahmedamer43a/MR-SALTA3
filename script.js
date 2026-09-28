/* === إعدادات Firebase المدمجة للمنتجات والشات (Online Realtime) === */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdw_Y0GNqHkjnyIgEhRNUQxN55d7UPOJE",
  authDomain: "souqnachatapp.firebaseapp.com",
  databaseURL: "https://souqnachatapp-default-rtdb.firebaseio.com",
  projectId: "souqnachatapp",
  storageBucket: "souqnachatapp.firebasestorage.app",
  messagingSenderId: "625760163639",
  appId: "1:625760163639:web:be5ab0f15544bd2c076cb2",
  measurementId: "G-FBE3SD6LG9"
};
// تهيئة Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}
const dbRef = firebase.database();

/* === إعدادات خدمة العملاء عبر EmailJS === */
const EMAILJS_SERVICE_ID = "service_qa0q2wm";
const EMAILJS_TEMPLATE_ID = "template_sc7urvf";
const EMAILJS_PUBLIC_KEY = "5iANM1rMJkKELMYmC";

(function(){
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

const translations = {
    ar: {
        pageTitle: "سُوقنا - منصة الإعلانات المبوبة والعمولة",
        brandName: "سُوقـنَا",
        brandSub: "منصة الإعلانات والعمولة الموثوقة",
        navHome: "الرئيسية",
        navCategories: "الأقسام",
        navAddAd: "أضف إعلانك الآن",
        btnLogin: "تسجيل الدخول",
        btnRegister: "حساب جديد",
        heroBadge: "المنصة الآمنة للبيع والشراء بنظام العمولة",
        heroTitle: "اعرض منتجك أو ابحث عما تريده بثقة وأمان",
        heroDesc: "لابتوبات، سيارات، هواتف، عقارات والمزيد.. تواصل مباشرة مع البائع عبر الشات المخصص لكل منتج أو واتساب.",
        searchPlaceholder: "ابحث عن لابتوب، سيارة، شقة...",
        catAll: "جميع الأقسام",
        catLaptops: "لابتوبات وإلكترونيات",
        catPhones: "هواتف محمولة",
        catCars: "سيارات ومركبات",
        catRealEstate: "عقارات وبيوت",
        btnSearch: "بحث سريع",
        secCategories: "الأقسام الرئيسية",
        secLatestAds: "أحدث العروض والمنتجات المضافة أونلاين",
        backHome: "الرئيسية",
        condLabel: "الحالة:",
        descLabel: "وصف المنتج:",
        verifiedSeller: "عضو موثق في المنصة • تم التحقق من الهوية",
        whatsappContact: "تواصل واتساب",
        chatTitle: "شات الشراء الخاص بهذا المنتج",
        chatPlaceholder: "اكتب رسالتك للمشتري أو البائع...",
        addProdTitle: "إضافة منتج جديد للبيع",
        addProdSub: "املأ بيانات المنتج بدقة ليظهر فوراً لكل الناس أونلاين",
        lblAdTitle: "عنوان الإعلان",
        phAdTitle: "مثال: لابتوب Apple MacBook Pro بحالة الزيروو",
        lblCategory: "القسم",
        lblPrice: "السعر (ج.م أو بالدولار)",
        lblCondition: "حالة المنتج",
        condNew: "جديد تماماً (زيروو)",
        condLikeNew: "استعمال خفيف بحالة الجديد",
        condGood: "استعمال متوسط بحالة جيدة",
        lblLocation: "المدينة / المحافظة",
        lblImages: "صور المنتج (اختر حتى 6 صور)",
        uploadPrompt: "انقر لاختيار الصور أو اسحبها هنا (بحد أقصى 6 صور)",
        lblDesc: "وصف تفصيلي للمنتج",
        phDesc: "اكتب المواصفات والعيوب إن وجدت لضمان المصداقية...",
        btnCancel: "إلغاء",
        btnPublish: "نشر الإعلان الآن",
        dashTitle: "لوحة تحكم البائع وإعلاناته",
        dashSub: "إدارة إعلاناتك، متابعة الصفقات وحالة المحادثات الخاصة بك.",
        statMyAds: "إعلاناتي النشطة",
        statActiveChats: "المحادثات النشطة مع المشترين",
        statCommission: "العمولة المستحقة للمنصة",
        myAdsTitle: "إعلاناتي المعروضة",
        emptyAdsMsg: "لا توجد أي إعلانات معروضة حالياً. كن أول من يضيف منتجاً!",
        noChatsMsg: "لا توجد رسائل سابقة. ابدأ المحادثة الآن مع البائع بخصوص هذا المنتج!"
    },
    en: {
        pageTitle: "Souqna - Classified Ads & Commission Platform",
        brandName: "SOUQNA",
        brandSub: "Trusted Marketplace & Commission System",
        navHome: "Home",
        navCategories: "Categories",
        navAddAd: "Post Ad Now",
        btnLogin: "Login",
        btnRegister: "Register",
        heroBadge: "Secure Buying & Selling Platform",
        heroTitle: "List Your Product or Find What You Need Safely",
        heroDesc: "Laptops, cars, phones, real estate & more. Chat directly with sellers per product or via WhatsApp.",
        searchPlaceholder: "Search laptops, cars, apartments...",
        catAll: "All Categories",
        catLaptops: "Laptops & Electronics",
        catPhones: "Mobile Phones",
        catCars: "Cars & Vehicles",
        catRealEstate: "Real Estate",
        btnSearch: "Search",
        secCategories: "Main Categories",
        secLatestAds: "Latest Online Listed Products",
        backHome: "Back to Home",
        condLabel: "Condition:",
        descLabel: "Product Description:",
        verifiedSeller: "Verified Member • Identity Confirmed",
        whatsappContact: "WhatsApp Contact",
        chatTitle: "Product-Specific Purchase Chat",
        chatPlaceholder: "Type your message to seller/buyer...",
        addProdTitle: "Add New Product for Sale",
        addProdSub: "Fill in product details accurately to list it instantly online",
        lblAdTitle: "Ad Title",
        phAdTitle: "e.g., Apple MacBook Pro in pristine condition",
        lblCategory: "Category",
        lblPrice: "Price (USD / EGP)",
        lblCondition: "Condition",
        condNew: "Brand New (Zero)",
        condLikeNew: "Lightly Used (Like New)",
        condGood: "Moderately Used (Good)",
        lblLocation: "City / Location",
        lblImages: "Product Images (Select up to 6 images)",
        uploadPrompt: "Click to select or drag images here (Max 6 images)",
        lblDesc: "Detailed Description",
        phDesc: "Write specs and any defects for transparency...",
        btnCancel: "Cancel",
        btnPublish: "Publish Ad Now",
        dashTitle: "Seller Dashboard & Ads",
        dashSub: "Manage your listings, track deals, and monitor chats.",
        statMyAds: "My Active Ads",
        statActiveChats: "Active Chats",
        statCommission: "Platform Commission",
        myAdsTitle: "My Listed Products",
        emptyAdsMsg: "No products listed yet. Be the first to add one!",
        noChatsMsg: "No messages yet. Start the conversation with the seller!"
    }
};

let currentLang = localStorage.getItem('souqna_lang') || 'ar';
let currentTheme = localStorage.getItem('souqna_theme') || 'light';

let products = [];
let productChats = {};
let currentUser = JSON.parse(localStorage.getItem('souqna_user')) || null;
let currentAuthMode = 'login';
let activeProductId = null;
let selectedProductImages = [];

window.onload = function() {
    applyTheme(currentTheme);
    applyLanguage(currentLang);
    checkSessionState();
    initRealtimeDatabaseListeners();
};

// الاستماع للبيانات مباشرة أونلاين من الـ Firebase لتحديث المنتجات لكل الزوار تلقائياً
function initRealtimeDatabaseListeners() {
    dbRef.ref('products').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            products = Object.values(data).reverse(); // أحدث الإعلانات فوق
        } else {
            products = [];
        }
        renderProducts(products);
        if (document.getElementById('dashboardView') && !document.getElementById('dashboardView').classList.contains('hidden')) {
            renderSellerDashboard();
        }
    });

    dbRef.ref('chats').on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            productChats = data;
        } else {
            productChats = {};
        }
        if (activeProductId) {
            renderChatMessages();
        }
    });
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('souqna_theme', currentTheme);
    applyTheme(currentTheme);
}

function applyTheme(theme) {
    const root = document.documentElement;
    const icon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        root.classList.add('dark');
        icon.className = 'fa-solid fa-sun';
    } else {
        root.classList.remove('dark');
        icon.className = 'fa-solid fa-moon';
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('souqna_lang', currentLang);
    applyLanguage(currentLang);
    renderProducts(products);
}

function applyLanguage(lang) {
    const htmlRoot = document.getElementById('htmlRoot');
    htmlRoot.setAttribute('lang', lang);
    htmlRoot.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.getElementById('langLabel').innerText = lang === 'ar' ? 'EN' : 'AR';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });
}

function switchView(viewName) {
    document.getElementById('homeView').classList.add('hidden');
    document.getElementById('productDetailView').classList.add('hidden');
    document.getElementById('addProductView').classList.add('hidden');
    document.getElementById('dashboardView').classList.add('hidden');

    if (viewName === 'home') {
        document.getElementById('homeView').classList.remove('hidden');
    } else if (viewName === 'productDetail') {
        document.getElementById('productDetailView').classList.remove('hidden');
    } else if (viewName === 'addProduct') {
        document.getElementById('addProductView').classList.remove('hidden');
        selectedProductImages = [];
        document.getElementById('imagePreviewContainer').innerHTML = '';
    } else if (viewName === 'dashboard') {
        document.getElementById('dashboardView').classList.remove('hidden');
        renderSellerDashboard();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSupportWidget() {
    const box = document.getElementById('supportWidgetBox');
    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
        setTimeout(() => {
            box.classList.remove('scale-95', 'opacity-0');
            box.classList.add('scale-100', 'opacity-100');
        }, 10);
    } else {
        box.classList.remove('scale-100', 'opacity-100');
        box.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            box.classList.add('hidden');
        }, 300);
    }
}

function submitSupportTicket(e) {
    e.preventDefault();
    const name = document.getElementById('supportName').value;
    const email = document.getElementById('supportEmail').value;
    const message = document.getElementById('supportMessage').value;
    const submitBtn = document.getElementById('supportSubmitBtn');

    submitBtn.disabled = true;
    submitBtn.innerText = "جاري الإرسال...";

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "مدير الموقع"
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            showToast(`شكراً لك يا ${name}، تم إرسال رسالتك لبريدك الشخصي بنجاح!`);
            document.getElementById('supportForm').reset();
            toggleSupportWidget();
            submitBtn.disabled = false;
            submitBtn.innerText = "إرسال الشكوى للدعم";
        }, function(error) {
            console.error('EmailJS Error:', error);
            showToast("حدث خطأ أثناء الإرسال.", "error");
            submitBtn.disabled = false;
            submitBtn.innerText = "إرسال الشكوى للدعم";
        });
}

function handleImageSelection(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (selectedProductImages.length + files.length > 6) {
        showToast(currentLang === 'ar' ? "عذراً، الحد الأقصى المسموح به هو 6 صور فقط!" : "Maximum 6 images allowed!");
        return;
    }

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(uploadEvent) {
            selectedProductImages.push(uploadEvent.target.result);
            renderImagePreviews();
        };
        reader.readAsDataURL(file);
    });
}

function renderImagePreviews() {
    const container = document.getElementById('imagePreviewContainer');
    container.innerHTML = selectedProductImages.map((imgSrc, index) => `
        <div class="relative rounded-xl overflow-hidden h-20 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group">
            <img src="${imgSrc}" class="w-full h-full object-cover">
            <button type="button" onclick="removeSelectedImage(${index})" class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow hover:bg-red-700 transition">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `).join('');
}

function removeSelectedImage(index) {
    selectedProductImages.splice(index, 1);
    renderImagePreviews();
}

function renderProducts(list) {
    const grid = document.getElementById('productsGrid');
    document.getElementById('productCountBadge').innerText = list.length + (currentLang === 'ar' ? ' إعلان' : ' Ads');
    
    if (list.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-16 text-center text-slate-400 font-bold">${translations[currentLang].emptyAdsMsg}</div>`;
        return;
    }

    grid.innerHTML = list.map(p => {
        const mainImg = (p.images && p.images.length > 0) ? p.images[0] : (p.image || 'https://placehold.co/600x400/e2e8f0/475569?text=Product');
        return `
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group cursor-pointer" onclick="openProductDetail(${p.id})">
                <div class="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                    <img src="${mainImg}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://placehold.co/600x400/e2e8f0/475569?text=Product'">
                    <span class="absolute top-3 right-3 bg-indigo-600/95 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                        ${getCategoryDisplayName(p.category)}
                    </span>
                </div>
                <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-xs text-slate-500 dark:text-slate-400"><i class="fa-solid fa-location-dot"></i> ${p.location}</span>
                            <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">${p.condition}</span>
                        </div>
                        <h4 class="font-bold text-slate-800 dark:text-slate-100 text-base line-clamp-1 group-hover:text-indigo-600 transition">${p.title}</h4>
                    </div>
                    <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div>
                            <span class="text-xs text-slate-400 block">${currentLang === 'ar' ? 'السعر' : 'Price'}</span>
                            <span class="text-lg font-black text-emerald-600 dark:text-emerald-400">${Number(p.price).toLocaleString()} ${currentLang === 'ar' ? 'ج.م' : 'EGP'}</span>
                        </div>
                        <button class="bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-600 text-indigo-600 dark:text-indigo-300 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
                            <i class="fa-solid fa-comments"></i> ${currentLang === 'ar' ? 'تفاصيل وشات' : 'Chat & Details'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function getCategoryDisplayName(cat) {
    const map = {
        laptops: translations[currentLang].catLaptops,
        phones: translations[currentLang].catPhones,
        cars: translations[currentLang].catCars,
        realestate: translations[currentLang].catRealEstate
    };
    return map[cat] || cat;
}

function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cat = document.getElementById('categoryFilterSelect').value;

    const filtered = products.filter(p => {
        const matchQuery = p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
        const matchCat = (cat === 'all' || p.category === cat);
        return matchQuery && matchCat;
    });
    renderProducts(filtered);
}

function filterByCategory(cat) {
    document.getElementById('categoryFilterSelect').value = cat;
    filterProducts();
    switchView('home');
}

function openProductDetail(id) {
    activeProductId = id;
    const p = products.find(x => x.id === id);
    if (!p) return;

    const imagesList = (p.images && p.images.length > 0) ? p.images : [p.image || 'https://placehold.co/600x400/e2e8f0/475569?text=Product'];

    document.getElementById('detailImage').src = imagesList[0];
    document.getElementById('detailCategoryBadge').innerText = getCategoryDisplayName(p.category);
    document.getElementById('detailTitle').innerText = p.title;
    document.getElementById('detailPrice').innerText = Number(p.price).toLocaleString() + (currentLang === 'ar' ? ' ج.م' : ' EGP');
    document.getElementById('detailLocation').innerText = p.location;
    document.getElementById('detailCondition').innerText = p.condition;
    document.getElementById('detailDescription').innerText = p.description;
    document.getElementById('sellerName').innerText = p.sellerName || 'بائع معتمد';
    document.getElementById('sellerInitial').innerText = (p.sellerName || 'ب').charAt(0);

    const thumbContainer = document.getElementById('detailThumbnailsContainer');
    if (imagesList.length > 1) {
        thumbContainer.innerHTML = imagesList.map((imgSrc, idx) => `
            <div onclick="document.getElementById('detailImage').src='${imgSrc}'" class="w-16 h-16 rounded-xl overflow-hidden border-2 border-transparent hover:border-indigo-600 cursor-pointer bg-slate-100 flex-shrink-0">
                <img src="${imgSrc}" class="w-full h-full object-cover">
            </div>
        `).join('');
    } else {
        thumbContainer.innerHTML = '';
    }

    const waPhone = p.sellerPhone || '201000000000';
    const waMsg = encodeURIComponent(`مرحباً، أنا مهتم بالإعلان الخاص بك على موقع سُوقنا: ${p.title}`);
    document.getElementById('whatsappBtn').href = `https://wa.me/${waPhone}?text=${waMsg}`;

    renderChatMessages();
    switchView('productDetail');
}

function renderChatMessages() {
    const container = document.getElementById('chatMessagesContainer');
    if (!productChats[activeProductId]) {
        productChats[activeProductId] = [];
    }
    const messages = productChats[activeProductId];
    const messagesArray = Array.isArray(messages) ? messages : Object.values(messages);

    if (messagesArray.length === 0) {
        container.innerHTML = `<div class="text-center text-xs text-slate-400 py-6 font-semibold">${translations[currentLang].noChatsMsg}</div>`;
        return;
    }

    container.innerHTML = messagesArray.map(msg => {
        const isMine = currentUser && msg.senderEmail === currentUser.email;
        return `
            <div class="flex flex-col ${isMine ? 'items-end' : 'items-start'} space-y-1">
                <div class="max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-sm ${isMine ? 'bg-indigo-600 text-white rounded-bl-none' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-br-none'}">
                    <p class="font-bold text-[10px] opacity-75 mb-0.5">${msg.senderName}</p>
                    <p class="leading-relaxed">${msg.text}</p>
                </div>
                <span class="text-[9px] text-slate-400 px-1">${msg.time}</span>
            </div>
        `;
    }).join('');
    container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
    if (!currentUser) {
        showToast(currentLang === 'ar' ? "يجب تسجيل الدخول أولاً لإرسال رسالة!" : "Please login first to chat!");
        openAuthModal('login');
        return;
    }

    const input = document.getElementById('chatInputMessage');
    const text = input.value.trim();
    if (!text) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMsg = {
        senderEmail: currentUser.email,
        senderName: currentUser.fullName,
        text: text,
        time: timeStr
    };

    dbRef.ref('chats/' + activeProductId).push(newMsg);
    input.value = '';
}

function checkAuthAndOpen(view) {
    if (!currentUser) {
        showToast(currentLang === 'ar' ? "يجب تسجيل الدخول أولاً للمتابعة ونشر المنتجات!" : "Please login first to proceed!");
        openAuthModal('login');
        return;
    }
    switchView(view);
}

function handleAddNewProduct(e) {
    e.preventDefault();
    if (!currentUser) {
        showToast("يجب تسجيل الدخول أولاً");
        return;
    }

    if (selectedProductImages.length === 0) {
        showToast(currentLang === 'ar' ? "يرجى رفع صورة واحدة على الأقل للمنتج!" : "Please upload at least one image!");
        return;
    }

    const publishBtn = document.getElementById('publishBtn');
    publishBtn.disabled = true;
    publishBtn.innerText = "جاري النشر أونلاين...";

    const newId = Date.now();
    const newProd = {
        id: newId,
        title: document.getElementById('newTitle').value,
        category: document.getElementById('newCategory').value,
        price: Number(document.getElementById('newPrice').value),
        condition: document.getElementById('newCondition').value,
        location: document.getElementById('newLocation').value,
        images: selectedProductImages,
        image: selectedProductImages[0],
        description: document.getElementById('newDescription').value,
        sellerEmail: currentUser.email,
        sellerName: currentUser.fullName,
        sellerPhone: currentUser.phone
    };

    // رفع المنتج لقاعدة البيانات أونلاين لكي يراه الجميع
    dbRef.ref('products/' + newId).set(newProd)
        .then(() => {
            // إضافة رسالة ترحيبية أولية بالشات
            const initialChat = {
                senderEmail: currentUser.email,
                senderName: currentUser.fullName,
                text: currentLang === 'ar' ? "مرحباً بكم، هذا المنتج متاح الآن وجاهز للمعاينة والشراء عبر المنصة بنظام العمولة." : "Hello, this product is available for purchase.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            dbRef.ref('chats/' + newId).push(initialChat);

            showToast(currentLang === 'ar' ? "تم نشر إعلانك أونلاين بنجاح لكل الزوار!" : "Ad published online successfully!");
            document.getElementById('addProductForm').reset();
            selectedProductImages = [];
            document.getElementById('imagePreviewContainer').innerHTML = '';
            publishBtn.disabled = false;
            publishBtn.innerText = "نشر الإعلان الآن";
            switchView('home');
        })
        .catch((error) => {
            console.error(error);
            showToast("حدث خطأ أثناء النشر أونلاين.", "error");
            publishBtn.disabled = false;
            publishBtn.innerText = "نشر الإعلان الآن";
        });
}

function openAuthModal(mode) {
    currentAuthMode = mode;
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authModalTitle');
    const extraFields = document.getElementById('registerExtraFields');
    const toggleText = document.getElementById('authToggleText');
    const submitBtn = document.getElementById('authSubmitBtn');
    
    document.getElementById('authForm').reset();

    if (mode === 'login') {
        title.innerText = currentLang === 'ar' ? "تسجيل الدخول" : "Login";
        submitBtn.innerText = currentLang === 'ar' ? "تسجيل الدخول" : "Login";
        extraFields.classList.add('hidden');
        toggleText.innerHTML = `${currentLang === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"} <button onclick="toggleAuthMode()" class="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">${currentLang === 'ar' ? 'أنشئ حساباً جديداً' : 'Register'}</button>`;
    } else {
        title.innerText = currentLang === 'ar' ? "إنشاء حساب جديد" : "Create Account";
        submitBtn.innerText = currentLang === 'ar' ? "إنشاء الحساب ودخول" : "Register & Login";
        extraFields.classList.remove('hidden');
        toggleText.innerHTML = `${currentLang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'} <button onclick="toggleAuthMode()" class="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">${currentLang === 'ar' ? 'تسجيل الدخول' : 'Login'}</button>`;
    }

    modal.classList.remove('hidden');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function toggleAuthMode() {
    openAuthModal(currentAuthMode === 'login' ? 'register' : 'login');
}

function handleAuthSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;

    if (currentAuthMode === 'register') {
        currentUser = {
            email,
            fullName: document.getElementById('authFullName').value || "عميل موثق",
            phone: document.getElementById('authPhone').value || "201012345678"
        };
        showToast(currentLang === 'ar' ? "تم إنشاء الحساب وتسجيل الدخول بنجاح!" : "Account created successfully!");
    } else {
        currentUser = {
            email,
            fullName: email.split('@')[0],
            phone: "201012345678"
        };
        showToast(currentLang === 'ar' ? "تم تسجيل الدخول بنجاح!" : "Logged in successfully!");
    }

    localStorage.setItem('souqna_user', JSON.stringify(currentUser));
    closeAuthModal();
    checkSessionState();
}

function checkSessionState() {
    const headerSection = document.getElementById('authHeaderSection');
    if (currentUser) {
        headerSection.innerHTML = `
            <div class="flex items-center gap-3">
                <button onclick="switchView('dashboard')" class="bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2">
                    <i class="fa-solid fa-gauge-high"></i> <span data-i18n="navDashboard">لوحة التحكم</span>
                </button>
                <div class="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow">
                    ${currentUser.fullName.charAt(0)}
                </div>
                <button onclick="handleLogout()" class="text-slate-400 hover:text-red-600 text-sm" title="خروج">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        `;
    } else {
        headerSection.innerHTML = `
            <button onclick="openAuthModal('login')" class="px-4 py-2 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition text-sm">
                ${translations[currentLang].btnLogin}
            </button>
            <button onclick="openAuthModal('register')" class="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition text-sm">
                ${translations[currentLang].btnRegister}
            </button>
        `;
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('souqna_user');
    checkSessionState();
    switchView('home');
    showToast(currentLang === 'ar' ? "تم تسجيل الخروج بنجاح." : "Logged out successfully.");
}

function renderSellerDashboard() {
    if (!currentUser) return;
    const myProds = products.filter(p => p.sellerEmail === currentUser.email);
    document.getElementById('statMyProductsCount').innerText = myProds.length;

    let chatCount = 0;
    myProds.forEach(p => {
        if (productChats[p.id]) {
            chatCount += Object.keys(productChats[p.id]).length;
        }
    });
    document.getElementById('statActiveChatsCount').innerText = chatCount;
    
    const container = document.getElementById('myProductsListContainer');
    if (myProds.length === 0) {
        container.innerHTML = `<div class="text-center text-xs text-slate-400 py-6">${currentLang === 'ar' ? 'ليس لديك أي إعلانات منشورة حتى الآن.' : 'You have no listed products yet.'}</div>`;
        return;
    }

    container.innerHTML = myProds.map(p => {
        const thumb = (p.images && p.images[0]) ? p.images[0] : (p.image || 'https://placehold.co/100x100');
        return `
            <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div class="flex items-center gap-4">
                    <img src="${thumb}" class="w-16 h-16 object-cover rounded-xl" onerror="this.src='https://placehold.co/100x100'">
                    <div>
                        <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm">${p.title}</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400">${p.location} • <span class="text-emerald-600 dark:text-emerald-400 font-bold">${Number(p.price).toLocaleString()} ${currentLang === 'ar' ? 'ج.م' : 'EGP'}</span></p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="openProductDetail(${p.id})" class="bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition">
                        <i class="fa-solid fa-comments"></i> ${currentLang === 'ar' ? 'الشات' : 'Chat'}
                    </button>
                    <button onclick="deleteProduct(${p.id})" class="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function deleteProduct(id) {
    dbRef.ref('products/' + id).remove()
        .then(() => {
            dbRef.ref('chats/' + id).remove();
            showToast(currentLang === 'ar' ? "تم حذف الإعلان بنجاح أونلاين" : "Ad deleted successfully online");
        })
        .catch(err => {
            console.error(err);
            showToast("حدث خطأ أثناء الحذف.", "error");
        });
}

function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const msg = document.getElementById('toastMessage');
    msg.innerText = message;
    
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 4000);
}