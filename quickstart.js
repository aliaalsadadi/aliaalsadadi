const {google} = require('googleapis');
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');

google.youtube('v3').search.list({
  key: 'AIzaSyC-oyMFCxQAIMUPtnWvKemKUm7C5UuGLjk',
  part: 'snippet',
  type: 'video',
  channelId : 'UC7LzcXosEIf7q3zgoc73IQw',
  eventType: 'completed',
  publishedAfter: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
}).then((response) => {
  const searchResults = response.data.items;

  searchResults.forEach(video => {
    const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
    const options = {
      quality: 'highest',
    };
    const uploadDate = new Date(video.snippet.publishedAt);
    const year = uploadDate.getFullYear();
    const month = (uploadDate.getMonth() + 1).toString().padStart(2, '0');

    const dirName = path.join(year.toString(), month.toString());   
    const yearDir = path.join('C:','\Users','\HP','\Videos','\youtube', year.toString()); // dirname should be changed to بث مباشر path
    if (!fs.existsSync(yearDir)) {
      fs.mkdirSync(yearDir);
    }
    const monthDir = path.join('C:','\Users','\HP','\Videos','\youtube', dirName); // dirname should be changed to بث مباشر path
    if (!fs.existsSync(monthDir)) {
      fs.mkdirSync(monthDir);
    }
    const fileName = `${video.snippet.title}.mp4`;
    const filePath = path.join(monthDir, fileName);
    ytdl(videoUrl, options)
  .pipe(fs.createWriteStream(filePath))
  .on('finish', () => console.log(`Video "${video.snippet.title}" downloaded successfully to ${dirName}!`))
  .on('error', (err) => console.error(`Error downloading video "${video.snippet.title}":`, err));
  });
}).catch((err) => console.log(err));
