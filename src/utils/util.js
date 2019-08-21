import api from './interface';
import httpWX from './wx-request';

function getDataQuery() {
    httpWX.post({
        url: api.public.dictionary,
        data: {

        }
    }).then(res => {
        console.log(res);
        let params = res.data;
        wx.setStorageSync('listData', params);
        dictionary = params;
    })
}

let dictionary;

export const getDictData = () => {
 return new Promise( ( resolve, reject ) => {
  if ( dictionary ) {
   resolve( dictionary );
  } else {
    httpWX.post({
        url: api.public.dictionary,
        data: {

        }
    }).then(res => {
        console.log(res);
        dictionary = res.data;
        resolve( dictionary );
    });
  }
 } );
};
export default getDataQuery;