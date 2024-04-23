module.exports = {
    name: "Send Reply Message [V14]",

    description: "Sends a reply message.",

    category: "Message Stuff",

    inputs: [
        {
            id: "action",
            name: "Action",
            description: "Acceptable Types: Action\n\nDescription: Executes this block.",
            types: ["action"]
        },
        {
            id: "message",
            name: "Message",
            description: "Type: Object, List\n\nDescription: The message to reply",
            types: ["object", "list", "unspecified"],
            required: true
        },
        {
            id: "text1",
            name: "Text 1",
            description: "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 1 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            types: ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            id: "text2",
            name: "Text 2",
            description: "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 2 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            types: ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            id: "text3",
            name: "Text 3",
            description: "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 3 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            types: ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            id: "text4",
            name: "Text 4",
            description: "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 3 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            types: ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            id: "text5",
            name: "Text 5",
            description: "Acceptable Types: Text, Undefined, Null, Object, Boolean, Date, Number, List, Unspecified\n\nDescription: The text 3 to merge with the source text. Supports everything (converts to text automatically). (OPTIONAL)",
            types: ["text", "undefined", "null", "object", "boolean", "date", "number", "list", "unspecified"]
        },
        {
            id: "embed",
            name: "Embed",
            description: "Acceptable Types: Object, Unspecified\n\nDescription: The embed to put in the message. (OPTIONAL)",
            types: ["object", "unspecified"]
        },
        {
            id: "attachment",
            name: "Attachment",
            description: "Acceptable Types: Object, Text, Unspecified\n\nDescription: The attachment to put in the message. Supports Image, file path and URL. (OPTIONAL)",
            types: ["object", "text", "unspecified"]
        },
        {
            id: "menu",
            name: "Menu",
            description: "Description: To add a single Button to the Message. (NOT A ROW) (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "button",
            name: "Button",
            description: "Description: To add a single Button to the Message. (NOT A ROW) (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "button_row",
            name: "Button Row",
            description: "Description: To add a Button Row to the Message. (MUST EITHER BE BUTTON OR ROW -- NOT BOTH --)",
            types: ["object", "unspecified"],
        },
        {
            id: "split_message",
            name: "Split Message",
            description: "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether to split the message text into multiple messages if it exceeds the characters limit (2000). (OPTIONAL)",
            types: ["boolean", "unspecified"]
        }
    ],

    options: [        
        {
            id: "text",
            name: "Source Text",
            description: "Description: The source text to add the Text. No need to add Text Blocks.",
            type: "TEXT"
        }
    ],

    outputs: [
        {
            id: "action",
            name: "Action",
            description: "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            types: ["action"]
        },
        {
            id: "message",
            name: "Message",
            description: "Type: Object, List\n\nDescription: The message obtained. If \"Split Message\" is enabled, this will return a list containing all message objects instead of a single one.",
            types: ["object", "list"]
        }
    ],

    async code(cache) {

        const { ActionRowBuilder } = require('discord.js');

        const message = this.GetInputValue("message", cache);      

        const embed = this.GetInputValue("embed", cache);
        const attachment = this.GetInputValue("attachment", cache);
        const split_message = Boolean(this.GetInputValue("split_message", cache));

        const text = this.GetOptionValue("text", cache) + "";
        const text1 = this.GetInputValue("text1", cache) + "";
        const text2 = this.GetInputValue("text2", cache) + "";
        const text3 = this.GetInputValue("text3", cache) + "";
        const text4 = this.GetInputValue("text4", cache) + ""; 
        const text5 = this.GetInputValue("text5", cache) + ""; 
        let chars = {'${text1}':text1,'${text2}':text2,'${text3}':text3,'${text4}':text4,'${text5}':text5};
        let s = text;
        s = s.replace (/(\${text1})|(\${text2})|(\${text3})|(\${text4})|(\${text5})/g, m => chars[m]);

        const button1 = this.GetInputValue("button", cache);
		const button_row = this.GetInputValue("button_row", cache);
        const menu1 = this.GetInputValue("menu", cache);

        let button;
        let menu;
        let components;        

        if(button1 !== undefined) {
            button =
                new ActionRowBuilder()
                    .addComponents(button1)
        }

        if(menu1 !== undefined) {
            menu = 
                new ActionRowBuilder()
                    .addComponents(menu1)
        }

        if(button1 == undefined && button_row == undefined && menu1 !== undefined) {
            components = [menu]
        }else if(button_row == undefined && menu1 == undefined && button1 !== undefined) {
            components = [button]
        }else if(menu1 == undefined && button1 == undefined && button_row !== undefined) {
            components = [button_row]
        }else if(menu1 !== undefined && button_row !== undefined && button1 == undefined) {
            components = [menu, button_row]
        }else if(menu1 !== undefined && button1 !== undefined && button_row == undefined) {
            components = [menu, button]
        }else if(menu1 == undefined && button1 !== undefined && button_row !== undefined) {
            components = [button_row, button]
        }else if(menu1 !== undefined && button1 !== undefined && button_row !== undefined) {
            components = [menu, button_row, button]
        }
        
        await message.reply({
            content: s,
            embeds: embed ? [embed] : null,
            files: attachment ? [attachment] : null,
            components: components,
            split: split_message ? {char: ""} : false
        }, this.channel).then(msg => {
            this.StoreOutputValue(split_message ? (Array.isArray(msg) ? msg : [msg]) : msg, "message", cache);
        });

        this.RunNextBlock("action", cache);
    }
}