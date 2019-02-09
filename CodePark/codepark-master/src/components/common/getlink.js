import React from 'react';

const Getlink = (text) => {
    // let exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    // let exp1 = new RegExp('https:\/\/[a-zA-Z0-9]+.[a-zA-Z0-9]+.?[a-zA-Z0-9]*)');
    let exp1 = new RegExp('((https|http|ftp|file):\/\/[a-z0-9_-]+.[a-z0-9_-]+(.[a-z0-9_-])*)|((www.)?[a-z0-9]+.[a-z0-9]+(.[a-z0-9])*)','gi');
    text = "sadasdasdasd ftp://codepark_in.surge.sh";
    let text1 = "codepark.in"

    // let text1;
    // if(text) {
    //     text1=text.test(exp1, "<a href='$1'>$1</a>");
    // }
    let text2 = exp1.exec(text);
    // let exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
    // text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
    // return text1;
    // console.log(text, exp1, exp1.test(text1));//, exp1, text1);
}

export default Getlink;