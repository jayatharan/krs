export function setCookie(name, value, daysToLive=undefined){
    let cookie = `${name}=${encodeURIComponent(value)};`;
    if(daysToLive){
        cookie = `${cookie} max-age=${daysToLive*24*60*60}`;
    }
    document.cookie = cookie;
}

export function getCookie(name) {
    const cookieArr = document.cookie.split(';');
    let value = null;
    
    cookieArr.map(v => {
        const cookiePair = v.split('=');
        if(name === cookiePair[0].trim()){
            value = decodeURIComponent(cookiePair[1])
        }
    })

    return value;
}

export function deleteCookie(name) {
    const cookie = `${name}=; max-age=0`;
    document.cookie = cookie;
}