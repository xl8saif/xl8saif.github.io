(() => {
  'use strict';

  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  const translations = {
    en: {
      menu:'Menu',about:'About',services:'Services',languages:'Languages',work:'Selected Work',hire:'Hire Me ↗',eyebrow:'TRANSLATOR · INTERPRETER · LOCALIZATION EXPERT',heroTitle:'Language.<br><em>Culture.</em><br>Meaning.',lead:'I help organizations communicate across languages, markets and cultures with precision, context and human judgment.',heroHire:'Hire Me ↗',viewWork:'View Selected Work',aboutEyebrow:'01 / ABOUT',aboutTitle:'A cultural bridge with a technical mindset.',about1:'My work sits where language, technology and culture meet. For more than twelve years, I have worked across government, SaaS, Islamic institutions, gaming and multilingual content.',about2:'I specialize in Arabic–Urdu–Persian–English communication, localization, MTPE, linguistic QA and interpretation, while also working to preserve languages that technology too often overlooks.',about3:'That mission led to my work with <strong>FiKR&CD</strong>, focused on research, documentation and digital preservation of Indus-Kohistani and other endangered linguistic heritage.',profile:'Professional profile ↗',servicesEyebrow:'02 / SERVICES',servicesTitle:'Language work built for <em>real-world stakes.</em>',service1:'Translation & Localization',service1d:'Accurate translation and cultural adaptation across Arabic, Urdu, Persian and English, with terminology and context under control.',service2:'MTPE & LQA',service2d:'Human post-editing, linguistic testing, terminology review and production-quality assurance for machine-assisted workflows.',service3:'Interpretation',service3d:'Context-aware multilingual interpretation for meetings, institutions and sensitive communication environments.',service4:'Game Localization',service4d:'Player-facing strings, UI language, cultural adaptation, terminology and linguistic testing for interactive products.',service5:'Language Data & Preservation',service5d:'Transcription, language documentation, dataset preparation and community-centered digital preservation.',service6:'Subtitling & Content',service6d:'Multilingual subtitles, transcription and culturally precise digital content for public and private platforms.',discuss:'Discuss a project ↗',langEyebrow:'03 / LANGUAGES',langTitle:'Fluency is more than knowing <em>words.</em>',langLead:'It is knowing what they mean to the people who use them.',workEyebrow:'04 / SELECTED WORK',workTitle:'Work across institutions, technology and <em>heritage.</em>',gov:'GOVERNMENT · ISLAMIC SERVICES',govTitle:'Saudi Ministry of Hajj & Umrah',govDesc:'Large-scale English/Arabic → Urdu/Persian translation and localization work across approximately 500,000 words.',data:'LANGUAGE DATA · USA',dataTitle:'Productive Playhouse',dataDesc:'Verified more than 1,500 Shina-language YouTube videos for language-data and speech-technology work.',edu:'EDUCATION · LANGUAGE PRESERVATION',eduTitle:'Indus-Kohistani Class 1 Textbook',eduDesc:'Contributed to language-preservation and educational work supporting an endangered language community.',research:'RESEARCH · CULTURAL TECHNOLOGY',researchTitle:'FiKR&CD',researchDesc:'Co-founder of a research and culture-development initiative focused on documentation, preservation and digital access.',gaming:'GAMING · LOCALIZATION',gamingTitle:'PUBG MOBILE',gamingDesc:'Localization work involving player-facing language, terminology and culturally appropriate adaptation.',statementEyebrow:'LANGUAGE × TECHNOLOGY × HERITAGE',statement:'Preserve the past.<br>Localize the present.<br><em>Build for the future.</em>',contactEyebrow:'05 / CONTACT',contactTitle:'Have a language problem worth solving?',contactDesc:'Send the language pair, scope, deadline and context. Direct communication is available through email, WhatsApp or your preferred professional platform.',message:'Message me ↗',freelance:'Freelance profile ↗',facebook:'Professional profile ↗',translator:'Translator profile ↗',back:'Back to top ↑',footer:'Translation · Localization · Language Preservation'},
    ar: {
      menu:'القائمة',about:'نبذة عني',services:'الخدمات',languages:'اللغات',work:'أبرز الأعمال',hire:'وظّفني ↗',eyebrow:'مترجم · مفسّر · خبير توطين',heroTitle:'اللغة.<br><em>الثقافة.</em><br>المعنى.',lead:'أساعد المؤسسات على التواصل عبر اللغات والأسواق والثقافات بدقة، وفهم للسياق، وحكم بشري رصين.',heroHire:'وظّفني ↗',viewWork:'شاهد أبرز الأعمال',aboutEyebrow:'01 / نبذة عني',aboutTitle:'جسر ثقافي بعقلية تقنية.',about1:'يقع عملي عند تقاطع اللغة والتكنولوجيا والثقافة. وعلى مدى أكثر من اثني عشر عاماً، عملت مع الجهات الحكومية ومنصات SaaS والمؤسسات الإسلامية وقطاع الألعاب والمحتوى متعدد اللغات.',about2:'أتخصص في التواصل بين العربية والأردية والفارسية والإنجليزية، والتوطين، والتحرير اللاحق للترجمة الآلية، وضمان الجودة اللغوية، والترجمة الشفوية، مع العمل أيضاً على حفظ اللغات التي كثيراً ما تتجاهلها التكنولوجيا.',about3:'قادني هذا الهدف إلى العمل مع <strong>FiKR&CD</strong> في مجالات البحث والتوثيق والحفظ الرقمي للغة الإندوس-كوهستانية وغيرها من اللغات المهددة بالاندثار.',profile:'الملف المهني ↗',servicesEyebrow:'02 / الخدمات',servicesTitle:'خدمات لغوية مصممة <em>للمواقف التي تستحق الدقة.</em>',service1:'الترجمة والتوطين',service1d:'ترجمة دقيقة وتكييف ثقافي بين العربية والأردية والفارسية والإنجليزية، مع ضبط المصطلحات والسياق.',service2:'التحرير اللاحق وضمان الجودة',service2d:'تحرير بشري لاحق، واختبار لغوي، ومراجعة للمصطلحات، وضمان جودة جاهزة للإنتاج ضمن سير العمل المدعوم بالآلة.',service3:'الترجمة الشفوية',service3d:'ترجمة شفوية متعددة اللغات تراعي السياق للاجتماعات والمؤسسات وبيئات التواصل الحساسة.',service4:'توطين الألعاب',service4d:'ترجمة نصوص اللاعبين وواجهات المستخدم، والتكييف الثقافي، وضبط المصطلحات والاختبار اللغوي للمنتجات التفاعلية.',service5:'بيانات اللغة وحفظها',service5d:'التفريغ والتوثيق اللغوي وإعداد مجموعات البيانات والحفظ الرقمي المرتكز على المجتمع.',service6:'الترجمة النصية والمحتوى',service6d:'ترجمة نصوص متعددة اللغات، وتفريغ المحتوى، وإنتاج محتوى رقمي دقيق ثقافياً للمنصات العامة والخاصة.',discuss:'ناقش مشروعاً ↗',langEyebrow:'03 / اللغات',langTitle:'الطلاقة أكثر من مجرد معرفة <em>الكلمات.</em>',langLead:'إنها معرفة ما تعنيه هذه الكلمات لمن يستخدمها.',workEyebrow:'04 / أبرز الأعمال',workTitle:'أعمال في المؤسسات والتكنولوجيا و<em>التراث اللغوي.</em>',gov:'حكومي · خدمات الحج والعمرة · 2022–2024',govTitle:'وزارة الحج والعمرة',govDesc:'ترجمة وتوطين واسعَا النطاق من الإنجليزية والعربية إلى الأردية والفارسية، ضمن مشروع بلغ نحو 500,000 كلمة، مع مراعاة المصطلحات والسياق الثقافي.',data:'بيانات لغوية · الولايات المتحدة · 2023',dataTitle:'Productive Playhouse',dataDesc:'مراجعة والتحقق من أكثر من 1,500 فيديو باللغة الشينا ضمن أعمال إعداد البيانات اللغوية وتقنيات الكلام، مع التركيز على الدقة والاتساق.',edu:'تعليم · حفظ اللغة · 2024',eduTitle:'كتاب اللغة الإندوس-كوهستانية للصف الأول',eduDesc:'المساهمة في إعداد مواد تعليمية لدعم حفظ اللغة الإندوس-كوهستانية وتعزيز حضورها في التعليم المحلي.',research:'بحث · تنمية ثقافية · 2024–الآن',researchTitle:'FiKR&CD',researchDesc:'شريك مؤسس لمبادرة للبحث والتنمية الثقافية تُعنى بتوثيق اللغات والتراث، وحفظهما رقمياً، وتوسيع الوصول إلى المعرفة المجتمعية.',gaming:'ألعاب · توطين',gamingTitle:'PUBG MOBILE',gamingDesc:'أعمال توطين تشمل نصوص اللاعبين وواجهات المستخدم والمصطلحات والتكييف الثقافي والاختبار اللغوي لضمان تجربة طبيعية ومتسقة.',statementEyebrow:'اللغة × التكنولوجيا × التراث',statement:'نحفظ الماضي.<br>ونوطّن الحاضر.<br><em>ونبني المستقبل.</em>',contactEyebrow:'05 / التواصل',contactTitle:'لديك تحدٍ لغوي يستحق الحل؟',contactDesc:'أرسل زوج اللغات ونطاق العمل والموعد النهائي والسياق. التواصل المباشر متاح عبر البريد الإلكتروني أو WhatsApp أو منصتك المهنية المفضلة.',message:'راسلني ↗',freelance:'ملفي على Upwork ↗',facebook:'ملفي المهني ↗',translator:'ملفي على ProZ ↗',back:'العودة إلى الأعلى ↑',footer:'الترجمة · التوطين · حفظ اللغات'}
  };

  const selectors=[['.menu','menu'],['#nav a:nth-child(1)','about'],['#nav a:nth-child(2)','services'],['#nav a:nth-child(3)','languages'],['#nav a:nth-child(4)','work'],['#nav .nav-cta','hire'],['.hero .eyebrow','eyebrow'],['.hero h1','heroTitle'],['.hero .lead','lead'],['.actions .dark','heroHire'],['.actions .light','viewWork'],['#about .eyebrow','aboutEyebrow'],['#about h2','aboutTitle'],['#about .copy p:nth-of-type(1)','about1'],['#about .copy p:nth-of-type(2)','about2'],['#about .copy p:nth-of-type(3)','about3'],['#about .underlink','profile'],['#services .eyebrow','servicesEyebrow'],['#services h2','servicesTitle'],['#languages .eyebrow','langEyebrow'],['#languages h2','langTitle'],['#languages .muted','langLead'],['#work .eyebrow','workEyebrow'],['#work h2','workTitle'],['.statement .eyebrow','statementEyebrow'],['.statement h2','statement'],['#contact .eyebrow','contactEyebrow'],['#contact h2','contactTitle'],['#contact .copy-text','contactDesc'],['footer .footer span:nth-child(2)','footer'],['footer .footer a','back']];

  const switcher=document.createElement('button');
  switcher.className='language-switch'; switcher.type='button';
  switcher.style.cssText='margin-inline-start:16px;border:1px solid rgba(98,199,255,.35);background:transparent;color:#dce9f7;padding:8px 12px;border-radius:999px;cursor:pointer;font:inherit;white-space:nowrap;';
  document.querySelector('.nav')?.appendChild(switcher);

  const rtlStyle=document.createElement('style');
  rtlStyle.textContent='.rtl{direction:rtl}.rtl .hero{direction:rtl}.rtl .hero-visual{justify-self:start}.rtl .hero:after{right:auto;left:-90px}.rtl .floating.one{left:auto;right:-48px}.rtl .floating.two{right:auto;left:-23px}.rtl .split,.rtl .contact-grid{direction:rtl}.rtl .service-grid,.rtl .work-list{direction:rtl}.rtl .work-list article:hover{padding-left:0;padding-right:8px}.rtl .contact-links a:hover{padding-left:0;padding-right:7px}.rtl .portrait-note span{text-align:left}.rtl .proof span{border-right:0;border-left:1px solid rgba(125,190,255,.2)}.rtl .proof span:first-child{padding-left:20px;padding-right:0}.rtl .proof span:last-child{border:0}.rtl .eyebrow{letter-spacing:.03em}.rtl .work-list .tag{letter-spacing:.03em}@media(max-width:680px){.rtl .hero-visual:after{right:auto;left:-25px}.rtl .floating.two{right:auto;left:-8px}}';
  document.head.appendChild(rtlStyle);

  const workKeys=['gov','data','edu','research','gaming'];
  const workDefaults=[
    ['gov','GOVERNMENT · ISLAMIC SERVICES','Saudi Ministry of Hajj & Umrah','Large-scale English/Arabic → Urdu/Persian translation and localization work across approximately 500,000 words.'],
    ['data','LANGUAGE DATA · USA','Productive Playhouse','Verified more than 1,500 Shina-language YouTube videos for language-data and speech-technology work.'],
    ['edu','EDUCATION · LANGUAGE PRESERVATION','Indus-Kohistani Class 1 Textbook','Contributed to language-preservation and educational work supporting an endangered language community.'],
    ['research','RESEARCH · CULTURAL TECHNOLOGY','FiKR&CD','Co-founder of a research and culture-development initiative focused on documentation, preservation and digital access.'],
    ['gaming','GAMING · LOCALIZATION','PUBG MOBILE','Localization work involving player-facing language, terminology and culturally appropriate adaptation.']
  ];

  function ensureWorkItems(){
    const list=document.querySelector('.work-list');
    if(!list) return [];
    const existing=[...list.querySelectorAll('article')];
    while(existing.length<workDefaults.length){
      const [key,tag,title,desc]=workDefaults[existing.length];
      const article=document.createElement('article');
      article.innerHTML=`<span class="tag">${tag}</span><div><h3>${title}</h3><p>${desc}</p></div>`;
      list.appendChild(article);
      existing.push(article);
    }
    return existing;
  }

  function applyWorkLanguage(t,lang){
    const items=ensureWorkItems();
    items.slice(0,workKeys.length).forEach((el,i)=>{
      const key=workKeys[i];
      const tag=el.querySelector('.tag');
      const title=el.querySelector('h3');
      const desc=el.querySelector('div p:last-child');
      if(tag) tag.innerHTML=t[key];
      if(title) title.innerHTML=t[`${key}Title`];
      if(desc) desc.innerHTML=t[`${key}Desc`];
      el.setAttribute('lang',lang);
      el.setAttribute('dir',lang==='ar'?'rtl':'ltr');
    });
  }

  function applyLanguage(lang){
    const t=translations[lang];
    if(!t) return;
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.body.classList.toggle('rtl',lang==='ar');
    selectors.forEach(([sel,key])=>{const el=document.querySelector(sel);if(el&&t[key])el.innerHTML=t[key];});
    document.querySelectorAll('.service-grid article').forEach((el,i)=>{el.querySelector('h3').innerHTML=t[`service${i+1}`];el.querySelector('p').innerHTML=t[`service${i+1}d`];el.querySelector('a').innerHTML=t.discuss;});
    applyWorkLanguage(t,lang);
    switcher.textContent=lang==='ar'?'English':'العربية';
    switcher.setAttribute('aria-label',lang==='ar'?'Switch to English':'التبديل إلى العربية');
    localStorage.setItem('site-language',lang);
  }

  switcher.addEventListener('click',()=>applyLanguage(document.documentElement.lang==='ar'?'en':'ar'));
  applyLanguage(localStorage.getItem('site-language')==='ar'?'ar':'en');
})();
