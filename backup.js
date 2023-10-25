require("dotenv").config();
const COS = require('cos-nodejs-sdk-v5');
const zip = require('zip-dir');
const fs = require('fs');
const moment = require('moment');
const axios = require('axios');

moment.locale('zh-cn');

console.log("备份工具启动")
// 配置 COS 访问秘钥
const cos = new COS({
  SecretId: process.env.COS_SECRETID,
  SecretKey: process.env.COS_SECRETKEY,
})

// 备份数据的文件夹，下面函数会压缩这个文件夹并上传，上传后自动删除本地的压缩包
const folderPath = process.env.PATH;

// 上传文件到 COS，参数分别为储存桶id，地域，备份时间，当前为每隔24h备份一次
const bucket = process.env.COS_BUCKET;
const region = process.env.COS_REGION
const interval = 24 * 60 * 60 * 1000

function bark(content) {
  axios.get(`https://api.day.app/Xe9JYqaP6eKvq4TsvxjJfE/东京服务器/${content}`, {
    params: {
      icon: 'https://memores-cos.rabithua.club/web/logo.png',
      level: 'timeSensitive'
    }
  })
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

//以下如果不懂，请不要修改
function backup() {

  // 压缩目录
  const filename = moment().format('YYYY-MM-DD_HH-mm-ss') + '.zip';

  console.log('开始压缩：', moment().format('llll'))
  zip(folderPath, { saveTo: filename }, function (err, buffer) {
    console.log('压缩成功：', moment().format('llll'))
    try {
      console.log('开始上传：', moment().format('llll'))

      cos.putObject({
        Bucket: bucket,
        Region: region,
        // 上传到cos的文件夹（一般不用修改）
        Key: `backup/${filename}`,
        Body: fs.createReadStream(filename),
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        }

      }).then((result) => {
        console.log('上传成功:', moment().format('llll'))
        // 删除备份文件
        fs.unlink(filename, (err) => {
          if (err) {
            console.error('Delete failed:', err);
          } else {
            console.log('Delete success!');
          }
        })
      }).catch((err) => {
        bark('麦默数据库备份失败。')
        console.log('上传失败:', moment().format('llll'), err)
        // 删除备份文件
        fs.unlink(filename, (err) => {
          if (err) {
            console.error('Delete failed:', err);
          } else {
            console.log('Delete success!');
          }
        })
      })
    } catch (e) {
      console.error('An unexpected error occurred:', e);
    }
  })
}

backup()

setInterval(() => {
  backup()
}, interval);
