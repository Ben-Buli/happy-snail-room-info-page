const titleText = document.getElementById("titleText");
const container = document.getElementById("cardContainer1");
const tabHost1 = document.getElementById("tabHost1");
const tabHost2 = document.getElementById("tabHost2");

let allCards = []; // 儲存所有資料

function renderHost(data) {
  container.innerHTML = "";
  data.forEach((item, index) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-xl-3 card-animate";
    col.style.animationDelay = `${index * 80}ms`;

    const onClickAttr = item.link ? `onclick="window.open('${item.link}', '_blank')"` : "";
    const imgUrlAttr = item.imgurl ? `style="background-image: url('${item.imgurl}')"` : "";
    const btnText = item.btnText ? `<a class="caption-btn">${item.btnText}</a>` : "";

    col.innerHTML = `
      <div class="host_card" ${onClickAttr}>
        <div class="bg_zoom" ${imgUrlAttr}></div>
        ${btnText}
      </div>
    `;

    container.appendChild(col);
  });
}

function filterAndRender(hostNumber) {
  const filtered = allCards.filter(item => item.host === hostNumber);
  renderHost(filtered);
}

// 初次載入資料
fetch("data.json")
  .then(res => {
    if (!res.ok) throw new Error("無法讀取資料");
    return res.json();
  })
  .then(data => {
    allCards = data.hosts;
    tabHost1.click(); // 預設載入一館房型
  })
  .catch(err => {
    console.error("資料載入失敗", err);
  });

// tab 切換控制
tabHost1.addEventListener("click", (e) => {
  e.preventDefault();
  tabHost1.classList.add("active");
  tabHost2.classList.remove("active");
  titleText.innerText = "一館房型";
  filterAndRender(1);
});

tabHost2.addEventListener("click", (e) => {
  e.preventDefault();
  tabHost2.classList.add("active");
  tabHost1.classList.remove("active");
  titleText.innerText = "二館房型";
  filterAndRender(2);
});
