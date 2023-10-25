# nodejs_backUper

A node.js script for backing up database files to Tencent Cloud Object Storage (COS).

<img width="542" alt="截屏2023-05-07 17 09 14" src="https://user-images.githubusercontent.com/34543831/236668501-fd4d84db-4cea-455e-afef-f617d2749616.png">
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

- Rename the `env` file to `.env` (the file contains detailed explanations).
- The fields that need to be modified are `COS_BUCKET`, `COS_REGION`, `COS_SECRETID`, `COS_SECRETKEY`, and `PATH`.
- Run the script. For the first time, you can change the backup interval in the `backup.js` file to one minute, which is `60 * 1000`.

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
