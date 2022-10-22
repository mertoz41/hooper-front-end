

  const getTiming = (created_at) => {
    let _MS_PER_DAY = 1000 * 60 * 60 * 24;
    let timeNow = new Date();
    let created = new Date(created_at);
    // minutes
    let difference = timeNow - created;
    let differenceMinute = Math.floor(difference / 1000 / 60);
    let differenceHour = Math.floor(difference / 1000 / 60 / 60);

    let utcnow = Date.UTC(
      timeNow.getFullYear(),
      timeNow.getMonth(),
      timeNow.getDate()
    );
    let utcitem = Date.UTC(
      created.getFullYear(),
      created.getMonth(),
      created.getDate()
    );

    if (differenceMinute < 60) {
      if (differenceMinute < 1) {
        return "just now";
      } else {
        return `${differenceMinute} ${
          differenceMinute == 1 ? "minute" : "minutes"
        } ago`;
      }
    } else if (differenceHour < 24) {
      if (differenceHour == 1) {
        return `${differenceHour} hour ago`;
      } else {
        return `${differenceHour} hours ago`;
      }
    } else {
      let result = Math.floor((utcnow - utcitem) / _MS_PER_DAY);
      if (result == 1) {
        return `${result} day ago`;
      } else {
        return `${result} days ago`;
      }
    }
  };

export {getTiming}