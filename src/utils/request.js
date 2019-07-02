import axios from 'axios';
import { Notification } from 'element-ui';
import Cookies from 'js-cookie';
import { getLangMessage } from '@/utils';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const config = {
  timeout: 120000,
  withCredentials: true,
  headers: {
    token: encodeURIComponent(Cookies.get('GM_TOKEN') || ''),
    appId: '0407296056293301',
  }
};

if(process.env.NODE_ENV === 'development') {
  config.baseURL = '/apis/';
  // 开发环境
} else if(process.env.NODE_ENV === 'production') {
  // 生产环境
  config.baseURL = "https://www.easy-mock.com/mock/5d11ea22e518e1085a79a5e2/devops/"; //这里是线上api请求地址
}


const ajax = axios.create(config);

const request = async (options) => {
  try {
    console.log(options);
    const response = await ajax(options);
    checkStatus(response);
    const data = await response.data;

    if (data.code !== 200) {
      setTimeout(() => {
        Notification.error({
          title: getLangMessage('error'),
          message: data.message
        });
      }, 0);
    }

    return {
      data
    };
  } catch (err) {
    Notification.error({
      title: getLangMessage('error'),
      message: getLangMessage('systemError')
    });
  }
};

export default request;