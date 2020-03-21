import {bastURL} from './config.js'

export default function(options){
   return new Promise((resolve,reject) => {
      wx.request({
        url: bastURL + options.url,
        data: options.data,
        method: options.method || 'get',
        success: resolve
      })
   })
}