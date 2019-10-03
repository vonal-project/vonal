
class PluginValidator {
  /**
   * 
   * @param {any} rawPlugin 
   */
  isValid(rawPlugin) {
    return rawPlugin instanceof Function
  } 
}

export default PluginValidator