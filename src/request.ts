const config = require("./config");

export const usePrefix = config.apiUrl

// 封装 GET 请求
export const get = async (url: RequestInfo | URL, token?: string) =>{
  const local_token = window.localStorage.getItem('access_token') || ''
  const useToken = token ? token : local_token
  try {
    const response = await fetch(`${usePrefix}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${useToken}`,
      },
    });
    const data = await response.json();
    const code = response.status
    // 用户信息有误，移除access_token
    if(data === 401){
      window.localStorage.removeItem('access_token')
    }
    return { data, code };
  } catch (error) {
    return error;
  }
}

// 封装 POST 请求
export const post = async (url: RequestInfo | URL, data: any) => {
  const local_token = window.localStorage.getItem('access_token') || ''
  console.log(`${usePrefix}${url}`, 'usePrefix');
  
  try {
    const response = await fetch(`${usePrefix}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${local_token}`,
         'Access-Control-Allow-Origin': '*',
        // 'Accept':'*/*'
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    const code = response.status
    // 用户信息有误，移除access_token
    if(code === 401){
      window.localStorage.removeItem('access_token')
    }
    return { data: responseData, code };
  } catch (error) {
    return error;
  }
};