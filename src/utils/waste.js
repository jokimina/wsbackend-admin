export const wasteArr = ['有害垃圾', '可回收物', '湿垃圾', '干垃圾'];

export const getWasteNameByIndex = i => wasteArr[i];
export const getWasteIndexByName = v => wasteArr[wasteArr.indexOf(v)];
