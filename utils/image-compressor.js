const fs = require('fs');
const im = require('imagemagick');

exports.compress = function (folderPath, quality) {
    console.log('folder path is : ' + folderPath);
    fs.readdir(folderPath, (err, files) => {
        files.forEach(file => {
            let sourceFile = folderPath + "/" + file;
            let targetFile = sourceFile.replace('.png', '.jpg');
            files.forEach(file => {
                im.convert([sourceFile, '-quality', quality, targetFile],
                    function (err, stdout) {
                        if (err) throw err;
                    });
            });
        });
    });
}