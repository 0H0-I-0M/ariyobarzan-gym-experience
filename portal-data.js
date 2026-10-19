export const DEMO=true;
export const membership=[
 {id:'member12',kind:'membership',name:'عضویت ۱۲ جلسه',subtitle:'شروع منظم',price:1600000,visits:12,duration:'۳۰ روز',tag:'شروع',features:['۱۲ نوبت حضور در سالن','انتخاب برنامهٔ عمومی در سایت','ثبت جلسات روی همین دستگاه']},
 {id:'member16',kind:'membership',name:'عضویت ۱۶ جلسه',subtitle:'ریتم پیشرفت',price:2000000,visits:16,duration:'۳۰ روز',tag:'پیشنهاد ارائه',features:['۱۶ نوبت حضور در سالن','دسترسی به کتابخانهٔ حرکات','پیشنهاد مناسب تمرین منظم']},
 {id:'member30',kind:'membership',name:'عضویت ۳۰ جلسه',subtitle:'یک ماه با قدرت',price:2600000,visits:30,duration:'۳۰ روز',tag:'کامل',features:['۳۰ نوبت حضور در سالن','دفترچهٔ ثبت تمرین','امکان افزودن درخواست مربی']}
];
export const products=[
 {id:'shaker',kind:'product',name:'شیکر ورزشی',category:'accessory',categoryName:'اکسسوری',price:450000,stock:12,variants:['مشکی','فیروزه‌ای'],image:'assets/shop/shaker.svg',description:'طرح نمونهٔ شیکر ۷۰۰ میلی‌لیتری با محفظهٔ مخلوط‌کن؛ مشخصات نهایی با تأیید فروشگاه.'},
 {id:'band',kind:'product',name:'کش تمرین حلقه‌ای',category:'training',categoryName:'تمرین',price:390000,stock:8,variants:['مقاومت سبک','مقاومت متوسط'],image:'assets/shop/band.svg',description:'طرح نمونهٔ کش مقاومتی حلقه‌ای برای تمرین؛ مقاومت و جنس محصول نهایی باید تأیید شود.'},
 {id:'gloves',kind:'product',name:'دستکش تمرین',category:'wear',categoryName:'پوشیدنی',price:580000,stock:6,variants:['M','L','XL'],image:'assets/shop/gloves.svg',description:'طرح نمونهٔ دستکش تمرین با کف تقویت‌شده؛ انتخاب اندازه در سبد نمونه ذخیره می‌شود.'},
 {id:'straps',kind:'product',name:'بند لیفت',category:'training',categoryName:'تمرین',price:320000,stock:10,variants:['مشکی'],image:'assets/shop/straps.svg',description:'طرح نمونهٔ یک جفت بند لیفت پارچه‌ای؛ استفاده و تنظیم آن را از مربی بپرس.'},
 {id:'towel',kind:'product',name:'حولهٔ ورزشی',category:'accessory',categoryName:'اکسسوری',price:270000,stock:15,variants:['طوسی','نارنجی'],image:'assets/shop/towel.svg',description:'طرح نمونهٔ حولهٔ تمرین سبک؛ اندازه، رنگ و موجودی واقعی پس از تأیید باشگاه.'},
 {id:'mat',kind:'product',name:'مت تمرین',category:'training',categoryName:'تمرین',price:690000,stock:5,variants:['سرمه‌ای','بنفش'],image:'assets/shop/mat.svg',description:'طرح نمونهٔ مت تمرین برای حرکات زمینی؛ ضخامت و جنس نهایی باید تأیید شود.'}
];
export const festivals=[
 {id:'start',name:'شروعِ قدرتمند',code:'START10',percent:10,cap:250000,min:500000,scope:'all',members:0,description:'۱۰٪ تخفیف نمونه روی سبد حداقل ۵۰۰ هزار تومان، تا سقف ۲۵۰ هزار تومان.',image:'assets/posters/start-strong.webp',tone:'heat'},
 {id:'partner',name:'با هم، قوی‌تر',code:'PARTNER20',percent:20,cap:500000,min:0,scope:'membership',members:2,description:'۲۰٪ تخفیف نمونه روی عضویت، با انتخاب دست‌کم دو عضویت؛ سقف ۵۰۰ هزار تومان.',image:'assets/posters/own-moment.webp',tone:'ocean'}
];
export const exercises=[
 {id:'squat',name:'اسکوات با وزن بدن',english:'BODYWEIGHT SQUAT',muscle:'پا',equipment:'وزن بدن',level:'پایه',steps:['پاها را در وضعیتی راحت و پایدار قرار بده.','از لگن و زانو به‌آرامی پایین برو؛ زانوها هم‌راستای پا باشند.','با حفظ وضعیت طبیعی پشت، کنترل‌شده به شروع برگرد.'],mistake:'جمع شدن زانوها به داخل یا قوس زیاد کمر.',source:'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/squat/vid-20084663'},
 {id:'lunge',name:'لانج ثابت',english:'STATIONARY LUNGE',muscle:'پا',equipment:'وزن بدن',level:'پایه',steps:['پاها را به حالت گام، با تعادل قرار بده.','تنه را ثابت نگه دار و زانوی جلو را هم‌راستای پا پایین ببر.','فقط تا دامنه‌ای برو که فرم و تعادل حفظ می‌شود.'],mistake:'چرخش زانو به داخل یا بیرون، یا ادامه با افت فرم.',source:'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/lunge/vid-20084662'},
 {id:'pushup',name:'شنا روی زانو',english:'MODIFIED PUSH-UP',muscle:'سینه',equipment:'وزن بدن',level:'پایه',steps:['روی دست‌ها و زانوها قرار بگیر و شکم را فعال نگه دار.','پشت صاف بماند؛ آرنج‌ها را آرام خم کن.','بدون ضربه و با حفظ خط تنه، بالا بیا.'],mistake:'افتادن لگن یا قوس دادن پشت در مسیر حرکت.',source:'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/modified-pushup/vid-20084674'},
 {id:'chest',name:'پرس سینه دمبل',english:'DUMBBELL CHEST PRESS',muscle:'سینه',equipment:'دمبل',level:'تکنیکی',steps:['روی نیمکت پایدار قرار بگیر؛ سر در وضعیت طبیعی باشد.','دمبل‌ها را آرام بالا ببر و پیش از قفل شدن آرنج متوقف کن.','کنترل‌شده برگرد؛ آرنج‌ها را بیش از خط تنه پایین نبر.'],mistake:'قفل کردن آرنج یا پایین بردن بیش از حد وزنه.',source:'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/chest-press/vid-20084677'},
 {id:'curl',name:'جلو بازو دمبل',english:'DUMBBELL BICEPS CURL',muscle:'بازو',equipment:'دمبل',level:'پایه',steps:['آرنج را نزدیک بدن و مچ را صاف نگه دار.','بدون تاب دادن تنه، دمبل را بالا بیاور.','با کنترل و به‌آرامی پایین ببر.'],mistake:'تاب دادن بازو یا خم کردن مچ برای بلند کردن وزنه.',source:'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/biceps-curl/vid-20084675'},
 {id:'row',name:'زیربغل هالتر خم',english:'BENT-OVER ROW',muscle:'پشت',equipment:'هالتر',level:'تکنیکی',steps:['از لگن خم شو و زانو را کمی خم نگه دار.','با پشت ثابت، هالتر را به سمت ناف بکش.','وزنه را آرام برگردان و وضعیت تنه را حفظ کن.'],mistake:'گرد شدن پشت یا کشیدن ناگهانی وزنه.',source:'https://www.acefitness.org/resources/everyone/exercise-library/12/bent-over-row/'},
 {id:'lat',name:'لت سیم‌کش از جلو',english:'LAT PULL-DOWN',muscle:'پشت',equipment:'دستگاه',level:'تکنیکی',steps:['نشستن و نگهدارندهٔ پا را با راهنمایی مربی تنظیم کن.','با سینهٔ بالا، میله را به سمت جلوی سینه بکش.','آرام برگرد؛ لازم نیست میله حتماً به سینه بچسبد.'],mistake:'کشیدن میله پشت گردن یا کشش اجباری و بیش از دامنه.',source:'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/lat-pull-down/vid-20084683'}
];
export const programs=[
 {id:'foundation',name:'آشنایی با تمرین',english:'FOUNDATION',tag:'نمونهٔ عمومی',days:2,description:'یک نمونهٔ عمومی برای آشنایی با ساختار جلسه و ثبت تمرین؛ شخصی‌سازی نشده است.',sessions:[{title:'جلسهٔ A · الگوهای پایه',moves:[['squat',2,'۸–۱۲'],['pushup',2,'۸–۱۲'],['curl',2,'۸–۱۲']]},{title:'جلسهٔ B · کنترل و تعادل',moves:[['lunge',2,'۸–۱۲ هر سمت'],['lat',2,'۸–۱۲'],['chest',2,'۸–۱۲']]}]},
 {id:'strength',name:'ساختار قدرت',english:'STRENGTH',tag:'نمونهٔ عمومی',days:3,description:'نمونهٔ نمایشی سه جلسه برای دیدن برنامه، آموزش حرکت و دفتر ثبت؛ وزنه و دامنه با مربی تعیین می‌شود.',sessions:[{title:'جلسهٔ A · پایین‌تنه',moves:[['squat',2,'۸–۱۲'],['lunge',2,'۸–۱۲ هر سمت'],['curl',2,'۸–۱۲']]},{title:'جلسهٔ B · بالاتنه',moves:[['chest',2,'۸–۱۲'],['lat',2,'۸–۱۲'],['curl',2,'۸–۱۲']]},{title:'جلسهٔ C · ترکیبی',moves:[['squat',2,'۸–۱۲'],['row',2,'۸–۱۲'],['pushup',2,'۸–۱۲']]}]},
 {id:'return',name:'فرم و کنترل',english:'CONTROL',tag:'نمونهٔ عمومی',days:2,description:'الگوی عمومی برای نمایش سرعت کنترل‌شدهٔ حرکات و ثبت جلسات؛ جایگزین برنامهٔ مربی نیست.',sessions:[{title:'جلسهٔ A · کنترل حرکت',moves:[['squat',2,'۸–۱۲'],['chest',2,'۸–۱۲'],['lat',2,'۸–۱۲']]},{title:'جلسهٔ B · الگوی کامل',moves:[['lunge',2,'۸–۱۲ هر سمت'],['pushup',2,'۸–۱۲'],['curl',2,'۸–۱۲']]}]}
];
export const catalog=[...membership,...products];
export const faNumber=value=>new Intl.NumberFormat('fa-IR').format(value);
export const money=value=>faNumber(value)+' تومان';
export function calculateCart(cart,code=''){
 const lines=cart.map(item=>{const product=catalog.find(p=>p.id===item.id);return product?{...item,product,qty:Math.max(1,Math.min(20,Math.trunc(Number(item.qty)||1)))}:null;}).filter(Boolean);
 const subtotal=lines.reduce((s,l)=>s+l.product.price*l.qty,0);const coupon=festivals.find(f=>f.code===code.trim().toUpperCase());let discount=0,error='';
 if(code&&!coupon)error='این کد در جشنواره‌های نمونه تعریف نشده است.';
 if(coupon){const memberships=lines.filter(l=>l.product.kind==='membership').reduce((s,l)=>s+l.qty,0);const eligible=lines.filter(l=>coupon.scope==='all'||l.product.kind==='membership').reduce((s,l)=>s+l.product.price*l.qty,0);if(subtotal<coupon.min)error='حداقل مبلغ سبد برای این کد فراهم نیست.';else if(memberships<coupon.members)error='این کد به دست‌کم دو عضویت در سبد نیاز دارد.';else discount=Math.min(coupon.cap,Math.round(eligible*coupon.percent/100));}
 return{lines,subtotal,discount,total:Math.max(0,subtotal-discount),error,coupon:coupon&&!error?coupon:null};
}
