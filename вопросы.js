/* ═══════════════════════════════════════════════════════════════════════════
   ВОПРОСЫ · проверка ответа на месте, с разбором каждого варианта

   Планка взята у AMBOSS и UWorld: после ответа показывается разбор ВСЕХ
   вариантов, а не только выбранного. Неверный вариант учит ровно тем, чем он
   неверен, и «просто подсветить зелёным» половину пользы теряет.

   Ничего не отправляется и не сохраняется: страницу открывают с диска, сервера
   нет, и придумывать его ради счётчика правильных ответов незачем.
   ═══════════════════════════════════════════════════════════════════════════ */

(function вопросы(){
  const блоки = [...document.querySelectorAll(".vp")];
  if (!блоки.length) return;

  /* ─── развёрнутые: эталон по кнопке ─────────────────────────────────────
     Сперва свой ответ, потом эталон. Наоборот бессмысленно: увидев эталон,
     проверить себя уже нельзя. */
  document.querySelectorAll(".vp-open").forEach(кн => {
    кн.addEventListener("click", () => {
      const э = кн.parentElement.querySelector(".vp-etalon");
      э.hidden = !э.hidden;
      кн.textContent = э.hidden ? "Показать эталон" : "Скрыть эталон";
    });
  });

  /* ─── закрытые ──────────────────────────────────────────────────────────*/
  блоки.forEach(блок => {
    const много = блок.dataset.tip === "много";
    const варианты = [...блок.querySelectorAll(".vp-var")];
    if (!варианты.length) return;
    let закрыт = false;

    function раскрыть(){
      закрыт = true;
      варианты.forEach(в => {
        в.classList.add(в.dataset.verno === "1" ? "vp-good" : "vp-bad");
        в.nextElementSibling.hidden = false;
        в.disabled = true;
      });
      const верно = варианты.every(в =>
        (в.dataset.verno === "1") === в.classList.contains("vp-pick"));
      const итог = document.createElement("p");
      итог.className = "vp-itog " + (верно ? "vp-itog-good" : "vp-itog-bad");
      итог.textContent = верно ? "Верно" : "Не совсем — смотри разбор";
      блок.querySelector(".vp-vars").after(итог);
      счёт();
    }

    варианты.forEach(в => в.addEventListener("click", () => {
      if (закрыт) return;
      if (много){
        // Несколько верных: копим выбор, раскрываем по кнопке.
        в.classList.toggle("vp-pick");
        кнопкаОтвета.disabled = !варианты.some(x => x.classList.contains("vp-pick"));
      } else {
        в.classList.add("vp-pick");
        раскрыть();
      }
    }));

    let кнопкаОтвета = null;
    if (много){
      кнопкаОтвета = document.createElement("button");
      кнопкаОтвета.type = "button";
      кнопкаОтвета.className = "vp-open";
      кнопкаОтвета.textContent = "Ответить";
      кнопкаОтвета.disabled = true;
      кнопкаОтвета.addEventListener("click", () => { кнопкаОтвета.remove(); раскрыть(); });
      блок.appendChild(кнопкаОтвета);
    }
  });

  /* ─── счётчик ───────────────────────────────────────────────────────────
     Показывает только пройденное, без баллов и без «уровней»: это учебник, а
     не игра. */
  const строка = document.createElement("div");
  строка.className = "vp-schet";
  строка.hidden = true;
  const якорь = document.querySelector(".ob-article") || document.querySelector("main");
  if (якорь) якорь.prepend(строка);

  function счёт(){
    const закрытые = [...document.querySelectorAll(".vp-itog")];
    const верных = закрытые.filter(э => э.classList.contains("vp-itog-good")).length;
    const всего = document.querySelectorAll('.vp[data-tip="один"], .vp[data-tip="много"]').length;
    строка.hidden = false;
    строка.textContent = "Отвечено " + закрытые.length + " из " + всего +
                         ", верно " + верных;
  }
})();
