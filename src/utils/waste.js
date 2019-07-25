export const wasteArr = ['有害垃圾', '可回收物', '湿垃圾', '干垃圾', '不属于垃圾, 可能有害', '不属于垃圾, 可以回收', '不属于日常生活垃圾', '装修垃圾', '大件垃圾'];

export const getWasteNameByIndex = i => wasteArr[i];
export const getWasteIndexByName = v => wasteArr[wasteArr.indexOf(v)];
