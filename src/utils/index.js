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
      console.log('message: ', )
    });
  };

  static openNotification({ icon, title, message: body }) {
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
}

export default Utils;
