export function getDateFromTimestamp(ts) {
  let date = new Date(ts)

  let dd = date.getDate()
  let mm = date.getMonth() + 1
  let yyyy = date.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  return `${mm}-${dd}-${yyyy}`
}

export function getTimestamp() {
  return Date.now()
}

export function updatePostObjectInArray(array, action) {
  return array.map(item => {
      if(item.id !== action.id) {
          // This isn't the item we care about - keep it as-is
          return item;
      }
      
      // Otherwise, this is the one we want - return an updated value
      const { title, body } = action
      return {
          ...item,
          title,
          body
      };    
  });
}

export function updateCommentObjectInArray(array, action) {
  return array.map(item => {
      if(item.id !== action.id) {
          // This isn't the item we care about - keep it as-is
          return item;
      }
      
      // Otherwise, this is the one we want - return an updated value
      const { timestamp, body } = action
      return {
          ...item,
          timestamp,
          body
      };    
  });
}

const uuidv1 = require('uuid/v1')

export function getNewId() {
  return uuidv1()
}