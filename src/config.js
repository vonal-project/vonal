let APP_NAME = "vonal"
let PLUGINS_DIR = `${process.env.HOME}/.config/${APP_NAME}/plugins`

if(process.env.VONAL_PLUGINS_DIR) {
    PLUGINS_DIR = process.env.VONAL_PLUGINS_DIR
}

export default {
    APP_NAME,
    PLUGINS_DIR
}