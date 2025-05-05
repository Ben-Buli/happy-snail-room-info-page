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

// 顯示提示訊息
function showToast(message, isError = false) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "80px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = isError ? "#dc3545" : "#28a745";
  toast.style.color = "white";
  toast.style.padding = "8px 16px";
  toast.style.borderRadius = "6px";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
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
    // showToast("資料載入失敗 ❌", true);
  });

// tab 切換控制
tabHost1.addEventListener("click", (e) => {
  e.preventDefault();
  tabHost1.classList.add("active");
  tabHost2.classList.remove("active");

  container2.classList.remove("fade-in");
  container2.classList.add("fade-out");

  titleText.innerText = "一館房型";
  setTimeout(() => {
    container2.style.display = "none";
    container1.style.display = "flex";
    container1.classList.remove("fade-out");
    container1.classList.add("fade-in");
  }, 300);
});

tabHost2.addEventListener("click", (e) => {
  e.preventDefault();
  tabHost2.classList.add("active");
  tabHost1.classList.remove("active");

  container1.classList.remove("fade-in");
  container1.classList.add("fade-out");
  titleText.innerText = "二館房型";
  setTimeout(() => {
    container1.style.display = "none";
    container2.style.display = "flex";
    container2.classList.remove("fade-out");
    container2.classList.add("fade-in");
  }, 300);
});
