Page({
  data: {
    firstNews: [],
    listNews: []
  },
  onLoad(){
    this.getNews()
  },
  // 获取新闻
  getNews(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data:{
        type: 'gn',
      },
      success: res => {
        //console.log(res.data)
        let result = res.data.result
        this.setPageNews(result)
      },
      complete: ()=>{
        callback && callback()
      }
    })
  },
  // 设置页面显示的新闻
  setPageNews(result){
    let listNews = []
    let a = '2012-07-01T09:34:12.000Z'
    //console.log(a.substring(11,16))
    let cursource = ''
    for( let i = 1; i < result.length; i++){
      listNews.push({
        id: result[i].id,
        title: result[i].title,
        date: result[i].date.substring(11,16),
        source: result[i].source == "" ? "互联网" : result[i].source,
        firstImage: result[i].firstImage
      })
    }
    let firstNews = []
    //console.log(result[0])
    firstNews.push({
      id: result[0].id,
      title: result[0].title,
      date: result[0].date.substring(11, 16),
      source: result[0].source == "" ? "互联网" : result[0].source,
      firstImage: result[0].firstImage  
    })
    this.setData({
      firstNews: firstNews,
      listNews: listNews
    })
  },
  onTapNews(e){
    let news = e.currentTarget.dataset.news
    wx.navigateTo({
      url: '/pages/news/news?id=' + news.id,
    })
  },
  onPullDownRefresh(){
    this.getNews(() => {wx.stopPullDownRefresh()})
  }
})