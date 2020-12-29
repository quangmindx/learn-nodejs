let generateMessage = (from, message) => {
  return {
    from,
    message,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessage,
};
