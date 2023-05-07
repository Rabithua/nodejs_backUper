# nodejs_backUper

nodejs 备份数据库文件到 cos

## 环境准备

- 安装 nodejs pm2 (这块儿网上大把教程就不写了)
- 腾讯云 cos 创建一个[储存桶](https://console.cloud.tencent.com/cos/bucket?action=create)，创建一个[密钥](https://console.cloud.tencent.com/cam/capi)，并记录保存

## 开始部署

- 下载 github 源码，[点我下载](https://github.com/Rabithua/nodejs_backUper/archive/refs/heads/main.zip)
- 上传到你的服务器，目录自己决定，最好和 memos 数据库文件接近的位置
- 解压，cd 到 backUper 文件夹下
- 运行以下命令安装 npm 包

```
npm install
```

- 修改`backup.js`文件(文件里有详细解释) 
- 需要修改的字段有`SecretId` `SecretKey` `folderPath` `bucket` `region` `interval`
- 运行脚本，首次可以先把`interval`修改成一分钟也就是`60 * 1000`

```
// memoBackup 为pm2进程名字，可以自由修改

//输出日志到当前目录，使用这条
pm2 start backup.js --name memoBackup --log console.log  --error error.log

//不想输出日志，使用这条
pm2 start backup.js --name memoBackup
```

- 打开储存桶文件夹，看看备份成功了吗
- 最后记得修改`interval`，为合适的时间间隔
