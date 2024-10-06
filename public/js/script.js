const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signUpBtn");

loginBtn.addEventListener("click", () => {
  loadDynamicPage("login");
});
signupBtn.addEventListener("click", () => {
  loadDynamicPage("signup");
});

function loadDynamicPage(page) {
  if (page === "index") {
    document.getElementById("buttonsContainer").style.display = 'block'; // Show buttons
    document.getElementById("content").innerHTML = ""; // Reset content for index
  } else {
    document.getElementById("buttonsContainer").style.display = 'none'; // Hide buttons
    fetch(`html/${page}.html`)
      .then((res) => res.text())
      .then((data) => {
        document.getElementById("content").innerHTML = data;
      })
      .catch((err) => {
        alert("Failed to load page");
        console.error("Error loading page:", err);
      });
  }
  window.history.pushState({}, "", `/${page}`);
}

// Handle browser back/forward navigation
window.addEventListener("popstate", () => {
  const path = window.location.pathname.replace("/", "") || "index";
  loadDynamicPage(path);
});

// Load initial page based on current URL
const initialPath = window.location.pathname.replace("/", "") || "index";
loadDynamicPage(initialPath);
