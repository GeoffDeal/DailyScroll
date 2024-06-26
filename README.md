# DailyScroll

## [Try it out here!](https://geoffdeal.github.io/DailyScroll/)

You import the [opml file](https://github.com/GeoffDeal/DailyScroll/blob/master/example%20files/GeoffDealDailyScrollFeeds.opml) in the example files folder for example settings

## Description
The DailyScroll is a reader for fetching and displaying feeds from around the web, with additional weather forecasting display. The goal is to bring your content to one place, functioning like a customizable, sortable, daily newspaper. A number of feeds types are compatible, including rss, atom, and YouTube. These feeds can be sorted into customizable categories as you see fit. Import and export your settings via opml from other readers you may be using or to trasnfer your feeds across devices.
![Screenshot 2024-04-10 at 14-19-53 DailyScroll](https://github.com/GeoffDeal/DailyScroll/assets/141517189/59fff687-83bb-465f-b4ef-0dfb16511d05)

The Daily Scroll was built as a project to learn JavaScript frontend development as part of the [Get Coding](https://www.getcoding.ca/) program. My goal was to build a content aggregator for browsing my favourite content from the web, free from ads and algorithm generated suggestions. The project was build with JavaScript and HTML/CSS and uses [CorsProxy.io](https://corsproxy.io/) to navigate the cors issues presented by not having a back end.

## How to Use DailyScroll
To use the DailyScroll, you can start with either the [GitHub live page](https://geoffdeal.github.io/DailyScroll/) or simply download the files and open the html file with your browser of choice. The program uses local storage so if you do both, or change browsers after set up, your settings will not appear in the fresh page (though you can export and import them). Once it is open, simply add folders for whatever categories you wish to receive content in and add feed URLs! Many blogs, news organizations, comics, and more have feeds for their content.

Many feeds are not displayed as prominently on websites as they used to be. Many are still there however! Here are some feeds built into popular websites:
  ### YouTube
  The feed for a YouTube channel is simply "https://www.youtube.com/feeds/videos.xml?channel_id=" followed by the channel ID. The channel ID may be in the channel's url, but more commonly you'll find a handle. The easy way to find the ID is to plug the handle in [this converter](https://www.streamweasels.com/tools/youtube-channel-id-and-user-id-convertor/). Append the result to the url above and you have a YouTube feed!
  ### Medium
  Posts on Medium can be organized in feeds in  number of ways, just follow [this guide on their site](https://help.medium.com/hc/en-us/articles/214874118-Using-RSS-feeds-of-profiles-publications-and-topics).
  ### Wordpress
  Wordpress has a significant share of all websites hosted, and all Wordpress sites set to public have a built in feed! You can follow [this guide](https://wordpress.com/support/feeds/) to get the feed for such a site.

## Acknowledgemets
I want to thank the [Get Coding](https://www.getcoding.ca/) community for help with this project. The support and knowledge offered helped me learn everything I needed to build this project. I especially want to thank my coach, Joshua Odagwe, who helped point me in the right direction more than once, and who helped reorient my thinking to better solve the issues I faced.
