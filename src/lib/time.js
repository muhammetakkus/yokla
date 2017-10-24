export default class Time {
  constructor () {
    this.now = new Date()
    this.year = this.now.getFullYear()
    this.month = this.withZero(this.now.getMonth() + 1)
    this.date = this.withZero(this.now.getDate())
    this.hour = this.withZero(this.now.getHours())
    this.min = this.withZero(this.now.getMinutes())
    this.sec = this.withZero(this.now.getSeconds())
  }
  getTimeTR () {
    return this.date + '-' + this.month + '-' + this.year
  }
  getTimeEN () {
    return this.year + '-' + this.month + '-' + this.date
  }
  getDateTR () {
    return this.hour + '-' + this.min + '-' + this.sec
  }
  getDateEN () {
    //
  }
  getYear () {
    return this.year
  }
  getHourAndMin () {
    return this.hour + ':' + this.min
  }
  // gelen format tr ise en, en ise tr yapar
  convertTimeEnToTr (time) {
    this.time = time.split('-')
    this.time = this.time[2] + '-' + this.time[1] + '-' + this.time[0]
    return this.time
  }
  getNowDate () {
    return this.hour + ':' + this.min
  }
  withZero (value) {
    if (value < 10) {
      return '0' + value.toString()
    } else {
      return value.toString()
    }
  }
}
