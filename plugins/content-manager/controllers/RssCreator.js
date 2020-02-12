const RSS = require("rss");
const fs = require('fs');

/*const RSSCreator = news => {
    let rssNews = rssNews.map( article =>{

    });
};*/

class RSSCreator {
  _feed = {};
 // _writeStream = fs.createWriteStream('rss.xml');

  constructor(props) {
    const { feedData, news } = props;

    feedData && this.changeFeed(feedData);
    feedData && news && this.addNews(news);
  }

  write() {
    fs.writeFile('rss.xml',this._feed.xml(), (error)=>{
        if(error){
            throw error;
        }
        console.log("✓rss update successfuly!");
    });
    /*
       this._writeStream.write(this._feed.xml(),'base64');
        this._writeStream.on('finish', () => {
          console.log("✓rss update successfuly!");
        });
        this._writeStream.end();

        console.log(this._feed.xml());
      */
  }
  changeFeed = feedData => {
    const {
      title,
      description,
      urlHome,
      icon,
      company,
      language,
      pubDate,
    } = feedData;

    this._feed = new RSS({
      title: `${title}`,
      description: `${description}`,
      feed_url: `${urlHome}/rss.xml`,
      site_url: `${urlHome}`,
      image_url: `${icon}`,
      // docs: "http://example.com/rss/docs.html",
      managingEditor: `${company}`,
      //webMaster: "Dylan Greene",
      copyright: `2019-${new Date().getFullYear()} ${company}`,
      language: `${language}`,
      pubDate: pubDate,
      ttl: "60",
      //custom_namespaces: {},
      //custom_elements: [],
    });
  };

  addNews = (news) => {
    console.log(news);
    news.map(el=>
    {
      this._feed.item({
        title: `${el.name}`,
        description: `${el.description}`,
        date: `${el.createdAt}`,
      });
    });


  };
}

module.exports={RSSCreator};
