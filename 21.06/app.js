const fs = require('fs');
const path = require('path');

const pathDec2020 = path.join(__dirname, 'dec-2020');

// task 1
fs.readdir(pathDec2020, (errDirs, dirs) => {
    if (errDirs) {
        console.log(errDirs);
        return;
    }

    dirs.forEach(dir => {
        if (dir === '18.00' || dir === '20.00') {
            fs.readdir(path.join(pathDec2020, dir), (errFiles, files) => {
                if (errFiles) {
                    console.log(errFiles);
                    return;
                }
                
                files.forEach(file => {
                    fs.readFile(path.join(pathDec2020, dir, file), (errReadFile, data) => {
                        if (errReadFile) {
                            console.log(errReadFile);
                            return;
                        }

                        let fileRead = JSON.parse(data);
                        if (fileRead.time === '18:00') {
                            fs.rename(path.join(pathDec2020, '18.00', file), path.join(pathDec2020, '20.00', file), errRename => {
                                if (errRename) {
                                    console.log(errRename);
                                }
                            })
                        } else if (fileRead.time === '20:00') {
                            fs.rename(path.join(pathDec2020, '20.00', file), path.join(pathDec2020, '18.00', file), errRename => {
                                if (errRename) {
                                    console.log(errRename);
                                }
                            })
                        }
                    })
                })
            })
        }
    })
})

// task 2
fs.readdir(pathDec2020, (errDirs, dirs) => {
    if (errDirs) {
        console.log(errDirs);
        return;
    }

    dirs.forEach(dir => {
        if (dir === '18.00' || dir === '20.00') {
            fs.readdir(path.join(pathDec2020, dir), (errFiles, files) => {
                if (errFiles) {
                    console.log(errFiles);
                    return;
                }

                files.forEach(file => {
                    fs.readFile(path.join(pathDec2020, dir, file), (errReadFile, data) => {
                        if (errReadFile) {
                            console.log(errReadFile);
                            return;
                        }

                        let fileRead = JSON.parse(data);
                        if (fileRead.gender === 'female') {
                            fs.rename(path.join(pathDec2020, dir, file), path.join(pathDec2020, 'girls', file), errRename => {
                                if (errRename) {
                                    console.log(errRename);
                                }
                            })
                        } else if (fileRead.gender === 'male') {
                            fs.rename(path.join(pathDec2020, dir, file), path.join(pathDec2020, 'boys', file), errRename => {
                                if (errRename) {
                                    console.log(errRename);
                                }
                            })
                        }
                    })
                })
            })
        }
    })
})
