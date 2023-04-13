export const saveToStorage = (key: string, data: any, expirationTime?: number) => {
    if (expirationTime) {
        const now = new Date()
        const item = {
            value: data,
            expiry: now.getTime() + expirationTime,
        }
        localStorage.setItem(key, JSON.stringify(item));
    } else {
        // Put the object into storage
        localStorage.setItem(key, JSON.stringify(data));
    }
};

export const readFromStorage = (key: string) => {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)

    // check format
    if (item?.expiry) {
        // compare the expiry time of the item with the current time
        const now = new Date()

        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key)
            return null
        }
        return item.value
    } else {
        // Retrieve the object from storage
        // const storedItem = localStorage.getItem(name);
        return JSON.parse(<string>itemStr);
    }
};
