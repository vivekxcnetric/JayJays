function formatNumber(number) {
  return Number(number).toLocaleString();
}

function cx(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

module.exports = {
  formatNumber,
  cx,
};
