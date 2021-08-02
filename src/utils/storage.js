
export default {
    setItem(key, val) {
        let storage = this.getStroage();
        storage[key] = val;
        window.localStorage.setItem('admin', JSON.stringify(storage));
    },
    getItem(key) {
        return this.getStroage()[key]
    },
    getStroage() {
        return JSON.parse(window.localStorage.getItem('admin') || "{}");
    },
    clearItem(key) {
        let storage = this.getStroage()
        delete storage[key]
        window.localStorage.setItem('admin', JSON.stringify(storage));
    },
    clearAll() {
        window.localStorage.clear()
    }
}