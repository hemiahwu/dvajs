// 退出
export default function logout() {
  window.localStorage.clear();
  window.location.href = "/#/login";
}

// 一旦侦听storage发生改变则强制退出
export function forceLogout() {
  window.addEventListener("storage", function(e) {
    this.console.log(e);
    if (e.key == "key" || e.key == "email") {
      if (
        (e.newValue && e.oldValue && e.newValue !== e.oldValue) ||
        (e.oldValue && !e.newValue)
      ) {
        logout();
      }
    }
  });
}
