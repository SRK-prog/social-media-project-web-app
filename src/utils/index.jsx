import moment from "moment";

class Utils {
  static requestNotificationAccess = () => {
    return new Promise(async (resolve, reject) => {
      const error = { notification: "permission denied" };
      if (Notification.permission === "denied") return reject(error);
      if (Notification.permission === "granted") return resolve();
      const permission = await Notification.requestPermission();
      if (permission === "granted") return resolve();
      if (permission === "denied") return reject(error);
    });
  };

  static openNotification({ icon, title, message: body }) {
    if (Notification.permission === "denied") return;
    new Notification(title, {
      body,
      icon: !!icon ? icon : "/images/avatar.png",
    });
  }

  static dispatch = (type, payload = {}) => {
    return (dispatch) => dispatch({ type, payload });
  };

  static formatDate = (date) => {
    const today = new Date();
    const isToday =
      today.toLocaleDateString() === new Date(date).toLocaleDateString();
    if (isToday) return moment(date).format("hh:mm a");
    return moment(date).format("DD-MM-YYYY hh:mm a");
  };

  static localStorageGetItem = (key) => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return null;
  };

  static localStorageSetItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  static setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  static getCookie = (name) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  static removeCookie = (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
}

export default Utils;
