// pages/news/news.js
Page({
  data: {
    id: 0,
    news: [],
    content: [],
    readCount: 0,
  },
  onLoad(options){
    //console.log(options.id)
    this.setData({
      id: options.id,
    })
    this.getNewsDetail(this.data.id)
  },
  getNewsDetail(id){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id,
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        this.setData({
          title: result.title,
          source: result.source == '' ? '互联网' : result.source,
          date: result.date.substring(11,16),
          content: result.content,
          readCount: result.readCount,
        })
      }
    })
  }
})