const ucfirst = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export default ucfirst;