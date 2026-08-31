/* ═══════════════════════════════════════════════════════════════════════════
   ОБЛИК СТРАНИЦЫ · обвязка вокруг текста и виды, снятые с РЕАЛЬНЫХ сайтов

   Текст главы остаётся ЧИСТЫМ семантическим HTML — ни одного класса. Всю
   обвязку (шапку, крошки, оглавление, правую колонку, нумерацию рисунков)
   строит этот файл, а `css/сайты/<ключ>.css` красит её под конкретный сайт.
   Числа в скинах не выдуманы: сняты с живых страниц через CDP
   (`замер_облика_сайтов.py`).

   ТРИ ПЕРЕДЕЛКИ ПОСЛЕ ЗАМЕЧАНИЙ ВЛАДЕЛЬЦА 31.08, вечер:

   1. **Чёрная полоса переключателей убрана.** Дословно: «вся эта плашка выше
      просто ужасная и некрасива, сбивает всю эстетику». Выбор облика, размера
      текста, ширины и шрифта уехал под шестерёнку в шапке — `настройки.js`.
   2. **Меню в шапке было ВЫДУМАННЫМ** — «Основы, Кровь, Патология» вели все
      на index.html и не значили ничего. Теперь в шапке настоящая навигация:
      разделы сайта и настоящий список глав.
   3. **Подсветка раздела гасла посреди чтения.** Было на IntersectionObserver:
      он подсвечивает, пока ЗАГОЛОВОК в поле зрения, поэтому стоило прокрутить
      середину длинного раздела — подсветка пропадала. Стало по-человечески:
      текущий раздел — последний, чей заголовок УЖЕ проехал верх экрана, и он
      горит до самого начала следующего.
   ═══════════════════════════════════════════════════════════════════════════ */

const ОБЛИКИ = [
 {ф:"wikipedia", имя:"Википедия", сайт:"en.wikipedia.org (обложка Vector 2022)",
  чем:"Справочник: узкое левое оглавление, засечный заголовок, таблица с серой шапкой. Замер: текст 16/26, колонка 1117 px."},
 {ф:"bookshelf", имя:"NCBI Bookshelf", сайт:"ncbi.nlm.nih.gov/books (StatPearls)",
  чем:"Медицинская база: полоса NIH, белый лист на сером поле, Times New Roman 16/22, коричневые заголовки, правая колонка панелями."},
 {ф:"teachme", имя:"TeachMeAnatomy", сайт:"teachmeanatomy.info",
  чем:"Учебный сайт для студентов-медиков: чёрная шапка, бирюзовый акцент, крошки, полужирное оглавление слева. Текст 16/28."},
 {ф:"radiopaedia", имя:"Radiopaedia", сайт:"radiopaedia.org",
  чем:"Фиолетовая шапка с разрядкой, белый лист на тёмном поле, плотный текст 13/19.5, плитки рисунков справа."},
 {ф:"material", имя:"MkDocs Material", сайт:"squidfunk.github.io/mkdocs-material",
  чем:"Самый распространённый вид документации: три колонки, индиговый акцент, врезки с цветной полосой."},
 {ф:"material-dark", имя:"MkDocs Material, тёмная", сайт:"squidfunk.github.io/mkdocs-material",
  чем:"Та же тема в тёмном режиме — ровно так она и снята замером: фон #1e2129. Для вечернего чтения."},
 {ф:"notion", имя:"Notion", сайт:"notion.com/help",
  чем:"Документ, а не сайт: крупный заголовок 42 px, меню слева, никакой правой колонки, много воздуха."},
 {ф:"stripe", имя:"Stripe Docs", сайт:"docs.stripe.com",
  чем:"Эталон технической документации: ссылки #5469d4, текст #3c4257, плотная навигация, правое оглавление."},
 {ф:"openstax", имя:"OpenStax", сайт:"openstax.org (учебники)",
  чем:"Настоящий электронный учебник: широкая панель оглавления книги, серо-графитовые заголовки."},
 {ф:"osmosis", имя:"Osmosis", сайт:"osmosis.org",
  чем:"Синий баннер, скруглённые карточки с тонкой рамкой, левая панель тем, кнопки-таблетки."},
 {ф:"merck", имя:"Merck Manual", сайт:"merckmanuals.com/professional",
  чем:"Профессиональный справочник: белая шапка, бордовые ссылки #b12e32, серое поле вокруг листа."}
];

