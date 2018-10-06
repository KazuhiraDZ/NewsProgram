const newsCategory = [
  { id: 'gn', name: '国内' },
  { id: 'gj', name: '国际' },
  { id: 'cj', name: '财经' },
  { id: 'yl', name: '娱乐' },
  { id: 'js', name: '纪实' },
  { id: 'ty', name: '体育' },
  { id: 'other', name: '综合' }
]

Page({
  data: {
    newsCategory,
    currCate: 0,
    firstNews: [],
    listNews: []
  },
  onLoad(){
    this.getNews(0)
  },
  // 获取新闻
  getNews(ID,callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data:{
        type: newsCategory[ID].id,
      },
      success: res => {
        //console.log(res.data)
        let result = res.data.result
        //console.log(result)
        this.setPageNews(result)
      },
      complete: ()=>{
        typeof callback === 'function' && callback()
      }
      ,fail: err => {
        console.log("Error")
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
        source: !!result[i].source ? result[i].source : "互联网",
        firstImage: result[i].firstImage == "" ? "/images/first.jpg" : result[i].firstImage
      })
    }
    let firstNews = []
    //console.log(result[0])
    firstNews.push({
      id: result[0].id,
      title: result[0].title,
      date: result[0].date.substring(11, 16),
      source: !!result[0].source ? result[0].source : "互联网",
      firstImage: !!result[0].firstImage ? result[0].firstImage : "../images/first.jpg"
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
    this.getNews(this.data.currCate,() => {wx.stopPullDownRefresh()})
  },
  handleCateChange(e){
    let index = e.currentTarget.dataset.index
    //console.log(index)
    this.setData({
      currCate: index,
    })
    this.getNews(this.data.currCate)
  }
})