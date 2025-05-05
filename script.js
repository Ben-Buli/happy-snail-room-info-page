const titleText = document.getElementById("titleText");
const container = document.getElementById("cardContainer1");
const tabHost1 = document.getElementById("tabHost1");
const tabHost2 = document.getElementById("tabHost2");

let allCards = []; // 儲存所有卡片資料

// 顯示房型資料
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

// 根據 host 篩選並渲染
function filterAndRender(hostNumber) {
  const filtered = allCards.filter(item => item.host === hostNumber);
  renderHost(filtered);
}

// 載入 JSON 資料
fetch("data.json")
  .then(res => {
    if (!res.ok) throw new Error("讀取 data.json 失敗");
    return res.json();
  })
  .then(data => {
    allCards = data.hosts;
    tabHost1.click(); // 預設載入 host1
  })
  .catch(err => {
    console.error("資料讀取錯誤：", err);
  });

// Tab 切換功能
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

// Info panel 控制（可保留或移除）
function showPanel(link) {
  const panel = document.getElementById("infoPanel");
  const iframe = document.getElementById("panelIframe");
  iframe.src = link;
  panel.classList.add("show");
}

function hidePanel() {
  const panel = document.getElementById("infoPanel");
  const iframe = document.getElementById("panelIframe");
  panel.classList.remove("show");
  iframe.src = "";
}