/* НАВИГАЦИЯ. Первым пунктом факультет, а не предметы: «мне незачем эти предметы
   там на видном месте… тут должно быть главное. Факультет». Наводишь — падает
   список, как на сайтах университетов.

   Держится списком здесь, а не собирается обходом папки: при `file://` браузер
   каталог не читает. */
const ГЛАВЫ_САЙТА = [
  {а: "pochka.html",      т: "Почка"},
  {а: "serdce.html",      т: "Сердце"},
  {а: "dyhanie.html",     т: "Дыхание"},
  {а: "vozbudimost.html", т: "Возбудимые ткани"},
  {а: "gemostaz.html",    т: "Гемостаз"},
];

/* Ряд шапки: ПРОСТЫЕ КНОПКИ, без единого выпадающего списка. Дословно:
   «Материалы это тоже лишь кнопка! Там не должен появиться список, если на неё
   навести». Факультеты убраны — «возможно, деление на факультеты мне сейчас
   тоже не нужно». Глоссарий добавлен в ряд по его же просьбе.

   Вид пунктов — пилюли с залитым активным, как на medbreak.ru: снимок 31.08. */
const МЕНЮ = [
  {а: "index.html",      т: "Главное"},
  {а: "discipliny.html", т: "Дисциплины"},
  {а: "materialy.html",  т: "Материалы"},
  {а: "глоссарий.html",  т: "Глоссарий"},
  {а: "nastroyki.html",  т: "Настройки"},
];

const ХРАНИЛКА = {
  взять(к, по){ try { const з = localStorage.getItem(к); return з === null ? по : з; }
                catch(e){ return по; } },
  дать(к, з){ try { localStorage.setItem(к, з); } catch(e){} }
};

