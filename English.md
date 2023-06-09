# nodejs_backUper

A node.js script for backing up database files to Tencent Cloud Object Storage (COS).

## Environment Setup

- Install node.js and pm2 (there are plenty of tutorials available online, so we won't cover that here).
- Create a [bucket](https://console.cloud.tencent.com/cos/bucket?action=create) and a [secret key](https://console.cloud.tencent.com/cam/capi), and keep them handy.

## Deployment

- Download the source code from GitHub [here](https://github.com/Rabithua/nodejs_backUper/archive/refs/heads/main.zip).
- Upload it to your server wherever you like, preferably somewhere near the location of your database files.
- Unzip the file and navigate to the `backUper` directory.
- Run the following command to install npm packages:

```
npm install
```

- Modify the `backup.js` file (details are explained inside the file).
- The fields that need to be modified are `SecretId`, `SecretKey`, `folderPath`, `bucket`, `region`, and `interval`.
- Run the script. You may set the `interval` to one minute (`60 * 1000`) for the first run.

```
// memoBackup can be any name you like for the pm2 process
// Use this command to output logs to the current directory

pm2 start backup.js --name memoBackup --log console.log  --error error.log

// Use this command to disable log output

pm2 start backup.js --name memoBackup
```

- Check the COS bucket to see if the backup was successful.
- Finally, remember to set the `interval` to an appropriate time interval.

## That's it! 😘 Take a look at these if you want:

[Memo Wechat Mini Program](https://github.com/Rabithua/memos_wmp)

### Please give us a star, thank you!
