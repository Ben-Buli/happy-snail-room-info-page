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

const titleText = document.getElementById("titleText");
const container1 = document.getElementById("cardContainer1");
const container2 = document.getElementById("cardContainer2");
const tabHost1 = document.getElementById("tabHost1");
const tabHost2 = document.getElementById("tabHost2");

function renderHost(container, data) {
  container.innerHTML = "";
  data.forEach((item, index) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-xl-3 card-animate";
    col.style.animationDelay = `${index * 100}ms`;

    const onClickAttr = item.link ? `onclick="window.open('${item.link}', '_blank')"` : "";

    const imgUrlAttr = item.imgurl ? `style="background-image: url('${item.imgurl}')"` : "";
    const btnText = item.btnText ? `<a class="caption-btn">${item.btnText}</a>` : '';

    col.innerHTML = `
      <div class="host_card" ${onClickAttr}>
        <div class="bg_zoom" ${imgUrlAttr}></div>
        ${btnText}
      </div>
    `;
    
    container.appendChild(col);
  });
}


// 載入合併資料
fetch("data.json")
  .then(res => {
    if (!res.ok) throw new Error("無法讀取資料");
    return res.json();
  })
  .then(data => {
    const host1Items = data.hosts.filter(item => item.host === 1);
    const host2Items = data.hosts.filter(item => item.host === 2);
    renderHost(container1, host1Items);
    renderHost(container2, host2Items);
  })
  .catch(err => {
    console.error("資料載入失敗", err);
  });

  tabHost1.addEventListener("click", (e) => {
    e.preventDefault();
    tabHost1.classList.add("active");
    tabHost2.classList.remove("active");
  
    titleText.innerText = "一館房型";
  
    // 切換顯示容器
    container2.classList.remove("fade-in");
    container2.classList.add("fade-out");
  
    setTimeout(() => {
      container2.style.display = "none";
  
      container1.style.display = "flex";
      container1.classList.remove("fade-out"); // 👈 修正：確保拿掉 opacity:0 的類別
      container1.classList.add("fade-in");     // 👈 修正：重新 fade-in 顯示
    }, 300);
  });
  
  tabHost2.addEventListener("click", (e) => {
    e.preventDefault();
    tabHost2.classList.add("active");
    tabHost1.classList.remove("active");
  
    titleText.innerText = "二館房型";
  
    container1.classList.remove("fade-in");
    container1.classList.add("fade-out");
  
    setTimeout(() => {
      container1.style.display = "none";
  
      container2.style.display = "flex";
      container2.classList.remove("fade-out"); // 👈 同樣修正
      container2.classList.add("fade-in");
    }, 300);
  });
  
  tabHost1.click(); // 頁面載入的時候先觸發一次tab1被選中的事件
