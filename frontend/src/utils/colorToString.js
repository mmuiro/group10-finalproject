const colorToString = (color) => {
    return "#" + numToByte(color.r) + numToByte(color.g) + numToByte(color.b);
};

const numToByte = (num) => {
    return num.toString(16).padStart(2, "0");
};

export default colorToString;
