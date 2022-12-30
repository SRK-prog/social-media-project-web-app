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
    new Notification(title, {
      body,
      icon: !!icon ? icon : "/images/default-avatar.png",
    });
  }

  static dispatch = (type, payload = {}) => {
    return (dispatch) => dispatch({ type, payload });
  };
}

export default Utils;
