module.exports = {
  capitalizeString: (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
  formatMonsterHunterName: (str, separator) => str.split(' ').join(separator),
};
