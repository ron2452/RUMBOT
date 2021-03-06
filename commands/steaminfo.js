const { MessageEmbed } = require("discord.js")
const getAppData = require("../APIs/steamApi/getAppData.js")

module.exports = {
    description: "Obtener info de un juego de steam.",
    slash: false,
    category: "Juegos & otros",

    callback: async ({ text }) => {
        if (text) {
            const appName = text.charAt(0).toUpperCase() + text.slice(1)
            const appData = await getAppData(appName)
            if (appData === undefined) {
                return new MessageEmbed()
                    .setTitle(`No se encontró el juego "${appName}"  :x:`)
                    .setColor("RED")
            } else if (appData.is_free === false) {
                return new MessageEmbed()
                    .setTitle(`:sparkles: ${appData.appName}`)
                    .setColor("GREEN")
                    .setDescription(appData.short_description)
                    .setImage(appData.img_url)
                    .setFields(
                        { name: "Descuento:", value: appData.discount_percent, inline: true },
                        { name: "Precio oficial:", value: appData.price_final, inline: true },
                        { name: "Con impuestos:", value: appData.realPrice, inline: true },
                        { name: "Tamaño:", value: appData.size, inline: false },
                        { name: "Abrir en explorador:", value: appData.store_url_explorer, inline: true },
                        { name: "Abrir en aplicacion:", value: appData.store_url_app, inline: true },
                    )
                    .setFooter({ text: "Si no funciona correctamente, por favor avisar en !soporte" })
            } else if (appData.is_free === true) {
                return new MessageEmbed()
                    .setTitle(`:sparkles: ${appData.appName} es gratis! :free:`)
                    .setColor("BLUE")
                    .setDescription(appData.short_description)
                    .setImage(appData.img_url)
                    .setFields(
                        { name: "Tamaño:", value: appData.size, inline: false },
                        { name: "Abrir en explorador:", value: appData.store_url_explorer, inline: true },
                        { name: "Abrir en aplicacion:", value: appData.store_url_app, inline: true },
                    )
                    .setFooter({ text: "Si no funciona correctamente, por favor avisar en !soporte" })
            }
        } else {
            return new MessageEmbed()
                .setTitle(`**Por favor, escriba un parámetro válido.**`)
                .setFields(
                    { name: "Entre ellos:", value: "Nombres de juegos: _Rust_ \nIds des juegos: _252490_" },
                    { name: "Forma de usar el comando:", value: "rb steaminfo <parámetro>" },
                    { name: "Ejemplos:", value: "rb steaminfo Counter-Strike: Global Offensive \n rb steaminfo 730" },
                )
                .setFooter({ text: "Si no funciona correctamente, por favor avisar en !soporte" })
                .setColor("RED")
        }
    }
}
