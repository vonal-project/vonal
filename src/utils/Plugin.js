class Plugin {

    /**
     * 
     * @param {object} data 
     * @param {string} data.name 
     * @param {Function} data.resultFunction 
     */
    constructor(data) {
        this.name = data.name
        this.resultFunction = data.resultFunction
    }
}

export default Plugin