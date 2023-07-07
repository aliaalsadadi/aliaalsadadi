from googleapiclient.discovery import build
import os
import datetime
from yt_dlp import YoutubeDL
from hijri_converter import convert

def download(url):
    with YoutubeDL() as ydl:
        ydl.download(url)

yt_folder = r'C:\Users\HP\Videos\youtube'
os.chdir(yt_folder)
print(os.access(yt_folder, os.F_OK))
print(os.getcwd())
CHANNEL_ID = 'UC7LzcXosEIf7q3zgoc73IQw' #change to Malsanbis channel ID
end_date = datetime.datetime.now()
start_date = end_date - datetime.timedelta(days=10)
end_date = end_date.strftime('%Y-%m-%dT%H:%M:%SZ')
start_date =start_date.strftime('%Y-%m-%dT%H:%M:%SZ')
API_key = "AIzaSyC-oyMFCxQAIMUPtnWvKemKUm7C5UuGLjk"
youtube = build('youtube', 'v3', developerKey = API_key)
request = youtube.channels().list(
    part='statistics',
    forUsername= CHANNEL_ID
)
videos_response = youtube.search().list(
    channelId=CHANNEL_ID,
    type='video',
    publishedAfter=start_date,
    publishedBefore=end_date,
    part='id,snippet',
    maxResults=50
).execute()
videos = []
for video in videos_response['items']:
    video_id = video['id']['videoId']
    video_title = str(video['snippet']['title'])
    video_date = datetime.datetime.fromisoformat(video['snippet']['publishedAt'].replace('Z', '+00:00'))
    year = video_date.year
    month = video_date.month
    day = video_date.day
    hijri_year, hijri_month, hijri_day = convert(year,month,day)
    new_year =  str(year)  + '-' + hijri_year
    new_month = str(month) + '-' + hijri_month
    video_url = f'https://www.youtube.com/watch?v={video_id}'
    path_year = yt_folder +'\\' + f'{new_year}'
    full_path = yt_folder +'\\' + f'{new_year}' + '\\' + f'{new_month}'
    if new_year in os.listdir():
        os.chdir(new_year)
    else:
        os.mkdir(new_year)
        os.chdir(new_year)
    if new_month in os.listdir():
        os.chdir(new_month)
    else:
        os.mkdir(new_month)
        os.chdir(new_month)
    if 'استشهاد' in video_title:
        if 'وفيات' in os.listdir():
            os.chdir('وفيات')
        else:
            os.mkdir('وفيات')
            os.chdir('وفيات')
    elif "شهادة" in video_title:
        if 'وفيات' in os.listdir():
            os.chdir('وفيات')
        else:
            os.mkdir('وفيات')
            os.chdir('وفيات')
    elif "عزاء" in video_title:
        if 'وفيات' in os.listdir():
            os.chdir('وفيات')
        else:
            os.mkdir('وفيات')
            os.chdir('وفيات')
    elif '💔' in video_title:
        if 'وفيات' in os.listdir():
            os.chdir('وفيات')
        else:
            os.mkdir('وفيات')
            os.chdir('وفيات')
    elif 'محاضرة' in video_title:
        if 'محاضرات' in os.listdir():
            os.chdir('محاضرات')
        else:
            os.mkdir('محاضرات')
            os.chdir('محاضرات')
    else:
        if 'افراح' in os.listdir():
            os.chdir('افراح')
        else:
            os.mkdir('افراح')
            os.chdir('افراح')
    download(video_url)
    videos.append({'date': str(video_date.date()), 'title': video_title, 'url': video_url})
    os.chdir(yt_folder)