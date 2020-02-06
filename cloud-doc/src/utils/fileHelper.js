const fs = require('fs');
const path = require('path');

const fileHelper = {
    readFile: (path, cb) => {
        fs.readFile(path, { encoding: 'utf8'}, (err, data) => {
            if(!err) {
                cb(data)
            }
        })
    },
    writeFile: (path, content, cb) => {
        fs.writeFile(path, content, { encoding: 'utf8'}, (err)=>{
            if(!err) {
                cb()
            }
        })
    }
}

const testPath = path.join(__dirname, 'helper.js')
const testWPath = path.join(__dirname, 'hello.js')

fileHelper.readFile(testPath, (data)=>{
    console.log(data)
})

fileHelper.writeFile(testWPath, '12324',(data)=>{
    console.log('完成')
})