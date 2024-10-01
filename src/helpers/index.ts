import { AuctionClassment } from "../apis/interfaces";
import { UserInfoRecieved } from "../apis/socketInterface";

export function getInitialName(p:string) {
  let pp: string = "";
  let nn:string = "";
  var res: string[] = p.split(" ");
  if (res.length > 1) {
    var maxl: number = res.length - 1;
    pp = res[0].charAt(0);
    nn = res[maxl].charAt(0);
  }

  if (res.length == 1) {
    var maxl: number = res.length - 1;
    pp = res[0].charAt(0);
    nn = "";
  }

  return pp + '' + nn;
}


export function creditNumber(s : number) {
  
  let num : number = parseInt(s.toString());
  let c : string = num.toString();
  let res : Array<string> = [];
  res = c.match(/.{1,4}/g) || []
  return res[0] + ' ' + res[1] + ' ' + res[2] + ' ' + res[3]

}

export function creditDate(d : string) {
  let dd = new Date(d);
  return (dd.getMonth() < 10 ? ("0" + dd.getMonth()) : dd.getMonth())  + '/' + (dd.getFullYear() + 3).toString().substring(2, 4);
}

export function getRandomNumber(digit : number) {
  return Math.random().toFixed(digit).split('.')[1];
}

export function removePlayer(data : UserInfoRecieved[], idSocket: string) {
  let d = data;
  return d.filter(item => item.idSocket != idSocket)
}

export function toUtcDate(date? : string) {
    var myDate = date ? new Date(date) : new Date();
    var isoDate = new Date(myDate.getTime() + myDate.getTimezoneOffset() * 60000);
    return isoDate;
}

export function getPlayerMise(data : AuctionClassment[], id: string) {
  let d = data;
  let f = d.filter(item => item._id == id);
  return f.length > 0 ? f[0].totalSolde : 0;
}