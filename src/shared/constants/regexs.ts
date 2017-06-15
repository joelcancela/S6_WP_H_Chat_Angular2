export const imgURL = new RegExp("https?:\/\/[^ \t\n]*(.jpg|.png|.jpeg|.svg|.gif)");
export const youtubeURL = /^.*(youtu\.be\/|u\/\w\/|embed\/|watch\?v=|\&v=|playlist\?list=)([^# \t\n]*).*/;
export const tweetURL = /^.*(https?:\/\/twitter.com\/[^ \t\n]+\/status\/[\d]+).*/;
export const instagramURL = /^.*(https?:\/\/www.instagram.com\/p\/[\w\d-]+).*/;
export const tradTemplate = "^\\/trad [a-z][a-z] [a-z][a-z]";
export const scheduler_message = "^\/schedule #(.+) @([^ ]+) (.+)";
export const scheduler_message_hours = "(..):(..)";
