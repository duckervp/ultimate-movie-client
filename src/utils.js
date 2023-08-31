import { toast } from "react-toastify";
import { BASE_URL } from "./constants"

export const getFileUrl = (filePath) => {
  if (filePath.startsWith("data:") || filePath.startsWith("http")) {
    return filePath;
  }
  if (filePath.startsWith("/")) {
    filePath = filePath.slice(1);
  }
  return BASE_URL.concat(filePath);
}

/**
 * Get array items that in the objArr1 and not in objArr2
 * @param  {Array} objArr1 Array of object 1
 * @param  {Array} objArr2 Array of object 2
 * @param  {string} field An attribute of the object to compare
 * @return {Array}      Array items that in the objArr1 and not in objArr2
 */
export const getItemsNotIn = (objArr1, objArr2, field) => {
  const resultArr = [];

  if (objArr1.length === 0 || objArr2.length === 0) return resultArr;

  objArr1.forEach(obj1 => {
    for (let i = 0; i < objArr2.length; i++) {
      if (objArr2.at(i)[field] === obj1[field]) {
        continue;
      }
      resultArr.push(obj1);
    }
  });

  return resultArr;
}


/**
 * Delete objArr1 items in objArr2
 * @param  {Array} objArr1 Array of object 1
 * @param  {Array} objArr2 Array of object 2
 * @param  {string} field An attribute of the object to compare
 * @return {Array}      Array items in the objArr2 and not in objArr1
 */
export const deleteItems = (objArr1, objArr2, field) => {
  const resultArr = [];

  if (objArr1.length === 0 || objArr2.length === 0) return objArr1.concat(...objArr2);

  objArr2.forEach(obj2 => {
    for (let i = 0; i < objArr1.length; i++) {
      if (objArr1.at(i)[field] === obj2[field]) {
        continue;
      }
      resultArr.push(obj2);
    }
  });

  return resultArr;
}


export const getListGenre = (genres) => {
  if (!genres || genres.length <= 0) {
    return "";
  }
  genres = genres.map(genre => genre.name);
  return genres.slice(1).reduce((a, c) => a + ", " + c, genres[0]);
}

export const sortEpisodeFnc = (ep1, ep2) => {
  if (ep1.id > ep2.id) {
    return 1;
  } else if (ep1.id < ep2.id) {
    return -1;
  }
  return 0;
}

export const handleError = (err, defaultMessage) => {
  const code = err.data?.code;
  let message;
  if (!code) {
    message = "No Server Response";
  } else if (code === 401) {
    message = "Unauthorized";
  } else if (code === 400) {
    message = err.data?.message || defaultMessage;
  } else {
    message = defaultMessage;
  }
  showErrorMessage(message || "Unexpected Error");
}

export const showSuccessMessage = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT
  });
}

export const showErrorMessage = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT
  });
}