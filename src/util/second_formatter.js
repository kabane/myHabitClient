export default function secondFormatter (second) {
    var second = second || 0

    function getHourStr() {
        var h = second / 3600 | 0
        return h < 10 ? '0' + h : h
    }
    
    function getMinStr() {
        var min = second % 3600 / 60 | 0
        return min < 10 ? '0' + min : min
    }

    function getSecStr() {
        var sec = second % 60
        return sec < 10 ? '0' + sec : sec
    }

    return getHourStr() + ':' + getMinStr() + ':' + getSecStr()
}
