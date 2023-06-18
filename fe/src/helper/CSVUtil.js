const csvJSON = function (csv) {
    var lines = csv.split("\r");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 1; j < headers.length; j++) {
            const text = currentline[j];
            obj[headers[j]] = text;
        }
        if (!checkEmptyObj(obj)) result.push(obj);
    }
    return result;
};

function checkEmptyObj(obj) {
    let isEmpty = false;
    Object.keys(obj).forEach((e) => {
        if (!obj[e]) {
            return (isEmpty = true);
        }
    });
    return isEmpty;
}

function fileExtention(filename) {
    var parts = filename.split(".");
    return parts[parts.length - 1];
}

export const getCSV = function (file) {
    return new Promise((resolve, reject) => {
        if (file && fileExtention(file.name) === "csv") {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (evt) {
                resolve(csvJSON(evt.target.result));
            };
            reader.onerror = function (evt) {
                throw new Error("error reading file");
            };
        } else {
            throw new Error("Not a csv file");
        }
    });
};