(function обвязка(){
  const исходный = document.querySelector("main");
  if (!исходный || document.querySelector(".ob-shell")) return;

  const файл = (location.pathname.split("/").pop() || "index.html");
  const h1 = исходный.querySelector("h1");
  const название = h1 ? h1.textContent.trim() : document.title;

  // Оглавление снимается с ФАКТИЧЕСКИХ заголовков. Заголовки внутри врезок не
  // идут: клиническая врезка нередко начинается с h3 на две строки и в колонке
  // выглядит как полноценный раздел, которым не является.
  const заголовки = [...исходный.querySelectorAll("h2, h3")]
        .filter(з => !з.closest("aside, blockquote, figure"));
  заголовки.forEach((з, i) => { if (!з.id) з.id = "razdel-" + (i + 1); });
  /* «Служебная» — это ЛЮБАЯ страница, кроме главы: главная, дисциплины,
     настройки, поиск, витрина. На них не нужны ни счётчик слов, ни свёрнутое
     оглавление — на главной «Содержание главы» и «240 слов, чтение 1 мин»
     выглядели как остатки чужого шаблона. Считаем по списку глав, а не по
     числу заголовков: у главной заголовки есть, но она не глава. */
  const этоГлава = ГЛАВЫ_САЙТА.some(г => г.а === файл);
  const служебная = !этоГлава;

  const рисунки = [...исходный.querySelectorAll("figure")];
  рисунки.forEach((р, i) => { if (!р.id) р.id = "risunok-" + (i + 1); });

  // Слова считаем БЕЗ <script>: на странице поиска в неё вшит индекс всех глав,
  // и счётчик честно насчитал «26 771 слово» там, где текста три абзаца.
  const счётчик = исходный.cloneNode(true);
  счётчик.querySelectorAll("script, style").forEach(э => э.remove());
  const слов = (счётчик.textContent.match(/[\p{L}\p{N}]+/gu) || []).length;
  const минут = Math.max(1, Math.round(слов / 180));

  const эл = (тег, кл, текст) => {
    const e = document.createElement(тег);
    if (кл) e.className = кл;
    if (текст != null) e.textContent = текст;
    return e;
  };
  const ссылка = (адрес, текст, текущая) => {
    const a = эл("a", текущая ? "ob-tek-str" : null, текст);
    a.href = адрес;
    if (текущая) a.setAttribute("aria-current", "page");
    return a;
  };

  const оболочка = эл("div", "ob-shell");

  /* ─── шапка ─────────────────────────────────────────────────────────────*/
  const шапка = эл("header", "ob-top");
  const верх = эл("div", "ob-top-in");
  /* НИ НАЗВАНИЯ, НИ ЗНАЧКА. «Ну какое Сводные главы, убери эту херь. Кнопка
     Главное — это самое важное», потом про значок: «да блять, опять это СГ,
     нахер оно там в верхнем углу. Убери». Шапка начинается сразу с меню, а на
     главную ведёт его первый пункт. */

  /* Гамбургер для узких экранов. Сайт читают и с телефона, поэтому меню там не
     прячется совсем, а складывается в панель — как у MkDocs Material и
     Docusaurus, чьи точки переключения мы и сверяли. */
  const бургер = эл("button", "ob-burger");
  бургер.type = "button";
  бургер.setAttribute("aria-label", "Меню");
  бургер.setAttribute("aria-expanded", "false");
  бургер.innerHTML = '<span></span><span></span><span></span>';
  верх.appendChild(бургер);

  /* Название текущей страницы в шапке — приём снят с MkDocs Material (замер
     31.08, снимок mkdocs-tel.png): на телефоне там «☰ · Материалы для MkDocs ·
     иконки» в полосе 48 px. Без названия шапка превращается в чёрную полосу с
     одной кнопкой — ровно то, что владелец назвал сырым. На широком экране
     заголовок не нужен: он и так виден в тексте, поэтому скрыт стилями. */
  const заголовокШапки = эл("span", "ob-top-title", название);
  верх.appendChild(заголовокШапки);

  const кнПанель = эл("button", "ob-side-btn");
  кнПанель.type = "button";
  кнПанель.setAttribute("aria-expanded", "false");
  кнПанель.innerHTML = '<svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true" fill="none" ' +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="round">' +
    '<rect x="2.2" y="3.2" width="15.6" height="13.6" rx="2.4"/><path d="M7.6 3.4v13.2"/></svg>' +
    '<span class="ob-side-btn-t">Содержание</span>';
  верх.appendChild(кнПанель);

  const меню = эл("nav", "ob-topnav");
  МЕНЮ.forEach(п => меню.appendChild(
    ссылка(п.а, п.т, п.а === файл || (п.а === "materialy.html" &&
      (ГЛАВЫ_САЙТА.some(г => г.а === файл) || файл.startsWith("voprosy-"))))));
  верх.appendChild(меню);

  // Подпись просто «Поиск»: «поиск по главам вряд ли удобно, просто поиск
  // слово удобнее». Ищет он и термины, и названия тем — Lunr индексирует
  // заголовки с повышенным весом и текст разделов.
  const поиск = document.createElement('a');
  поиск.className = 'ob-search'; поиск.href = 'poisk.html';
  поиск.appendChild(эл('span','ob-search-i','⌕'));
  поиск.appendChild(эл('span','ob-search-t','Поиск'));
  верх.appendChild(поиск);

  шапка.appendChild(верх);
  оболочка.appendChild(шапка);

  const касание = matchMedia("(hover: none)").matches;

  /* Панель открывается и закрывается плавно, состояние запоминается. Кнопка
     видна только на главе и только на широком экране: на телефоне листать текст
     и одновременно пользоваться такой навигацией невозможно. */
  const этоГлава0 = ГЛАВЫ_САЙТА.some(г => г.а === файл);
  if (!этоГлава0) кнПанель.hidden = true;
  const ключПанели = "панель-содержания";
  function панель(открыта){
    оболочка.classList.toggle("ob-side-open", открыта);
    кнПанель.setAttribute("aria-expanded", String(открыта));
    кнПанель.querySelector(".ob-side-btn-t").textContent =
      открыта ? "Закрыть содержание" : "Содержание";
    ХРАНИЛКА.дать(ключПанели, открыта ? "1" : "0");
  }
  кнПанель.addEventListener("click", () =>
    панель(!оболочка.classList.contains("ob-side-open")));
  if (этоГлава0 && ХРАНИЛКА.взять(ключПанели, "1") === "1") панель(true);

  бургер.addEventListener("click", () => {
    const было = оболочка.classList.toggle("ob-nav-open");
    бургер.setAttribute("aria-expanded", String(было));
  });

  /* ─── три колонки ───────────────────────────────────────────────────────*/
  const тело = эл("div", "ob-body");

  /* БОКОВЫХ КОЛОНОК НЕТ. Решение владельца: «ничего, текст во всю ширину» —
     после того как он назвал пустые колонки первым, что раздражает. Оглавление
     живёт свёрнутым блоком над текстом, и оно же единственное: раньше список
     разделов дублировался слева и справа. */
  /* ВЫДВИЖНАЯ ПАНЕЛЬ СОДЕРЖАНИЯ. Просьба владельца дословно: «содержание главы
     должно было быть сбоку, типа боковая панель. Ты можешь её включить, текст
     чуть двигается. Правда двигается он на пк только — такое на телефонах будет
     дерьмово смотреться». Поэтому кнопка и сама панель живут только на широком
     экране, а на телефоне остаётся свёрнутый блок над текстом.

     Текст не перекрывается панелью, а СДВИГАЕТСЯ: панель занимает своё место в
     потоке через отступ у сетки, и оба движения идут одним переходом. */
  const слева = эл("nav", "ob-left");
  слева.appendChild(эл("div", "ob-left-t", "Содержание главы"));
  const оглавление = эл("ul", "ob-toc");
  заголовки.forEach(з => {
    const li = эл("li", з.tagName === "H3" ? "ob-toc-3" : "ob-toc-2");
    const a = эл("a", null, з.textContent.trim());
    a.href = "#" + з.id;
    li.appendChild(a); оглавление.appendChild(li);
  });
  слева.appendChild(оглавление);
  тело.appendChild(слева);

  const центр = эл("main", "ob-main");
  const крошки = эл("nav", "ob-crumbs");
  крошки.appendChild(ссылка("index.html", "Главное"));
  крошки.appendChild(эл("span", "ob-sep", "›"));
  крошки.appendChild(эл("span", "ob-crumb-now", название));
  if (файл !== "index.html") центр.appendChild(крошки);

  /* На ГЛАВНОЙ заголовка нет вовсе. Здесь нет своего h1, поэтому он брался из
     <title> — и наверху страницы опять всплывало «Сводные главы», хотя владелец
     дважды потребовал убрать название сайта: «ну какое Сводные главы, убери эту
     херь», «опять это СГ, нахер оно там». Первое, что видит студент, — самая
     свежая тема, как на новостной ленте. */
  const этоГлавная = файл === "index.html";
  const шапкаТекста = эл("div", "ob-head");
  if (!этоГлавная) шапкаТекста.appendChild(эл("h1", null, название));
  const мета = эл("p", "ob-meta");
  мета.appendChild(эл("span", null, слов.toLocaleString("ru-RU") + " слов"));
  мета.appendChild(эл("span", "ob-dot", "·"));
  мета.appendChild(эл("span", null, "чтение " + минут + " мин"));
  мета.appendChild(эл("span", "ob-dot", "·"));
  мета.appendChild(эл("span", null, "разделов " +
    заголовки.filter(з => з.tagName === "H2").length));
  if (!служебная) шапкаТекста.appendChild(мета);
  if (!этоГлавная) центр.appendChild(шапкаТекста);

  const статья = эл("article", "ob-article");
  if (h1) h1.remove();
  while (исходный.firstChild) статья.appendChild(исходный.firstChild);
  центр.appendChild(статья);
  тело.appendChild(центр);

  /* Сквозная нумерация рисунков и таблиц — скриптом, а не счётчиками CSS:
     в главе про почку подписи пронумерованы вручную, и счётчик дописал бы
     второй номер поверх первого. Скрипт умеет посмотреть на текст. */
  let нр = 0;
  статья.querySelectorAll("figure").forEach(ф => {
    const п = ф.querySelector("figcaption");
    if (!п) return;
    нр += 1;
    if (!/^\s*Рис/i.test(п.textContent))
      п.insertBefore(document.createTextNode("Рис. " + нр + ". "), п.firstChild);
  });
  let нт = 0;
  статья.querySelectorAll("table").forEach(т => {
    let п = т.querySelector("caption");
    if (!п) { п = document.createElement("caption"); т.insertBefore(п, т.firstChild); }
    нт += 1;
    if (!/^\s*Табл/i.test(п.textContent))
      п.insertBefore(document.createTextNode("Табл. " + нт + ". "), п.firstChild);
  });

  // Широкие таблицы прокручиваются ВНУТРИ обёртки, а не рвут страницу вбок.
  статья.querySelectorAll("table").forEach(т => {
    const о = эл("div", "ob-table-wrap");
    т.replaceWith(о); о.appendChild(т);
  });

  const справа = эл("aside", "ob-right");
  const карт1 = эл("div", "ob-card ob-card-toc");
  карт1.appendChild(эл("div", "ob-card-t", "На этой странице"));
  const мини = эл("ul", "ob-mini");
  заголовки.filter(з => з.tagName === "H2").forEach(з => {
    const li = эл("li"); const a = эл("a", null, з.textContent.trim());
    a.href = "#" + з.id; li.appendChild(a); мини.appendChild(li);
  });
  карт1.appendChild(мини);
  справа.appendChild(карт1);
  if (рисунки.length) {
    const карт2 = эл("div", "ob-card ob-card-fig");
    карт2.appendChild(эл("div", "ob-card-t", "Рисунки"));
    const плитки = эл("div", "ob-tiles");
    рисунки.forEach((р, i) => {
      const img = р.querySelector("img");
      const a = document.createElement("a");
      a.className = "ob-tile"; a.href = "#" + р.id;
      if (img) { const k = document.createElement("img");
                 k.src = img.getAttribute("src"); k.alt = ""; k.loading = "lazy";
                 a.appendChild(k); }
      const c = р.querySelector("figcaption");
      const т = c ? c.textContent.trim() : "";
      // Номер не приписываем, если подпись уже начинается с «Рис»: в JS границы
      // слова считаются по ASCII, поэтому проверка без \b.
      a.appendChild(эл("span", "ob-tile-t",
        (/^\s*Рис/i.test(т) ? "" : "Рис. " + (i + 1) + ". ") + т.slice(0, 46)));
      плитки.appendChild(a);
    });
    карт2.appendChild(плитки);
    справа.appendChild(карт2);
  }
  справа.hidden = true;
  тело.appendChild(справа);
  /* НИЗ СТРАНИЦЫ. Раньше глава просто обрывалась — владелец назвал это среди
     четырёх главных раздражителей. Состав выбран им же: ссылка на вопросы,
     когда обновлено, переход к следующей главе. */
  const низСтр = эл("footer", "ob-foot");
  const свояГлава = ГЛАВЫ_САЙТА.findIndex(г => г.а === файл);
  if (свояГлава >= 0) {
    const вопр = эл("a", "ob-foot-q");
    вопр.href = "voprosy-" + файл;
    вопр.textContent = "Проверить себя по этой главе →";
    низСтр.appendChild(вопр);
    const ряд = эл("div", "ob-foot-nav");
    const пред = ГЛАВЫ_САЙТА[свояГлава - 1], след = ГЛАВЫ_САЙТА[свояГлава + 1];
    if (пред) {
      const a = эл("a", "ob-foot-prev"); a.href = пред.а;
      a.innerHTML = "<span>← Предыдущая глава</span><b></b>";
      a.querySelector("b").textContent = пред.т; ряд.appendChild(a);
    } else ряд.appendChild(эл("span"));
    if (след) {
      const a = эл("a", "ob-foot-next"); a.href = след.а;
      a.innerHTML = "<span>Следующая глава →</span><b></b>";
      a.querySelector("b").textContent = след.т; ряд.appendChild(a);
    }
    низСтр.appendChild(ряд);
    const когда = исходный.getAttribute("data-obnovleno");
    if (когда) низСтр.appendChild(эл("p", "ob-foot-date", "Обновлено " + когда));
  }
  if (низСтр.childElementCount) центр.appendChild(низСтр);

  оболочка.appendChild(тело);
  исходный.replaceWith(оболочка);
})();

