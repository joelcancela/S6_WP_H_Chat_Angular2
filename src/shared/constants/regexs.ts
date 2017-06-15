export const IMGURL = new RegExp("https?:\/\/[^ \t\n]*(.jpg|.png|.jpeg|.svg|.gif)");
export const YOUTUBEURL = /^.*(youtu\.be\/|u\/\w\/|embed\/|watch\?v=|\&v=|playlist\?list=)([^# \t\n]*).*/;
export const TWEETURL = /^.*(https?:\/\/twitter.com\/[^ \t\n]+\/status\/[\d]+).*/;
export const INSTAGRAMURL = /^.*(https?:\/\/www.instagram.com\/p\/[\w\d-]+).*/;
export const TRAD_TEMPLATE = "^\\/trad [a-z][a-z] [a-z][a-z]";
export const SCHEDULER_MESSAGE = "^\/schedule #(.+) @([^ ]+) (.+)";
export const SCHEDULER_MESSAGE_HOURS = "(..):(..)";
