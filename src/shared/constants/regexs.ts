export const imgURL = /https?:\/\/[^ \t\n]*(.jpg|.png|.jpeg|.svg|.gif)/;
export const youtubeURL = /(^| )https?:\/\/(www.youtube.com\/)?(youtu\.be\/|u\/\w\/|embed\/|watch\?v=|\&v=|playlist\?list=)([^# \t\n]*).*/;
export const tweetURL = /^.*(https?:\/\/twitter.com\/[^ \t\n]+\/status\/[\d]+).*/;
export const instagramURL = /^.*(https?:\/\/www.instagram.com\/p\/[\w\d-]+).*/;
export const tradTemplate = "^\\/trad [a-z][a-z] [a-z][a-z]";
export const scheduler_message = /^\/schedule #(.+) @([^ \t\n]+) ?([^ \t\n]+)? +(.+)/;
export const scheduler_message_hours = /([0-9]{2}):([0-9]{2})/;
export const scheduler_message_day = /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/;

