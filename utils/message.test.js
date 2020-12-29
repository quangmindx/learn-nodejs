const expect = require("expect");
const { generateMessage } = require("./message");

describe("Generate Message", () => {
  it("should generate correct message object", () => {
    let from = "tranminhquang";
    let message = "random message";
    let messages = generateMessage(from, message);
    expect(typeof messages.createdAt).toBe("number");
    expect(messages).toMatchObject({ from, message });
  });
});
