import https from 'https';
import {Options} from '../types/https-types'

const setOptions = (url: String, method: string,): Options => {
    
    return {
        host: process.env.HOSTNAME,
        path: `/v1/${url.startsWith('/') ? url.replace('/', '') : url}`,
        method: method,
        headers: {
            "Authorization": process.env.SECRET_KEY
        }
    }
}

const Post = async (url: String, body: { [k: string]: any}) : Promise<any> => {
    let options : Options = setOptions(url, "POST"); 
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            if (res.statusCode !== 201) {
              reject(res.statusMessage);
              res.resume();
              return;
            }
        
            let data = '';
        
            res.on('data', (chunk) => {
              data += chunk;
            });
        
            res.on('close', () => {
              resolve(JSON.parse(data));
            });
            
        })
        req.write(JSON.stringify(body))
        req.end()
        req.on('error', (err) => {
            reject(err.message)
        })
    })
}

const Get = async (url: String, params: { [k: string]: any}) : Promise<any> => {
    let urlParams = url.endsWith("/") ? url.replace("/", "?") : url.concat("?")
    for (const param in params) {
        urlParams = urlParams.endsWith("?") ? urlParams : urlParams.concat("&")
        urlParams = urlParams.concat(param, "=", params[param])
    }

    let options : Options = setOptions(urlParams, "GET"); 

    return new Promise((resolve, reject) => {
        const response = https.request(options, (res) => {
            if (res.statusCode !== 200) {
              reject(`${res.statusCode}`);
              res.resume();
              return;
            }
        
            let data = '';
        
            res.on('data', (chunk) => {
              data += chunk;
            });
        
            res.on('close', () => {
                resolve(JSON.parse(data))
            });
        })

        response.end()
        response.on('error', (err) => {
            reject(err.message)
        })
    })
}

const Put = async (url: String, body: { [k: string]: any}) : Promise<any> => {
    let options : string = ""; 
    return new Promise((resolve, reject) => {
        https.request(options, (res) => {
            
        })
    })
}

const Delete = async (url: String, body: { [k: string]: any}) : Promise<any> => {
    let options : string = ""; 
    return new Promise((resolve, reject) => {
        https.request(options, (res) => {
            
        })
    })
}