/* ─── применение облика ───────────────────────────────────────────────────*/
(function облик(){
  let стиль = document.getElementById("стиль");
  if (!стиль) {
    стиль = document.createElement("link");
    стиль.rel = "stylesheet"; стиль.id = "стиль";
    document.head.appendChild(стиль);
  }

  /* ССЫЛКА СОЗДАЁТСЯ ЗАНОВО, а не переиспользуется: элемент, однажды получивший
     невалидный источник (href=""), браузер помечает битым навсегда, и смена
     href его не лечит. Поймано замером 31.08. */
  function подключить(файл){
    const новая = document.createElement("link");
    новая.rel = "stylesheet"; новая.id = "стиль";
    if (файл) новая.href = "css/сайты/" + файл + ".css";
    стиль.replaceWith(новая);
    стиль = новая;
  }

  function применить(i){
    const о = ОБЛИКИ[i] || ОБЛИКИ[0];
    подключить(о.ф);
    document.documentElement.setAttribute("data-oblik", о.ф);
    ХРАНИЛКА.дать("глава-облик", String(ОБЛИКИ.indexOf(о)));
    document.dispatchEvent(new CustomEvent("облик-сменён", {detail: о}));
    requestAnimationFrame(перекладка);
  }

  /* ─── ОГЛАВЛЕНИЕ РОВНО ОДИН РАЗ ─────────────────────────────────────────
     «Нелепо смотрится, что навигация есть сразу слева и справа. Одинаковая.
     Легче, когда слева». Решает ФАКТИЧЕСКАЯ ширина элемента на экране: скины
     прячут колонки по-разному, и проверка по имени скина разошлась бы с ними. */
  const мобОглавление = (() => {
    const главное = document.querySelector(".ob-main");
    const статья = document.querySelector(".ob-article");
    const пункты = [...document.querySelectorAll(".ob-toc > li")];
    const это_глава = !!document.querySelector(".ob-meta");   // мету рисуем только главам
    if (!главное || !статья || !пункты.length || !это_глава) return null;
    const д = document.createElement("details");
    д.className = "ob-toc-mob";
    const с = document.createElement("summary");
    с.textContent = "Содержание главы";
    д.appendChild(с);
    const ул = document.createElement("ul");
    пункты.forEach(li => ул.appendChild(li.cloneNode(true)));
    д.appendChild(ул);
    главное.insertBefore(д, статья);
    return д;
  })();

  function перекладка(){
    const видно = э => !!(э && э.offsetWidth > 0 && э.offsetHeight > 0);
    const лев = document.querySelector(".ob-left");
    const карточка = document.querySelector(".ob-card-toc");
    const левВидна = видно(лев);
    if (карточка) карточка.hidden = левВидна;
    const правВидна = карточка && !карточка.hidden && видно(карточка);
    if (мобОглавление) мобОглавление.hidden = левВидна || правВидна;
  }
  let таймер = 0;
  addEventListener("resize", () => { clearTimeout(таймер); таймер = setTimeout(перекладка, 120); });
  addEventListener("load", перекладка);

  /* ─── ПОДСВЕТКА ТЕКУЩЕГО РАЗДЕЛА ────────────────────────────────────────
     Жалоба владельца: «она горит, когда я только перехожу на пункт 3, но если
     покручу вниз и не дойду до пункта 4, пункт 3 перестаёт гореть, хотя должен».
     Именно так и вёл себя IntersectionObserver: он следит за ВИДИМОСТЬЮ
     ЗАГОЛОВКА, а не за тем, в каком разделе ты находишься.

     Правильное правило простое: текущий раздел — ПОСЛЕДНИЙ, чей заголовок уже
     проехал верх экрана. Он горит до тех пор, пока верх не пересечёт следующий,
     то есть ровно всю длину раздела. */
  const цели = [...document.querySelectorAll(".ob-article h2, .ob-article h3")]
        .filter(з => з.id);
  const ссылки = new Map();
  document.querySelectorAll(".ob-toc a, .ob-mini a, .ob-toc-mob a").forEach(a => {
    const ид = decodeURIComponent(a.getAttribute("href") || "").slice(1);
    if (!ссылки.has(ид)) ссылки.set(ид, []);
    ссылки.get(ид).push(a);
  });

  let ждём = false;
  function подсветить(){
    ждём = false;
    if (!цели.length) return;
    const порог = 96;                     // высота липкой шапки плюс воздух
    let текущий = цели[0];
    for (const з of цели) {
      if (з.getBoundingClientRect().top <= порог) текущий = з; else break;
    }
    // У самого низа страницы подсвечиваем последний раздел: иначе к концу главы
    // подсветка застревает на предпоследнем и выглядит сломанной.
    if (innerHeight + scrollY >= document.body.scrollHeight - 4)
      текущий = цели[цели.length - 1];
    ссылки.forEach((список, ид) => {
      const он = ид === текущий.id;
      список.forEach(a => {
        a.classList.toggle("ob-tek", он);
        if (он) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    });
    const активная = document.querySelector(".ob-toc a.ob-tek");
    if (активная && активная.closest(".ob-left")) держать(активная);
  }
  // Длинное оглавление само доезжает до активного пункта, но НЕ дёргает
  // страницу: прокручивается только сама колонка.
  function держать(a){
    const колонка = a.closest(".ob-left");
    if (!колонка) return;
    const к = колонка.getBoundingClientRect(), п = a.getBoundingClientRect();
    if (п.top < к.top + 8) колонка.scrollTop -= (к.top + 8 - п.top);
    else if (п.bottom > к.bottom - 8) колонка.scrollTop += (п.bottom - к.bottom + 8);
  }
  addEventListener("scroll", () => {
    if (!ждём) { ждём = true; requestAnimationFrame(подсветить); }
  }, {passive: true});

  // Наружу — чтобы настройки могли переключать облик, не зная его устройства.
  window.ОБЛИК = {ОБЛИКИ, применить, перекладка,
                  текущий: () => Number(ХРАНИЛКА.взять("глава-облик", "0"))};

  применить(Number(ХРАНИЛКА.взять("глава-облик", "0")));
  подсветить();
})();
