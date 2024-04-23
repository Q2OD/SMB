module.exports = {
    name: "Ban ID Regex Search",
    description: "Searches for a Ban ID in input text using a custom regex pattern.",
    category: "Custom",
    
    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Action to execute when Ban ID is found.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Input Text",
            "description": "The text to search in.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "banId",
            "name": "Ban ID",
            "description": "The Ban ID to search for.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "replacementText",
            "name": "Replacement Text",
            "description": "Text to replace what regex found.",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "regex",
            "name": "Regex Pattern",
            "description": "The custom regex pattern to use for the search. Use {{input.banId}} as a placeholder for the Ban ID.",
            "type": "TEXT",
            "default": "^.*{{input.banId}}.*\n(?:.*\n){3}"
        }
    ],

    outputs: [
        {
            "id": "found",
            "name": "Found?",
            "description": "Boolean indicating whether the Ban ID was found in the input text.",
            "types": ["boolean"]
        },
        {
            "id": "replacementText2",
            "name": "Replacement Text",
            "description": "Text found by applying the regex pattern.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "action",
            "name": "Action",
            "description": "Action to execute if Ban ID is found.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const text = this.GetInputValue("text", cache);
        const banId = this.GetInputValue("banId", cache);
        const replacementText = this.GetInputValue("replacementText", cache);
        const regexPattern = this.GetOptionValue("regex", cache).replace("{{input.banId}}", banId);
        const regex = new RegExp(regexPattern);

        const match = regex.test(text);
        this.StoreOutputValue(match, "found", cache);

        // Apply regex and replace with replacement text if match is found
        let replacedText = text;
        if (match) {
            replacedText = replacedText.replace(regex, replacementText);
        }
        
        this.StoreOutputValue(replacedText, "replacementText2", cache);

        if (match) {
            this.RunNextBlock("action", cache);
        }
    }
};
