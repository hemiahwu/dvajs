// 退出
export default function logout() {
  window.localStorage.clear();
  window.location.href = "/#/login";
}
