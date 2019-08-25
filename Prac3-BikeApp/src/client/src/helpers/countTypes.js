const getMostCommonType = (data) => {
    const totalCount = {};
    data.map((i) => {
        if (i.type in totalCount) {
            totalCount[i.type] ++;
        } else {
            totalCount[i.type] = 1;
        }
        return true;
    })

    let maxCount = 0;
    let maxType; 
    for (let type in totalCount) {
        if (totalCount[type] > maxCount) {
            maxCount = totalCount[type];
            maxType = type;
        } 
    }
    return maxType;
}

module.exports = getMostCommonType;